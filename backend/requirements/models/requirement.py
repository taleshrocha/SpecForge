"""Requirement model definition."""

from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Any
from datetime import datetime

from ...core.models import PyObjectId
from ..dtos.requirement_dto import RequirementDTO


class Requirement(RequirementDTO):
    """Requirement model representing a software requirement."""
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId: str}
    )
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
