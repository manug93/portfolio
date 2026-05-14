# Portfolio Website

A modern, animated portfolio website built with Vue 3, Vite, and TypeScript. This project presents a personal portfolio experience with bilingual support, animated content sections, and a contact form powered by EmailJS.

## Website Content

The portfolio website includes the following sections:

- **About Me**: Introduction highlighting full-stack development experience, API design, cloud deployment, and data pipeline integrations.
- **Projects**: Featured portfolio items:
  - **Personal Portfolio**: Interactive Vue 3 + TypeScript portfolio website.
  - **Medical App**: Appointment booking application with PHP API and MySQL backend.
  - **Citadelle Group Web App**: Service showcase website for Citadelle Group SA.
  - **Secure REST API**: Microservices architecture with JWT authentication, rate limiting, and Swagger documentation.
- **Achievements**: Professional milestones such as Azure AI Fundamentals and IBM Data Analyst Professional certifications.
- **Skills**: A rotating view of skills across languages, web/API, databases, data & ETL, cloud & DevOps, tools, methodologies, and operating systems.
- **Contact**: A contact form integrated using EmailJS.

## Key Features

- Vue 3 and TypeScript frontend
- Vite-powered development and build
- Multilingual support with `vue-i18n`
- Animated carousel-style sections for projects, achievements, and skills
- Responsive, asymmetrical glassmorphism-inspired design
- EmailJS contact form integration

## Project Setup

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Testing

Run unit tests:

```sh
npm run test:unit
```

Run end-to-end tests:

```sh
npm run test:e2e
```

If this is your first Playwright run, install browsers first:

```sh
npx playwright install
```

## Code Quality

Type-check the project:

```sh
npm run type-check
```

Lint and fix issues:

```sh
npm run lint
```

Format source files:

```sh
npm run format
```

## Notes

- The contact form is configured in `src/components/Contact.vue` using EmailJS.
- Project and skill content are defined in source translations and component data.
