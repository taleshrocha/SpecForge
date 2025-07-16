"""Wiegers matrix service for handling prioritization operations."""

from typing import List, Dict, Any
from datetime import datetime
from backend.config.database import get_database
from backend.requirements.models.wiegers_matrix import WiegersMatrix
from backend.ai.services.gemini_service import GeminiService
from backend.requirements.services.requirements_service import RequirementsService


class WiegersService:
    """Service class for handling Wiegers matrix operations."""
    
    def __init__(self):
        """Initialize the WiegersService."""
        self.db = get_database()
        self.requirement_service = RequirementsService()
        self.gemini_service = GeminiService()
    
    async def generate_and_save_matrices(self, requirement_ids: List[str]) -> List[WiegersMatrix]:
        """Generate Wiegers matrices for requirements using AI and save to database.
        
        Args:
            requirement_ids: List of requirement IDs
            
        Returns:
            List of created WiegersMatrix objects
            
        Raises:
            Exception: When generation or saving fails
        """
        # Fetch requirements from database
        requirements = []
        for req_id in requirement_ids:
            requirement = await self.requirement_service.get_requirement_by_id(req_id)
            if requirement:
                requirements.append(requirement)
        
        if not requirements:
            raise Exception("Nenhum requisito encontrado com os IDs fornecidos")
        
        # Generate AI analysis
        ai_analysis = await self.gemini_service.generate_wiegers_matrix(requirements)
        
        # Create and save WiegersMatrix objects
        created_matrices = []
        current_time = datetime.utcnow()
        
        for analysis in ai_analysis:
            matrix = WiegersMatrix(
                requirement_id=analysis["requirement_id"],
                requirement_title=analysis["requirement_title"],
                value=analysis["value"],
                cost=analysis["cost"],
                risk=analysis["risk"],
                urgency=analysis["urgency"],
                created_at=current_time,
                updated_at=current_time
            )
            
            # Calculate priority
            matrix.calculate_priority()
            
            # Save to database
            matrix_dict = matrix.dict(by_alias=True, exclude={"id"})
            result = await self.db.wiegers_matrices.insert_one(matrix_dict)
            matrix.id = str(result.inserted_id)
            
            created_matrices.append(matrix)
        
        return created_matrices
    
    async def get_by_requirement_id(self, requirement_id: str) -> WiegersMatrix:
        """Get Wiegers matrix by requirement ID.
        
        Args:
            requirement_id: The requirement ID
            
        Returns:
            WiegersMatrix object or None
        """
        data = await self.db.wiegers_matrices.find_one({"requirement_id": requirement_id})
        return WiegersMatrix.from_mongo(data) if data else None
    
    async def get_all(self) -> List[WiegersMatrix]:
        """Get all Wiegers matrices ordered by priority.
        
        Returns:
            List of WiegersMatrix objects
        """
        cursor = self.db.wiegers_matrices.find({}).sort("priority", -1)
        matrices = []
        async for data in cursor:
            matrix = WiegersMatrix.from_mongo(data)
            if matrix:
                matrices.append(matrix)
        return matrices
