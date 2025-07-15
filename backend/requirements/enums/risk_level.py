"""Risk level enumeration."""

from enum import Enum


class RiskLevel(str, Enum):
    """Enumeration for risk levels."""
    
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"
