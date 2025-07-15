"""The base model for all models in the app."""

from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

from backend.core.models.py_object_id import PyObjectId

class BaseModel(BaseModel):
    """Base model for all models in the app."""
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId: str}
    )
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="id")
    created_at: datetime = Field(default_factory=datetime.utcnow)