"""Requirements service for handling business logic related to requirements."""

from typing import List, Optional
from bson import ObjectId
import logging
from datetime import datetime

from backend.requirements.models.requirement import Requirement
from backend.config.database import get_database
from backend.requirements.dtos.requirement_dto import RequirementDTO
from backend.ai.services.gemini_service import GeminiService

# Set up logging
logger = logging.getLogger(__name__)

class RequirementsService:
    """Service class for handling requirement-related operations.
    
    This class provides methods for creating, updating, and retrieving
    requirement data from the database.
    """
    
    def __init__(self):
        """Initialize the RequirementsService."""
        self.db = get_database()
        self.gemini_service = GeminiService()
    
    async def create_requirement(self, requirement_data: RequirementDTO) -> Requirement:
        """Create a new requirement in the database.
        
        Args:
            requirement_data: The requirement data to create.
            
        Returns:
            The created requirement.
            
        Raises:
            Exception: When database operation fails.
        """
        requirement_dict = requirement_data.model_dump()
        requirement_dict['created_at'] = datetime.utcnow()
        
        result = await self.db.requirements.insert_one(requirement_dict)
        created_requirement_doc = await self.db.requirements.find_one({"_id": result.inserted_id})
        return Requirement.from_mongo(created_requirement_doc)
    
    async def create_requirement_with_ai_description(self, requirement_dto: RequirementDTO) -> Requirement:
        """Create a new requirement with AI-generated description.
        
        Args:
            requirement_data: The requirement data to create.
            
        Returns:
            The created requirement with AI-generated description.
            
        Raises:
            Exception: When database operation or AI generation fails.
        """
        try:
            ai_generated_description = await self.gemini_service.generate_requirement_description(
                title=requirement_dto.title,
                requirement_type=requirement_dto.type,
                stakeholders=requirement_dto.stakeholders,
                details=requirement_dto.details if requirement_dto.details is not None else ""
            )
            
            requirement_dict = requirement_dto.model_dump()
            requirement_dict['description'] = ai_generated_description
            requirement_dict['created_at'] = datetime.utcnow()
            
            result = await self.db.requirements.insert_one(requirement_dict)
            created_requirement_doc = await self.db.requirements.find_one({"_id": result.inserted_id})
            return Requirement.from_mongo(created_requirement_doc)
            
        except Exception as e:
            raise Exception(f"Falha ao gerar descrição com IA ou salvar requisito: {str(e)}")
    
    async def get_all_requirements(self, stakeholder_name: Optional[str] = None) -> List[Requirement]:
        """Retrieve all requirements from the database.
        
        Args:
            stakeholder_name: Optional stakeholder name to sort requirements by priority
        
        Returns:
            List of all requirements, optionally sorted by stakeholder priority.
        """
        try:
            logger.info("Fetching all requirements from database")
            requirements = []
            cursor = self.db.requirements.find()
            count = 0
            async for requirement_doc in cursor:
                count += 1
                logger.debug(f"Processing requirement {count}: {requirement_doc.get('_id')}")
                try:
                    requirement = Requirement.from_mongo(requirement_doc)
                    requirements.append(requirement)
                except Exception as validation_error:
                    logger.warning(f"Skipping requirement {requirement_doc.get('_id')} due to validation error: {str(validation_error)}")
                    continue
            
            logger.info(f"Successfully retrieved {len(requirements)} requirements")
            
            # Sort by stakeholder priority if stakeholder_name is provided
            if stakeholder_name and requirements:
                try:
                    logger.info(f"Sorting requirements by stakeholder priority: {stakeholder_name}")
                    sorted_ids = await self.gemini_service.sort_requirements_by_stakeholder(
                        requirements, stakeholder_name
                    )
                    
                    # Create a mapping of requirement ID to requirement object
                    req_map = {req.id: req for req in requirements}
                    
                    # Sort requirements based on AI response
                    sorted_requirements = []
                    for req_id in sorted_ids:
                        if req_id in req_map:
                            sorted_requirements.append(req_map[req_id])
                    
                    # Add any remaining requirements that weren't in the AI response
                    remaining_requirements = [req for req in requirements if req.id not in sorted_ids]
                    sorted_requirements.extend(remaining_requirements)
                    
                    logger.info(f"Successfully sorted requirements for stakeholder: {stakeholder_name}")
                    return sorted_requirements
                    
                except Exception as e:
                    logger.warning(f"Failed to sort by stakeholder priority, returning unsorted list: {str(e)}")
                    return requirements
            
            return requirements
        except Exception as e:
            logger.error(f"Error retrieving requirements: {str(e)}")
            raise Exception(f"Database error while retrieving requirements: {str(e)}")
    
    async def get_requirement_by_id(self, requirement_id: str) -> Optional[Requirement]:
        """Retrieve a specific requirement by its ID.
        
        Args:
            requirement_id: The unique identifier for the requirement.
            
        Returns:
            The requirement data if found, None otherwise.
            
        Raises:
            ValueError: When requirement ID is invalid.
        """
        if not ObjectId.is_valid(requirement_id):
            raise ValueError("Invalid requirement ID format")
        
        try:
            requirement_doc = await self.db.requirements.find_one({"_id": ObjectId(requirement_id)})
            if requirement_doc:
                return Requirement.from_mongo(requirement_doc)
            return None
        except Exception as e:
            raise Exception(f"Database error while retrieving requirement: {str(e)}")
    
    async def generate_glossary(self) -> dict:
        """Generate a glossary from all requirements using AI.
        
        Returns:
            Dictionary with term names as keys and definitions as values.
            
        Raises:
            Exception: When AI generation or database operation fails.
        """
        try:
            logger.info("Generating glossary from all requirements")
            
            # Get all requirements
            requirements = await self.get_all_requirements()
            
            if not requirements:
                logger.warning("No requirements found for glossary generation")
                return {}
            
            # Generate glossary using AI
            glossary = await self.gemini_service.generate_glossary(requirements)
            
            logger.info(f"Successfully generated glossary with {len(glossary)} terms")
            return glossary
            
        except Exception as e:
            logger.error(f"Error generating glossary: {str(e)}")
            raise Exception(f"Failed to generate glossary: {str(e)}")
