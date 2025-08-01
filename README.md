# Sanaah Site - Love Story

A beautiful React TypeScript application that displays a love story through code with animations and a relationship timer.

## Features

- Typewriter effect displaying a love story in code format
- Real-time relationship timer showing days, hours, minutes, and seconds
- Beautiful flower animations using Framer Motion
- Responsive design with Tailwind CSS
- Retro terminal aesthetic

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Customization

### Change the Relationship Start Date
In `src/App.tsx`, find this line:
```typescript
const startDate = new Date('2023-01-15T18:30:00'); // Change this to your real date!
```

Replace the date with your actual relationship start date.

### Customize the Love Story
Edit the `codeText` variable in `src/App.tsx` to personalize the love story.

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Create React App

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
sanaahSite/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx          # Main application component
│   ├── index.tsx        # Application entry point
│   └── index.css        # Global styles with Tailwind
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
``` 