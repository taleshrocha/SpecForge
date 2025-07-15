"""Requirements API controller for handling requirement-related endpoints."""

from typing import List
from fastapi import APIRouter, HTTPException

from backend.requirements.dtos.requirement_dto import RequirementDTO
from backend.requirements.models.requirement import Requirement
from backend.requirements.services.requirements_service import RequirementsService


router = APIRouter(prefix="/requirements", tags=["requirements"])

@router.post("", response_model=Requirement)
async def create_requirement(requirement: RequirementDTO):
    """Create a new requirement.
    
    Args:
        requirement: The requirement data to create.
        
    Returns:
        The created requirement.
    """
    service = RequirementsService()
    try:
        created_requirement = await service.create_requirement(requirement)
        return created_requirement
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create requirement: {str(e)}")

@router.get("", response_model=List[Requirement])
async def get_requirements():
    """Get all requirements.
    
    Returns:
        List of all requirements.
    """
    service = RequirementsService()
    try:
        requirements = await service.get_all_requirements()
        return requirements
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve requirements: {str(e)}")

@router.get("/{requirement_id}", response_model=Requirement)
async def get_requirement(requirement_id: str):
    """Get a specific requirement by ID.
    
    Args:
        requirement_id: The unique identifier for the requirement.
        
    Returns:
        The requirement data.
        
    Raises:
        HTTPException: When requirement ID is invalid or requirement not found.
    """
    service = RequirementsService()
    try:
        requirement = await service.get_requirement_by_id(requirement_id)
        if requirement is None:
            raise HTTPException(status_code=404, detail="Requirement not found")
        return requirement
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve requirement: {str(e)}")
