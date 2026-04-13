# Todo Card Project
I built this accessible Todo Card as a Frontend Developer in training to practice semantic HTML and vanilla JavaScript state management. It's designed to be clean, responsive, and fully testable for the HNG Stage 0 task.

## Key Features
Semantic Structure: Used article, time, and proper ARIA labels to ensure full accessibility for screen readers.

Logic: Managed state with plain JavaScript — a custom state object and render function replace React's useReducer to handle task completion and status updates.

Real-time Tracking: Includes a dynamic countdown for task deadlines.

Human-Centric Design: Styled with pure CSS and inline SVG icons for a professional, "non-AI" look.

## How to Run Locally
1. Clone the repository: git clone https://github.com/Sherifat-Aduku/hng-stage0-todo-card.git

2. Navigate to the folder: cd sheri-taskflow

3. Open index.html directly in your browser — no build step needed.

## Decisions Made
State Management: I used a plain JavaScript state object with a render() function to handle task completion and status updates — keeping things predictable without a framework.

Accessibility (A11y): I used semantic HTML tags like article, time, and ul to ensure the card is readable by screen readers.

Iconography: I used inline SVGs instead of an external icon library to keep the project dependency-free.

Visual Priority: I styled the "High" priority badge with a solid red fill to ensure immediate visibility for urgent tasks.

## Trade-offs
No Framework: I chose vanilla HTML, CSS, and JavaScript over React to demonstrate my fundamental understanding of the DOM, state, and event handling without abstractions.

CSS vs. Frameworks: I opted for pure CSS (following BEM naming) rather than a utility framework like Tailwind to demonstrate my fundamental understanding of layout and responsive design.

Inline SVGs vs Icon Library: I replaced lucide-react with inline SVGs. This slightly increases HTML verbosity but removes all external dependencies and keeps the project truly framework-free.

## Github Link
(https://github.com/Sherifat-Aduku/hng-stage0-todo-card.git)

## Live Link
(https://hng-sheri-todo-card.vercel.app/)

## Basic Test
To ensure the component remains stable and accessible, I included automated unit tests using Vitest and JSDOM.

What is tested: The suite verifies that the card title, priority badge, description, due date, status, tags, checkbox, edit button, and delete button all render correctly with the right content and attributes. This prevents regressions during future styling or logic updates.

Enter "npm test" on the command line to run the tests.