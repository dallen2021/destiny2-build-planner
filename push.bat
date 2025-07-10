@echo off
REM ============================================================================
REM  Git Push Automation Script
REM
REM  This script automates the process of adding, committing, and pushing
REM  changes to a Git repository.
REM
REM  How to use:
REM  1. Save this file as "git_push.bat" (or any other .bat name) in the root
REM     directory of your local Git repository.
REM  2. Double-click the file to run it.
REM  3. Enter your commit message when prompted and press Enter.
REM
REM ============================================================================

ECHO.
ECHO =======================================
ECHO  Git Automatic Push
ECHO =======================================
ECHO.

REM Prompt the user for a commit message
set /p commitMessage="Enter your commit message: "

REM Check if a commit message was entered
IF "%commitMessage%"=="" (
    ECHO.
    ECHO  You must enter a commit message.
    ECHO  Aborting commit.
    ECHO.
    GOTO End
)

ECHO.
ECHO ---------------------------------------
ECHO  Running Git commands...
ECHO ---------------------------------------
ECHO.

REM Add all new and changed files to the staging area
ECHO [1/3] Adding all files to the repository...
git add .
ECHO.

REM Commit the changes with the user-provided message
ECHO [2/3] Committing changes with message: "%commitMessage%"
git commit -m "%commitMessage%"
ECHO.

REM Push the changes to the remote repository (assumes 'origin' and the current branch)
ECHO [3/3] Pushing changes to remote...
git push
ECHO.

ECHO ---------------------------------------
ECHO  Push complete!
ECHO ---------------------------------------
ECHO.

:End
REM Pause the script to keep the window open so you can see the output.
pause
