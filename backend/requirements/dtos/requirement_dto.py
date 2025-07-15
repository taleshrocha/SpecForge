"""Requirement DTO definitions for API requests and responses."""

from pydantic import BaseModel
from typing import List, Dict, Any


class RequirementDTO(BaseModel):
    """DTO for creating a new requirement."""
    
    title: str
    description: str
    stakeholders: List[str]
    type: str  # funcional, não-funcional
    attributes: Dict[str, Any]  # prioridade, risco, etc.
    version: str
    status: str = "rascunho"
