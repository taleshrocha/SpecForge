"""Requirement model definition."""

from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from pydantic import Field

from backend.core.models.base_model import BaseModel
from backend.requirements.enums.requirement_status import RequirementStatus
from backend.requirements.enums.requirement_type import RequirementType
from backend.requirements.models.requirement_attributes import RequirementAttributes

class Requirement(BaseModel):
    """Requirement model representing a software requirement."""
    id: Optional[str] = Field(None, alias="_id")
    created_at: Optional[datetime] = None
    title: str
    details: Optional[str]
    description: Optional[str]
    stakeholders: List[str]
    type: RequirementType
    attributes: RequirementAttributes
    version: str
    status: RequirementStatus = RequirementStatus.DRAFT
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat() if v else None
        }
    
    @classmethod
    def from_mongo(cls, data: dict):
        """Create a Requirement instance from MongoDB document."""
        if data is None:
            return None
        
        # Convert ObjectId to string for the id field
        if "_id" in data:
            data["id"] = str(data["_id"])
            del data["_id"]
        
        return cls(**data)
