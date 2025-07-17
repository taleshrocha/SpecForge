"""Glossary service for handling glossary-related operations."""

from typing import Optional, Dict
import logging
from datetime import datetime

from backend.requirements.models.glossary import Glossary
from backend.config.database import get_database
from backend.ai.services.gemini_service import GeminiService
from backend.requirements.services.requirements_service import RequirementsService

# Set up logging
logger = logging.getLogger(__name__)

class GlossaryService:
    """Service class for handling glossary-related operations."""
    
    def __init__(self):
        """Initialize the GlossaryService."""
        self.db = get_database()
        self.gemini_service = GeminiService()
        self.requirements_service = RequirementsService()
    
    async def generate_and_save_glossary(self) -> Glossary:
        """Generate a new glossary from all requirements and save it to database.
        
        Removes any existing glossary and creates a new one.
        
        Returns:
            The created glossary.
            
        Raises:
            Exception: When AI generation or database operation fails.
        """
        try:
            logger.info("Generating and saving new glossary")
            
            # Remove existing glossary
            await self.db.glossaries.delete_many({})
            logger.info("Removed existing glossary")
            
            # Get all requirements
            requirements = await self.requirements_service.get_all_requirements()
            
            if not requirements:
                logger.warning("No requirements found for glossary generation")
                terms = []
            else:
                # Generate glossary using AI
                terms = await self.gemini_service.generate_glossary(requirements)
            
            # Create and save new glossary
            glossary_data = {
                'terms': terms,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            result = await self.db.glossaries.insert_one(glossary_data)
            created_glossary_doc = await self.db.glossaries.find_one({"_id": result.inserted_id})
            
            logger.info(f"Successfully generated and saved glossary with {len(terms)} terms")
            return Glossary.from_mongo(created_glossary_doc)
            
        except Exception as e:
            logger.error(f"Error generating and saving glossary: {str(e)}")
            raise Exception(f"Failed to generate and save glossary: {str(e)}")
    
    async def get_current_glossary(self) -> Optional[Glossary]:
        """Get the current glossary from database.
        
        Returns:
            The current glossary if exists, None otherwise.
            
        Raises:
            Exception: When database operation fails.
        """
        try:
            logger.info("Fetching current glossary from database")
            
            # Get the most recent glossary
            glossary_doc = await self.db.glossaries.find_one(
                {},
                sort=[("created_at", -1)]
            )
            
            if glossary_doc:
                logger.info("Successfully retrieved current glossary")
                return Glossary.from_mongo(glossary_doc)
            else:
                logger.info("No glossary found in database")
                return None
                
        except Exception as e:
            logger.error(f"Error retrieving glossary: {str(e)}")
            raise Exception(f"Database error while retrieving glossary: {str(e)}")
