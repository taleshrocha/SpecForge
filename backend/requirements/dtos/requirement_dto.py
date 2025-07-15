"""Requirement DTO definitions for API requests and responses."""

from typing import List, Optional
from pydantic import BaseModel, Field

from backend.requirements.dtos.requirement_attributes_dto import RequirementAttributesDTO
from backend.requirements.enums.requirement_status import RequirementStatus
from backend.requirements.enums.requirement_type import RequirementType


class RequirementDTO(BaseModel):
    """DTO for creating a new requirement."""
    
    title: str
    description: Optional[str] = None
    stakeholders: List[str]
    type: RequirementType
    attributes: RequirementAttributesDTO
    version: str
    status: RequirementStatus = Field(default=RequirementStatus.DRAFT)
