# Coding Guidelines

This document consolidates coding standards and best practices for TypeScript, React, and Next.js development.

## Table of Contents

1. [Git & Version Control](#git--version-control)
2. [Code Quality Standards](#code-quality-standards)
3. [TypeScript Guidelines](#typescript-guidelines)
4. [React & Next.js Guidelines](#react--nextjs-guidelines)
5. [Testing Standards](#testing-standards)
6. [Documentation Standards](#documentation-standards)

## Git & Version Control

### Commit Messages

- Write in English
- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification
- Format: `<type>(<scope>): <subject>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(posts): add tag filtering functionality
fix(header): correct mobile navigation alignment
docs(readme): update installation instructions
```

## Code Quality Standards

### Clean Code Principles

#### Code Cleanliness
- Remove all dead code and commented-out sections
- Clean up experimental code segments
- Ensure comments accurately reflect current implementation
- Remove unused imports and variables
- Check spelling in variable names, comments, and documentation

#### Structure & Formatting
- Maintain consistent indentation and formatting
- Keep lines under 120 characters
- Ensure proper code organization and logical flow
- Address all IDE warnings and suggestions

#### Readability & Maintainability
- Write self-documenting code that's easy to understand
- Use meaningful variable and function names
- Ensure names match their actual purpose and context
- Explain complex logic with comments (focus on "why", not "how")
- Follow established patterns and conventions

## TypeScript Guidelines

### Naming Conventions

- **Directories**: kebab-case (`user-profile/`)
- **Files**: kebab-case (`user-service.ts`)
- **Components**: PascalCase (`UserProfile`)
- **Types/Interfaces**: PascalCase (`UserData`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: UPPER_SNAKE_CASE or camelCase

### Function Definitions

**Always use Arrow Functions** in all cases:

```typescript
// ✅ Good
const calculateTotal = (items: Item[]) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ❌ Bad
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Module System

- Use named exports (avoid default exports unless required by framework)
- Place `export` at the beginning of declarations
- Use type-only imports: `import type { User } from './types'`
- Relative imports only within the same module

### Type Safety

#### Strict Mode
- Enable and follow strict TypeScript settings
- Never use `any` type - use proper typing instead
- Use `unknown` when type is truly unknown
- Leverage type inference where possible

#### Advanced TypeScript Patterns

```typescript
// Use discriminated unions for complex state
type Status =
  | { type: 'loading' }
  | { type: 'success'; data: User }
  | { type: 'error'; error: Error };

// Use const assertions for type-safe constants
export const StatusEnum = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const satisfies Record<string, string>;

// Use utility types effectively
type UserUpdate = Omit<User, 'id' | 'createdAt'>;
type PartialUser = Partial<User>;
```

## React & Next.js Guidelines

### Component Structure

#### Import Order

```typescript
'use client'; // If client component

// 1. Internal imports (relative paths)
import { SubComponent } from './sub-component';

// 2. External library imports
import { useState } from 'react';

// 3. Absolute imports from other features
import { formatDate } from '@/utils/date';

// 4. Type imports
import type { User } from '@/app/(models)/users/types/user';

// 5. Style imports
import styles from './index.module.css';
```

#### Component Implementation

```typescript
// Props type definition
type Props = {
  user: User;
  onUpdate: (user: User) => void;
};

// Component implementation (named export, arrow function)
export const UserProfile = ({ user, onUpdate }: Props) => {
  // Early returns for guard clauses
  if (!user) {
    return null;
  }

  // Component logic

  // JSX return - keep as pure markup as possible
  return (
    <div className={styles.base}>
      {/* Content */}
    </div>
  );
};
```

### Component Architecture

#### Standard Component Structure

```
component-name/
├── index.tsx              # Component implementation
├── index.module.css       # Component styles
├── index.stories.ts       # Storybook stories (optional)
├── index.test.tsx         # Tests (optional)
├── use-get-todo.ts        # Component-specific hooks (if needed)
└── sub-component/         # Child components (if needed)
    ├── index.tsx
    └── index.module.css
```

#### Container/Presenter Pattern

When separating data fetching from presentation:

```
feature-name/
├── index.ts               # Barrel export: export * from './container';
├── container.tsx          # Server component (async/await, data fetching)
├── presenter.tsx          # Client component ('use client', UI logic)
├── presenter.module.css   # Styles
├── presenter.stories.ts   # Storybook stories (optional)
└── presenter.test.tsx     # Tests (optional)
```

### Project Structure

This project uses Next.js App Router with the following structure:

- `src/app/(models)/` - Domain models and business logic
- `src/app/(pages)/` - Page routes
- `src/components/` - Shared UI components
- `src/lib/` - External library configurations
- `src/utils/` - Utility functions

### State Management

- Prioritize server components whenever possible
- Use React 19 hooks appropriately (`useActionState`, `useTransition`, `useOptimistic`)
- Implement optimistic UI for better UX
- Avoid prop drilling - use context or state management when needed
- Components export only a single component, except when adopting composition pattern

### CSS Conventions

#### CSS Modules

All styles use CSS modules with `.module.css` extension:

```css
/* Use .base for the root element */
.base {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

/* Semantic names for elements */
.header {
  font-size: 1.5rem;
}

.content {
  padding: 16px;
}

.icon {
  width: 16px;
  height: 16px;
}

/* State classes: target + state format */
.linkActive {
  color: blue;
}

.buttonDisabled {
  opacity: 0.5;
}
```

#### Usage in Components

```typescript
import styles from './index.module.css';

export const Component = () => (
  <div className={styles.base}>
    <header className={styles.header}>Title</header>
    <span className={styles.label}>Label</span>
  </div>
);
```

#### Handling Variants

Use Class Variance Authority (CVA) for component variants:

```typescript
import { cx } from 'class-variance-authority';

<div className={cx(styles.base, someCondition && styles.active)}>
```

## Testing Standards

### Test File Organization

- Place test files in the same directory as the code being tested
- Use `.test.ts` or `.test.tsx` extensions
- Create mock data within the test file
- Use factory functions for complex test data

### Test Structure (3A Pattern)

1. **Arrange**: Set up test data and environment
2. **Act**: Execute the function/component being tested
3. **Assert**: Verify the results

### Testing Best Practices

- Write descriptive test names that explain behavior
- Test both positive and negative cases
- Cover edge cases and error conditions
- Keep tests simple and focused
- Mock external dependencies at boundaries
- Avoid complex logic in tests

### Example Test

```typescript
// formatDate.test.ts
import { formatDate } from './index';
import { describe, test, expect } from 'vitest';

describe('formatDate', () => {
  test('should return YYYY-MM-DD date if no template is provided', () => {
    // Arrange & Act & Assert
    expect(formatDate('2025-01-01')).toBe('2025-01-01');
  });

  test('should return YYYY/MM/DD date if template is provided', () => {
    // Arrange & Act & Assert
    expect(formatDate('2025-01-01', 'YYYY/MM/DD')).toBe('2025/01/01');
  });
});
```

## Documentation Standards

### Code Comments

Use specific prefixes for different types of comments:

```typescript
// NOTE: We disable the form during submission to prevent
// duplicate requests since the API doesn't handle idempotency
const isDisabled = form.formState.isSubmitting || isPending;

// TODO: Remove this workaround once the backend supports
// batch operations (expected in v2.0)
const results = await processIndividually(items);
```

### Comment Guidelines

- Use `// NOTE:` for important implementation decisions
- Use `// TODO:` for planned improvements with context
- Explain "why", not "how"
- Keep comments concise and relevant

### Feature Independence

- Maintain clear boundaries between features
- No cross-feature dependencies
- Extract shared code to common utilities
- Use `@/` for absolute imports throughout the project

---

This guideline is a living document and should be updated as practices evolve and improve.