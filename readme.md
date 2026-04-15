# Advance Todo card 1a 
I built this Advanced Todo Card as part of the HNG Stage 1a task, extending my Stage 0 implementation into a more interactive, stateful component.

This version introduces editable content, synchronized status controls, expand/collapse behavior, and dynamic time tracking — all built using semantic HTML, CSS, and vanilla JavaScript.

## Key Features
### Interactive Editing
Users can edit the task title, description, priority, and due date through an inline edit form with Save and Cancel functionality.

### Status Management
Includes a synchronized system between:
- Checkbox (mark complete)
- Status display
- Status dropdown (Pending, In Progress, Done)

### Dynamic Time Tracking
- Displays real-time countdown (days, hours, minutes)
- Updates every 30 seconds
- Automatically shows "Overdue" when past due date
- Stops updating when task is marked as completed

### Expand / Collapse Description
Long descriptions are collapsed by default and can be expanded or collapsed using an accessible toggle button.

### Accessibility (A11y)
- Semantic HTML elements (`article`, `time`, `ul`)
- ARIA attributes (`aria-live`, `aria-expanded`, `aria-controls`)
- Proper label associations for all form inputs
- Keyboard-friendly navigation flow

### Visual State Feedback
- Completed tasks show muted styling and strike-through
- Priority levels visually distinct (Low, Medium, High)
- Overdue tasks display a warning indicator
## How to Run Locally
1. Clone the repository: git clone https://github.com/Sherifat-Aduku/hng-stage0-todo-card.git

2. Navigate to the folder: cd sheri-taskflow

3. Open index.html directly in your browser — no build step needed.

## Decisions Made
State Management: I used a plain JavaScript state object with a render() function to handle task completion and status updates — keeping things predictable without a framework.

Iconography: I used inline SVGs instead of an external icon library to keep the project dependency-free.

## Trade-offs
No Framework: I chose vanilla HTML, CSS, and JavaScript over React to demonstrate my fundamental understanding of the DOM, state, and event handling without abstractions.

CSS vs. Frameworks: I opted for pure CSS (following BEM naming) rather than a utility framework like Tailwind to demonstrate my fundamental understanding of layout and responsive design.

Inline SVGs vs Icon Library: I replaced lucide-react with inline SVGs. This slightly increases HTML verbosity but removes all external dependencies and keeps the project truly framework-free.

## Github Link
(https://github.com/Sherifat-Aduku/hng-stage0-todo-card.git)

## Live Link
(https://hng-stage0-taskflow-card.vercel.app/)

## Basic Test
To ensure the component remains stable and accessible, I included automated unit tests using Vitest and JSDOM.

What is tested: The suite verifies that the card title, priority badge, description, due date, status, tags, checkbox, edit button, and delete button all render correctly with the right content and attributes. This prevents regressions during future styling or logic updates.
