"""Requirement model definition."""

from typing import List, Optional
from bson import ObjectId

from backend.core.models.base_model import BaseModel
from backend.requirements.enums.requirement_status import RequirementStatus
from backend.requirements.enums.requirement_type import RequirementType
from backend.requirements.models.requirement_attributes import RequirementAttributes

class Requirement(BaseModel):
    """Requirement model representing a software requirement."""
    _id: Optional[ObjectId] = None
    title: str
    description: str
    stakeholders: List[str]
    type: RequirementType
    attributes: RequirementAttributes
    version: str
    status: RequirementStatus = RequirementStatus.DRAFT
