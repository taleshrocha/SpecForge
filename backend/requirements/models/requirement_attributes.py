"""Requirement attributes model definition."""

from pydantic import BaseModel
from typing import Optional

from backend.requirements.enums.complexity_level import ComplexityLevel
from backend.requirements.enums.priority_level import PriorityLevel
from backend.requirements.enums.risk_level import RiskLevel

class RequirementAttributes(BaseModel):
    """Model representing requirement attributes."""
    
    priority: PriorityLevel
    risk: RiskLevel
    complexity: ComplexityLevel
    effort_estimation: int
