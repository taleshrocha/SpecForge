"""Priority level enumeration."""

from enum import Enum


class PriorityLevel(str, Enum):
    """Enumeration for priority levels."""
    
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"
