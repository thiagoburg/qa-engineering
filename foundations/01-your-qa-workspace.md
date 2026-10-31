# Foundations 1: Your QA Workspace

## Introduction

A QA Engineer needs a tidy place for evidence, notes, test cases, and reports. This lesson sets up that workspace and introduces a few safe Windows Terminal commands.

## Learning objectives

By the end, you can move between folders, list files, create a folder, and describe where a QA artifact belongs.

## Concise theory

A **terminal** is a text-based way to ask your computer to perform actions. PowerShell is the command-line shell used in this lesson. A **path** names a location, for example `C:\Users\thiago\QA Engineering`.

Commands such as `Get-Location` and `Get-ChildItem` only show information. `New-Item` creates an item. Before using any command that changes files, confirm the current folder with `Get-Location`.

## Practical example

```powershell
Get-Location
Get-ChildItem
New-Item -ItemType Directory -Name notes
```

The first command prints your current location, the second lists its contents, and the third creates a `notes` folder there.

## Guided practice

1. Open PowerShell in the `QA Engineering` folder.
2. Run `Get-Location` and check that the path ends in `QA Engineering`.
3. Run `Get-ChildItem` and identify this repository's `foundations`, `manual-qa`, and `taskflow-qa-lab` folders.
4. Create `submissions/foundations` only if it does not already exist.
5. Open the `submissions/foundations` folder in File Explorer and confirm its location.

## Assignment

**Tools:** Windows PowerShell and File Explorer. **Deliverable:** `submissions/foundations/workspace-check.md`. Write the folder path, list the three project folders you identified, and explain in one sentence why you check the current path before a file-changing command. **Submission location:** `submissions/foundations/`.

## Definition of Done

- The file exists at the requested path.
- It names the correct project folder and three directories.
- The explanation is clear and uses your own words.

## Submission instructions

Save the Markdown file under `submissions/foundations/`. Share its contents in the project chat for review. After review, commit the file with a short message such as `Add workspace check submission`.

## Optional extra credit

Use `Get-ChildItem -Name` and explain how its output differs from the default listing.
