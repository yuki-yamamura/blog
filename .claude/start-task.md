# Task Initiation Protocol

## Execution Prerequisites

Execute this protocol only when **ALL** of the following conditions are met:

- [ ] User has explicitly requested to start a task
- [ ] A Notion link has been provided
- [ ] The Notion task status is incomplete/not done
- [ ] No untracked or unstaged files exist in the working directory

## Preparation Phase

### Code Standards Review
- Read `./docs/CODING_GUIDELINE.md` to understand project-specific coding standards and best practices
- Ensure adherence to established patterns and conventions

### Branch Strategy
- **If user specifies a base branch**: Use the specified branch (confirm with user if branch doesn't exist)
- **If no branch specified**: Use `main` branch as the base

## Implementation Workflow

### 1. Notion Integration
- Access the provided Notion link using available Notion API tools
- Extract task information:
  - **Task ID**: From the `ID` property
  - **Task Title**: From the `Title` property
  - **Status**: From the `Status` property
  - **Started At**: From the `Started At` property
- Update the Notion task:
  - Set `Status` property to "In Progress" or equivalent completion status
  - Set `Started At` property to current date and time (include precise timestamp)
- Parse and understand the task requirements and acceptance criteria

### 2. Pull Request Setup
Execute the following Git operations in sequence:

```bash
# Checkout base branch and sync with remote
git checkout <base-branch>
git pull origin <base-branch>

# Create feature branch
git checkout -b feature/<TASK-ID>

# Create initial empty commit
git commit --allow-empty -m "chore: start feature/<TASK-ID>"

# Push feature branch
git push -u origin feature/<TASK-ID>
```

Create a draft pull request with:
- **Target**: `main` branch (or specified base branch)
- **Title**: `【feature/<TASK-ID>】<TASK-TITLE>`
- **Body**: Use `docs/PR_TEMPLATE.md` as the foundation, customizing for the specific task

### 3. Task Documentation
- Create a detailed task breakdown file: `docs/tasks/<YYYY-MM-DD>.<TASK-ID>.md`
- Include:
  - Task overview and objectives
  - Subtask breakdown with clear deliverables
  - Technical approach and implementation notes
  - Dependencies and blockers (if any)
  - Testing strategy

### 4. Completion Notification
Report to the user that the initial setup phase is complete, including:
- Feature branch creation confirmation
- Draft PR link
- Task documentation location
- Next steps or any clarification needed

## Error Handling

If any prerequisite fails:
- **Missing Notion link**: Request the Notion task URL from user
- **Dirty working directory**: Ask user to commit or stash changes before proceeding
- **Branch conflicts**: Confirm intended base branch with user
- **Notion access issues**: Verify API permissions and retry

## Notes for AI Agents

- Always use the TodoWrite tool to track progress through this workflow
- Leverage Git tools for branch operations and PR creation
- Use Notion API tools for task information extraction
- Maintain clear communication with the user throughout the process
- Follow the project's established coding guidelines and patterns
