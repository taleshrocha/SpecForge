"""Requirement attributes DTO definitions."""

from pydantic import BaseModel

from backend.requirements.enums.complexity_level import ComplexityLevel
from backend.requirements.enums.priority_level import PriorityLevel
from backend.requirements.enums.risk_level import RiskLevel


class RequirementAttributesDTO(BaseModel):
    """DTO for requirement attributes metadata.
    
    This class defines the typed attributes that provide additional
    metadata about requirements such as priority, risk assessment,
    complexity evaluation, and effort estimation.
    
    Attributes:
        priority: The priority level of the requirement.
        risk: The risk level associated with implementing the requirement.
        complexity: The complexity level of the requirement implementation.
        effort_estimation: Estimated effort needed.
    """
    
    priority: PriorityLevel
    risk: RiskLevel
    complexity: ComplexityLevel
    effort_estimation: int
