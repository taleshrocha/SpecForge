# SpecForge - Development Guidelines

## Table of Contents
- [Project Structure](#project-structure)
- [Development Standards](#development-standards)
- [Code Standards](#code-standards)
- [Docstring Documentation](#docstring-documentation)
- [Comments Guidelines](#comments-guidelines)
- [Best Practices](#best-practices)

## Project Structure

### Backend Architecture
```
backend/
├── models/           # Data models and entities
│   ├── __init__.py
│   ├── requirements.py
│   └── [other_models].py
├── services/         # Business logic layer
│   ├── __init__.py
│   ├── requirements_service.py
│   └── [other_services].py
├── controllers/      # API controllers/routes
│   ├── __init__.py
│   ├── requirements_controller.py
│   └── [other_controllers].py
├── enums/           # Constants and enumerations
│   ├── __init__.py
│   ├── requirement_status.py
│   ├── priority_level.py
│   └── [other_enums].py
└── app.py           # Flask application entry point
```

### Project Guidelines
- Each module should have clear separation of concerns
- Use `__init__.py` files for package initialization and exports
- Group related functionality in packages
- Keep models, services, and routes in separate modules
- Use dependency injection for better testability

## Development Standards

### 1. Models Layer
- **Purpose**: Define data structures and entities
- **Location**: `models/`
- **Naming**: Use singular nouns (e.g., `requirement.py`, `user.py`)
- **Content**: Data classes, ORM models, validation logic

### 2. Services Layer
- **Purpose**: Business logic and data manipulation
- **Location**: `services/`
- **Naming**: `{model_name}_service.py` (e.g., `requirements_service.py`)
- **Content**: Business rules, data processing, validation

### 3. Controllers Layer
- **Purpose**: API endpoints and request handling
- **Location**: `controllers/`
- **Naming**: `{model_name}_controller.py` (e.g., `requirements_controller.py`)
- **Content**: Flask blueprints, route handlers, request/response formatting

### 4. Enums Layer
- **Purpose**: Constants and enumerated values
- **Location**: `enums/`
- **Naming**: Descriptive names (e.g., `requirement_status.py`, `priority_level.py`)
- **Content**: Python Enum classes

### File Organization
- Each model should have its own file
- Each service corresponds to one model
- Each controller handles one resource type
- Related enums can be grouped in single files

### Import Structure
```python
# Standard library imports
from typing import List, Optional
from datetime import datetime

# Third-party imports
from flask import Blueprint, request

# Local imports
from ..models.requirements import Requirement
from ..enums.requirement_status import RequirementStatus
```

### Error Handling
- Use try/catch blocks in controllers
- Return structured JSON responses
- Include appropriate HTTP status codes
- Log errors for debugging

### Response Format
```json
{
    "success": true|false,
    "data": {...},
    "message": "Optional success message",
    "error": "Error message if success is false"
}
```

## Code Standards

### Python Type Hints
- Use type hints for all function parameters and return values
- Avoid `Any` type - use `Union` or proper typing
- Use `Optional` for nullable values
- Import types from `typing` module when needed

### Naming Conventions
- **Classes**: PascalCase (`UserService`, `DatabaseModel`, `RequirementsService`)
- **Files/Modules**: snake_case (`user_service.py`, `auth_utils.py`, `requirements_controller.py`)
- **Functions/Variables**: snake_case (`get_user_data`, `is_authenticated`, `create_requirement`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `DEFAULT_TIMEOUT`, `MAX_TITLE_LENGTH`)
- **Private methods**: Leading underscore (`_validate_input`)

## Docstring Documentation

### Function Documentation
All public functions and methods must include docstring comments in English using Google style:

```python
def get_user_profile(user_id: str, include_settings: bool = False) -> UserProfile:
    """Fetches user profile data from the database.
    
    Args:
        user_id: The unique identifier for the user.
        include_settings: Whether to include user settings in the response.
        
    Returns:
        UserProfile object containing user data.
        
    Raises:
        UserNotFoundError: When user with given ID doesn't exist.
        DatabaseConnectionError: When database is unavailable.
        
    Example:
        >>> profile = get_user_profile("123", include_settings=True)
        >>> print(profile.name)
        "John Doe"
    """
    # Implementation
```

### Class Documentation
```python
class UserService:
    """Service class for handling user-related operations.
    
    This class provides methods for creating, updating, and retrieving
    user data from the database.
    
    Attributes:
        db_session: Database session for executing queries.
        cache_enabled: Whether caching is enabled for this service.
    """
    
    def __init__(self, db_session: Session, cache_enabled: bool = True):
        """Initialize the UserService.
        
        Args:
            db_session: Active database session.
            cache_enabled: Enable caching for improved performance.
        """
        # Implementation
```

### Docstring Sections
- `Args:` - Parameter descriptions
- `Returns:` - Return value description
- `Raises:` - Exceptions that may be raised
- `Example:` - Usage examples with doctests when applicable
- `Note:` - Additional important information
- `Deprecated:` - Mark deprecated functions

## Comments Guidelines

### Acceptable Comment Types
Only the following types of comments are allowed in the codebase:

#### 1. Docstring Comments
Used for documenting functions, methods, classes, and modules:
```python
def calculate_total(price: float, tax_rate: float) -> float:
    """Calculates the total price including tax.
    
    Args:
        price: Base price before tax.
        tax_rate: Tax rate as decimal (e.g., 0.08 for 8%).
        
    Returns:
        Total price including tax.
    """
    return price * (1 + tax_rate)
```

#### 2. TODO Comments
Used for marking temporary code or features that need to be implemented:
```python
# TODO: Implement user authentication middleware
# TODO: Add error handling for network failures
# TODO: Optimize this query for better performance
```

### Prohibited Comments
- Explanatory comments that describe what the code does (code should be self-documenting)
- Commented-out code (use version control instead)
- Personal notes or debugging comments
- Redundant comments that repeat what the code obviously does

### Best Practices for Comments
- Keep TODO comments specific and actionable
- Include a date or issue number in TODO comments when possible
- Remove TODO comments once the task is completed
- Use meaningful function and variable names to reduce the need for explanatory comments
- Let the code speak for itself through clear naming and structure

## Best Practices

### Development Workflow
1. **Models First**: Define your data structures
2. **Services**: Implement business logic
3. **Controllers**: Create API endpoints
4. **Enums**: Add constants as needed
5. **Testing**: Write tests for each layer

### Code Organization
- Keep controllers thin - business logic goes in services
- Keep related functionality in the same module
- Use meaningful file and module names
- Avoid deep nesting (max 3-4 levels)
- Group imports logically (standard library, third-party, local)
- Remove unused imports and variables
- Use type hints for better code documentation
- Validate input data in services
- Use enums for predefined values
- Follow RESTful API conventions
- Add docstrings to public methods
- Use meaningful variable and function names

**Note**: These guidelines should be followed consistently across the project. When in doubt, refer to the existing codebase for examples and consult with the team lead.
