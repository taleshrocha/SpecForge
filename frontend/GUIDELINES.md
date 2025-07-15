# Project Guidelines

## Table of Contents
- [Libraries and Dependencies](#libraries-and-dependencies)
- [Code Standards](#code-standards)
- [JSDoc Documentation](#jsdoc-documentation)
- [Comments Guidelines](#comments-guidelines)
- [Best Practices](#best-practices)
- [ESLint Rules](#eslint-rules)

### Component Structure
- Each page should have its own folder with an `index.tsx` as the main component
- Page-specific components go in the `components/` subfolder
- Shared components go in the global `components/` folder
- Use barrel exports (`index.ts`) for cleaner imports

## Libraries and Dependencies

### UI Framework

### Styling
- **Tailwind CSS**: Utility-first CSS framework
  - Use `cn()` utility for conditional classes
  - Follow the class order defined in ESLint config
  - Prefer Tailwind classes over custom CSS

## Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define explicit types for all props and function parameters
- Avoid `any` type - use `unknown` or proper typing
- Use type assertions sparingly and document when necessary

### Naming Conventions
- **Components**: PascalCase (`HomePage`, `UserCard`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables/Functions**: camelCase (`getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`, `ApiResponse`)

## JSDoc Documentation

### Function Documentation
All public functions and methods must include JSDoc comments in English:

```typescript
/**
 * Fetches user profile data from the API
 * @param userId - The unique identifier for the user
 * @param options - Optional configuration for the request
 * @returns Promise that resolves to user profile data
 * @throws {Error} When user is not found or API is unavailable
 * @example
 * ```typescript
 * const profile = await getUserProfile('123', { includeSettings: true });
 * ```
 */
async function getUserProfile(
  userId: string,
  options?: FetchOptions
): Promise<UserProfile> {
  // Implementation
}
```

### Component Documentation
```typescript
/**
 * Displays user profile information with edit capabilities
 * @param user - User data to display
 * @param onEdit - Callback function when edit button is clicked
 * @param isEditable - Whether the profile can be edited
 * @returns JSX element representing the user profile
 */
interface UserProfileProps {
  user: UserProfile;
  onEdit: (user: UserProfile) => void;
  isEditable?: boolean;
}
```

### JSDoc Tags
- `@param` - Parameter description
- `@returns` - Return value description
- `@throws` - Exceptions that may be thrown
- `@example` - Usage examples
- `@deprecated` - Mark deprecated functions
- `@since` - Version when feature was added

## Comments Guidelines

### Acceptable Comment Types
Only the following types of comments are allowed in the codebase:

#### 1. JSDoc Comments
Used for documenting functions, methods, classes, and interfaces:
```typescript
/**
 * Calculates the total price including tax
 * @param price - Base price before tax
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Total price including tax
 */
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}
```

#### 2. TODO Comments
Used for marking temporary code or features that need to be implemented:
```typescript
// TODO: Implement user authentication
// TODO: Add error handling for network failures
// TODO: Optimize this function for better performance
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

### React Components
- Use functional components with hooks
- Keep components small and focused (single responsibility)
- Use custom hooks for complex logic
- Memoize expensive calculations with `useMemo`
- Memoize callback functions with `useCallback`
- Use `React.memo` for components that re-render frequently

### Error Handling
- Use error boundaries for component-level error handling
- Implement proper error states in UI
- Log errors appropriately (console.error allowed per ESLint config)
- Provide user-friendly error messages

### Code Organization
- Keep related files close together
- Use meaningful file and folder names
- Avoid deep nesting (max 3-4 levels)
- Group imports logically
- Remove unused imports and variables

**Note**: These guidelines should be followed consistently across the project. When in doubt, refer to the existing codebase for examples and consult with the team lead.
