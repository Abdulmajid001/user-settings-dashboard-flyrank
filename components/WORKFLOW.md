# AI Workflow Comparison

## Introduction
I built the same User Settings Dashboard twice to illustrate the impact of structured prompting. First, I used a vague prompt ("Build a user settings page"). Then, I used a highly structured, detailed prompt providing a specific tech stack, strict accessibility rules, UX constraints, and component architecture requirements.

## Correctness
- **Vague Prompt:** Resulted in a generic React form that functioned but lacked structural validation and modularity. It used standard HTML5 validation which varied by browser, and the design felt unpolished.
- **Structured Prompt:** Successfully implemented strict schema validation via Zod and React Hook Form. It adhered perfectly to the custom design requirements without defaulting to heavy UI libraries, guaranteeing the stack aligned with production expectations.

## Accessibility
- **Vague Prompt:** Often omitted `htmlFor` attributes, relied solely on placeholder text rather than visible labels, and missed critical ARIA attributes to announce error states to screen readers.
- **Structured Prompt:** Each custom UI component was built from scratch with accessibility in mind. Labels were correctly bound, and `aria-invalid` combined with `aria-describedby` accurately directed screen readers to specific validation errors.

## Edge Cases
- **Vague Prompt:** Ignored submission loading states. Did not disable the submit button during the API mock, allowing duplicate submissions. Errors were handled generically via simple browser alerts.
- **Structured Prompt:** The Submit button is appropriately disabled while `isSubmitting` is true, displaying a spinner and updating the button text. The form reliably displays success banners or global error boundaries based on the simulated API response.

## Review Effort
- **Vague Prompt:** Required extensive manual review and refactoring. Had to install validation libraries post-generation, rewrite the UI to fix layout bugs, and retroactively add testing.
- **Structured Prompt:** Minimal review required. The strict guidelines forced the AI into a "planning mode" where it scaffolded the project correctly on the first pass. Tests were written concurrently and passed without modifications.

## AI Mistake
During the structured generation, the AI attempted to use headless component utilities (`class-variance-authority` and `@radix-ui/react-slot`) despite strict instructions to "use only Tailwind CSS" without external UI libraries. 
*How it was fixed:* The automated testing suite instantly caught the missing dependency imports. The AI then correctly identified its mistake and refactored the Button component to use pure Tailwind string concatenation, adhering strictly to the prompt constraints.

## Conclusion
Structured prompting acts as a forcing function for engineering best practices. Providing explicit boundaries for technology choices, UI architecture, accessibility, and testing dramatically reduces hallucination and technical debt, resulting in production-ready code with far less manual intervention.