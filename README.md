
# RolloTask

RolloTask is a web-based task management application that allows users to efficiently organize their daily activities. With a clean, interactive interface, it combines the simplicity of a calendar with the convenience of adding and viewing tasks for each day.

## Features

- **Interactive Calendar:** Navigate through the dates to view tasks for specific days.
- **Add Tasks:** Quickly add tasks with a title and optional description.
- **Task List:** Displays tasks for the selected day, helping you stay focused and organized.
- **Responsive Design:** Optimized for various screen sizes, providing a seamless user experience.

## Tech Stack

RolloTask is built using modern web technologies:

- **Frontend:** React
- **Styling:** Tailwind CSS
- **Calendar Utilities:** `date-fns`
- **Icons:** `lucide-react`
- **Bundler:** Vite

## Installation and Setup

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Akash-Jambulkar/RolloTask.git
   cd RolloTask
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Lints the project for code quality and consistency.

## Folder Structure

The typical folder structure of the project is:

```
RolloTask/
├── public/         # Static assets
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Application pages
│   ├── styles/     # Tailwind configuration and styles
│   └── main.jsx    # Entry point for React
├── package.json    # Project dependencies and scripts
├── vite.config.js  # Vite configuration
└── tailwind.config.js # TailwindCSS configuration
```

## Dependencies

The project uses the following key dependencies:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
- [date-fns](https://date-fns.org/): Modern date utility library.
- [lucide-react](https://github.com/lucide-icons/lucide): Icon library for React.

## DevDependencies

- [Vite](https://vitejs.dev/): Lightning-fast build tool.
- [TypeScript](https://www.typescriptlang.org/): Type safety for JavaScript.
- [ESLint](https://eslint.org/): Tool for identifying and fixing coding issues.
- [PostCSS](https://postcss.org/): CSS transformations and optimizations.

## Future Enhancements

- Task prioritization with color-coding.
- Notifications or reminders for upcoming tasks.
- User authentication for personalized task management.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with any improvements or bug fixes.

