"""Wiegers matrix model definition."""

from typing import Optional
from datetime import datetime
from bson import ObjectId
from pydantic import Field, validator

from backend.core.models.base_model import BaseModel

class WiegersMatrix(BaseModel):
    """Wiegers matrix model for requirement prioritization."""
    
    id: Optional[str] = Field(None, alias="_id")
    requirement_id: str = Field(..., description="Reference to the requirement")
    requirement_title: str = Field(...)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    # Wiegers matrix attributes (scale 1-5)
    value: int = Field(..., ge=1, le=5, description="Value to user (1-5)")
    cost: int = Field(..., ge=1, le=5, description="Implementation cost (1-5)")
    risk: int = Field(..., ge=1, le=5, description="Technical risk (1-5)")
    urgency: int = Field(..., ge=1, le=5, description="Urgency (1-5)")
    
    # Calculated priority
    priority: Optional[float] = Field(None, description="Calculated priority: (value + urgency) - (cost + risk)")
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat() if v else None
        }
    
    def calculate_priority(self) -> float:
        """Calculate priority using Wiegers formula: (value + urgency) - (cost + risk)."""
        self.priority = float((self.value + self.urgency) - (self.cost + self.risk))
        return self.priority
    
    @classmethod
    def from_mongo(cls, data: dict):
        """Create a WiegersMatrix instance from MongoDB document."""
        if data is None:
            return None
        
        # Convert ObjectId to string for the id field
        if "_id" in data:
            data["id"] = str(data["_id"])
            del data["_id"]
        
        # Ensure priority is float if it exists
        if "priority" in data and data["priority"] is not None:
            data["priority"] = float(data["priority"])
        
        return cls(**data)
