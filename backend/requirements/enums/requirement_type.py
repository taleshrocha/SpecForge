"""Requirement type enumeration."""

from enum import Enum


class RequirementType(str, Enum):
    """Enumeration for requirement types."""
    
    FUNCTIONAL = "FUNCTIONAL"
    NON_FUNCTIONAL = "NON_FUNCTIONAL"
