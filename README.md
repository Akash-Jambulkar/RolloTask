# 🎯 RolloTask : https://rollotask0625.netlify.app/

A beautiful, modern task management application with smart rollover functionality. Tasks automatically roll over to the next day if they're not completed by their due date.

![RolloTask Preview](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072)

## ✨ Features

- **Smart Task Rollover**: Automatically reschedules overdue tasks
- **Kanban Board Layout**: Organize tasks across different stages
- **Dark Mode**: Easy on the eyes for late-night productivity
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Local Storage**: Your tasks persist between sessions
- **Real-time Updates**: Tasks automatically move through workflow stages

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Akash-Jambulkar/RolloTask.git

# Navigate to project directory
cd rollotask

# Install dependencies
npm install

# Start development server
npm run dev
```

## 💻 Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- date-fns
- Lucide Icons

## 🔧 Project Structure

```
rollotask/
├── src/
│   ├── components/
│   │   ├── AddTaskModal.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskColumn.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## 📱 Features in Detail

### Task Management
- Create, edit, and delete tasks
- Set due dates and categories
- Mark tasks as complete
- Move tasks between columns

### Smart Rollover
- Automatically detects overdue tasks
- Reschedules them for the next day
- Maintains task history and status

### Workflow Stages
- Ready
- In Progress
- Needs Review
- Done

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI inspiration from modern task management apps
- Built with [Vite](https://vitejs.dev)
