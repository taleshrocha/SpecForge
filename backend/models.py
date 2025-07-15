from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Any
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, handler=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema: dict, handler) -> dict:
        field_schema.update(type="string")
        return field_schema

class RequirementCreate(BaseModel):
    title: str
    description: str
    stakeholders: List[str]
    type: str  # funcional, não-funcional
    attributes: dict  # prioridade, risco, etc.
    version: str
    status: str = "rascunho"

class Requirement(RequirementCreate):
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str}
    )
    
    id: PyObjectId = Field(default_factory=PyObjectId)
    created_at: datetime = Field(default_factory=datetime.utcnow)
