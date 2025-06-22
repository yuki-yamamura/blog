# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog application built with Next.js 15 and TypeScript, using MicroCMS as a headless CMS for content management. The site is statically generated for optimal performance.

## Prohibited Actions Without User Permission

- Starting new tasks
- Making Git commits or pushing to GitHub
- Modifying files outside the current Git repository
- Accessing secure directories (`~/.ssh`, `~/.aws`)

## Development Commands

```bash
# Install dependencies (use pnpm)
pnpm install

# Run development server
pnpm dev

# Build for production (static export)
pnpm build

# Type checking
pnpm tsc

# Linting and formatting
pnpm lint          # Run all linters (ESLint + Stylelint)
pnpm lint:es       # ESLint only
pnpm lint:style    # Stylelint only
pnpm format        # Prettier formatting

# Testing
pnpm test          # Run unit tests in watch mode
pnpm test:ci       # Run unit tests once (for CI)
pnpm storybook     # Run Storybook locally
pnpm test-storybook # Run Storybook tests
```

## Architecture Overview

### Core Technologies

- **Next.js 15** with App Router and static export
- **TypeScript** with strict mode
- **React 19** with React Aria Components for accessibility
- **CSS Modules** for styling
- **MicroCMS** for content management

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
  - `(models)/` - Domain models and business logic (posts, tags)
  - `(pages)/` - Page routes (about, posts)
- `src/components/` - Shared UI components
  - `layout/` - Layout components (Header)
  - `ui/` - Reusable UI components
- `src/lib/` - External library configurations (MicroCMS client, fonts)
- `src/utils/` - Utility functions (date formatting, pagination, paths)

### Key Patterns

1. **Static Generation**: All pages are statically generated at build time using `output: 'export'`
2. **Content Processing**: Markdown content is processed through unified/remark/rehype pipeline with syntax highlighting via Shiki
3. **Type Safety**: Full TypeScript coverage with generated types for MicroCMS content
4. **Component Testing**: Components are developed and tested with Storybook
5. **Accessibility**: Using React Aria Components for built-in accessibility

## Environment Setup

Required environment variables:

- `MICROCMS_SERVICE_DOMAIN` - MicroCMS service domain
- `MICROCMS_API_KEY` - MicroCMS API key

Node.js version: 22.13.0 (specified in .nvmrc)

## Testing Strategy

1. **Unit Tests**: Vitest with React Testing Library for component and utility testing
2. **Component Tests**: Storybook for visual testing and component documentation
3. **CI Pipeline**: All PRs run linting, type checking, unit tests, and Storybook tests

## Code Quality Standards

- **Formatting**: Prettier with 100 character line width and single quotes
- **Linting**: ESLint with TypeScript rules and Next.js config
- **CSS**: Stylelint with recess order for consistent property ordering
- **Type Safety**: TypeScript strict mode enabled

## Content Management

Posts and tags are managed through MicroCMS. The blog supports:

- Rich markdown content with GitHub Flavored Markdown
- Syntax highlighting for code blocks
- Tag-based categorization
- Pagination for post listings
