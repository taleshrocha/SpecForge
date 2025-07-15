"""Requirements service for handling business logic related to requirements."""

from typing import List, Optional
from bson import ObjectId

from backend.requirements.models.requirement import Requirement
from backend.config.database import get_database
from backend.requirements.dtos.requirement_dto import RequirementDTO



class RequirementsService:
    """Service class for handling requirement-related operations.
    
    This class provides methods for creating, updating, and retrieving
    requirement data from the database.
    """
    
    def __init__(self):
        """Initialize the RequirementsService."""
        self.db = get_database()
    
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
        result = await self.db.requirements.insert_one(requirement_dict)
        created_requirement_doc = await self.db.requirements.find_one({"_id": result.inserted_id})
        return Requirement(**created_requirement_doc)
    
    async def get_all_requirements(self) -> List[Requirement]:
        """Retrieve all requirements from the database.
        
        Returns:
            List of all requirements.
        """
        requirements = []
        async for requirement_doc in self.db.requirements.find():
            requirements.append(Requirement(**requirement_doc))
        return requirements
    
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
        
        requirement_doc = await self.db.requirements.find_one({"_id": ObjectId(requirement_id)})
        if requirement_doc:
            return Requirement(**requirement_doc)
        return None
