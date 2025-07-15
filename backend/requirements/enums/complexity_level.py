"""Complexity level enumeration."""

from enum import Enum


class ComplexityLevel(str, Enum):
    """Enumeration for complexity levels."""
    
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    VERY_HIGH = "VERY_HIGH"
