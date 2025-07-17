"""Glossary model definition."""

from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from pydantic import Field, BaseModel as PydanticBaseModel

from backend.core.models.base_model import BaseModel

class GlossaryTerm(PydanticBaseModel):
    """Model for a single glossary term."""
    name: str = Field(..., description="The term name")
    definition: str = Field(..., description="The term definition")

class Glossary(BaseModel):
    """Glossary model for storing technical terms and definitions."""
    
    id: Optional[str] = Field(None, alias="_id")
    terms: List[GlossaryTerm] = Field(..., description="List of glossary terms and their definitions")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat() if v else None
        }
    
    @classmethod
    def from_mongo(cls, data: dict):
        """Create a Glossary instance from MongoDB document."""
        if data is None:
            return None
        
        # Convert ObjectId to string for the id field
        if "_id" in data:
            data["id"] = str(data["_id"])
            del data["_id"]
        
        return cls(**data)
