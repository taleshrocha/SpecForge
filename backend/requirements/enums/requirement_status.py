"""Requirement status enumeration."""

from enum import Enum


class RequirementStatus(str, Enum):
    """Enumeration for requirement status."""
    
    DRAFT = "DRAFT"
    REVIEW = "REVIEW"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    IMPLEMENTED = "IMPLEMENTED"
