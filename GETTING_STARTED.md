# Getting Started with Development

This guide explains how to start working on the reaction-time test project using Cursor IDE and its AI assistant.

## Initial Setup

1. **Set Up Project in Cursor**:
   - Open Cursor IDE
   - Go to File > Open Folder
   - If first time:
     ```bash
     # Clone the repository
     git clone https://github.com/antonjackson69/reaction-test.git
     ```
   - Navigate to and select the reaction-test folder
   - Open the folder in Cursor

2. **Start Development Session**:
   - Start a new chat in Cursor
   - Provide context to the AI:
     ```
     I'm working on the reaction-time test project from https://github.com/antonjackson69/reaction-test.
     I want to [describe what you want to do].
     ```

3. **Get Latest Code & Create Branch**:
   ```bash
   # Get latest changes
   git pull

   # Create and switch to new feature branch
   git checkout -b feature/your-branch-name
   ```

4. **Set Up Development Environment**:
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

## Important Notes

- Always open the project folder in Cursor before starting the chat
- The AI assistant needs the project context to help effectively
- AWS CLI should be configured for S3 operations
- All commands will run in Cursor's integrated terminal

## Common Git Operations

```bash
# Check current branch and changes
git status

# Switch branches
git checkout main
git checkout your-branch-name

# Stage and commit changes
git add .
git commit -m "Description of changes"

# Push changes
git push -u origin your-branch-name  # First time
git push                            # Subsequent pushes

# Get latest changes
git pull
```

## Development Workflow

1. Create new branch for your feature
2. Make and test changes locally
3. Commit changes with descriptive messages
4. Push to GitHub
5. Create pull request when feature is complete

## Getting Help

The AI assistant can help with:
- Code changes and debugging
- Git operations
- Development setup
- AWS configuration
- Best practices and security 