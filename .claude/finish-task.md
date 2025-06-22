# Task Completion Protocol

## Execution Prerequisites

Execute this protocol only when **ALL** of the following conditions are met:

- [ ] User has explicitly requested to complete/finish the task
- [ ] All implementation tasks in `docs/tasks/<TASK-ID>.md` have been completed
- [ ] A Notion link has been provided for status updates
- [ ] All code changes have been committed and pushed

## Implementation Workflow

### 1. Notion Integration

- Access the provided Notion link using available Notion API tools
- Extract current task information:
  - **Status**: From the `Status` property
  - **Completed At**: From the `Completed At` property
- Update the Notion task:
  - Set `Status` property to "Complete" or equivalent completion status
  - Set `Completed At` property to current date and time (include precise timestamp)

### 2. Pull Request Finalization

#### Pre-commit Verification

Before proceeding with finalization:

- Check for uncommitted or unpushed changes using `git status`
- **If uncommitted files exist**:
  - List all uncommitted files to the user
  - Ask the user whether to proceed with committing these changes
  - **STOP and wait for user instruction** - do not automatically commit
  - Only proceed after explicit user confirmation

#### Git Operations

Execute the following Git operations in sequence (only after user confirmation if uncommitted files exist):

```bash
# Confirm that the current branch should be `feature/<TASK-ID>`
git branch

# Merge the pull request (via GitHub CLI or web interface)
gh pr merge --merge --auto --delete-branch
```

### 3. Completion Verification

- Verify the pull request has been successfully merged
- Confirm the feature branch has been cleaned up
- Validate Notion task status has been updated correctly

### 4. User Notification

Report to the user that the task completion is finalized, including:

- Notion task status update confirmation
- Pull request merge confirmation
- Local branch cleanup confirmation
- Summary of completed work and deliverables

## Error Handling

If any step fails:

- **Notion update issues**: Verify API permissions and retry with appropriate error handling
- **PR merge conflicts**: Resolve conflicts before attempting merge
- **Branch deletion issues**: Ensure all changes are properly merged before cleanup
- **Missing task documentation**: Create summary if documentation is incomplete

## Notes for AI Agents

- Always verify task completion before proceeding with this protocol
- **CRITICAL**: Never automatically commit files without explicit user permission
- Use `git status` to check for uncommitted changes before any commit operations
- If uncommitted files are found, inform the user and wait for explicit instructions
- Use TodoWrite tool to track completion workflow progress
- Leverage Git tools for branch operations and PR management
- Use Notion API tools for status updates and completion timestamps
- Maintain clear communication with the user throughout the finalization process
- Ensure all deliverables meet the original task requirements and acceptance criteria
