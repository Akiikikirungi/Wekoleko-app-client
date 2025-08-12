# 🔧 Wekoleko - Maintenance Made Easy

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Wekoleko** is a modern, intelligent maintenance management system designed to streamline maintenance tasks and field operations. Built with React and a focus on user experience, it helps maintenance professionals track, manage, and complete their work efficiently.

![Wekoleko Dashboard](https://via.placeholder.com/800x400/4f46e5/ffffff?text=Wekoleko+Dashboard+Preview)

## ✨ Features

### 🎯 **Core Functionality**
- **Smart Ticket Management** - Create, track, and manage maintenance tickets with ease
- **Visual Documentation** - Attach images to tickets for better clarity
- **Priority System** - Organize tasks by priority levels (Low, Medium, High)
- **Status Tracking** - Monitor ticket progress from creation to completion
- **Due Date Management** - Set and track due dates with overdue notifications

### 📱 **User Experience**
- **Responsive Design** - Perfect for desktop and mobile field work
- **Intuitive Dashboard** - Clean, modern interface with quick stats overview
- **Multi-step Forms** - Guided ticket creation process
- **Real-time Updates** - Live status updates and notifications
- **Modern UI/UX** - Contemporary design with smooth animations

### 🔐 **Security & Authentication**
- **JWT Authentication** - Secure user sessions
- **Protected Routes** - Role-based access control
- **User Management** - Registration and login system
- **Data Privacy** - Secure handling of user data

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/wekoleko](https://github.com/RaymondAkiiki/Wekoleko-client).git
   cd wekoleko
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies (if applicable)
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the client directory
   cp .env.example .env
   
   # Add your configuration
   REACT_APP_API_BASE_URL=http://localhost:5000
   REACT_APP_ENV=development
   ```

4. **Start the development server**
   ```bash
   # Start the client
   cd client
   npm start

   # Start the backend (in another terminal)
   cd server
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see Wekoleko in action!

## 📁 Project Structure

```
wekoleko/
├── client/                     # React frontend application
│   ├── public/                 # Public assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Footer.js
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── TicketCard.js
│   │   ├── context/           # React Context providers
│   │   │   └── AuthContext.js
│   │   ├── pages/             # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── NewTicketPage.js
│   │   │   ├── RegisterPage.js
│   │   │   └── TicketDetailsPage.js
│   │   ├── api.js             # API configuration
│   │   └── App.js             # Main application component
│   ├── package.json
│   └── README.md
├── server/                    # Backend API (Node.js/Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── docs/                      # Documentation
└── README.md
```

## 🎨 Key Components

### Authentication System
- **AuthContext** - Global authentication state management
- **ProtectedRoute** - Route protection for authenticated users
- **Login/Register Pages** - Modern authentication interface

### Dashboard & Ticket Management
- **Dashboard** - Overview of all tickets with statistics
- **TicketCard** - Individual ticket display component
- **NewTicketPage** - Multi-step ticket creation form
- **TicketDetailsPage** - Detailed ticket view and editing

### Navigation & Layout
- **Navbar** - Responsive navigation with mobile support
- **Footer** - Application footer with branding

## 🛠️ Technologies Used

### Frontend
- **React 18+** - Modern React with hooks
- **React Router** - Client-side routing
- **React DatePicker** - Date selection component
- **date-fns** - Date utility library
- **React Icons** - Icon library
- **CSS3** - Modern styling with custom properties

### Backend Integration
- **Axios** - HTTP client for API requests
- **JWT** - JSON Web Token authentication
- **FormData** - File upload support

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/600x400/10b981/ffffff?text=Dashboard+View)

### Ticket Creation
![New Ticket](https://via.placeholder.com/600x400/3b82f6/ffffff?text=Create+New+Ticket)

### Ticket Details
![Ticket Details](https://via.placeholder.com/600x400/f59e0b/ffffff?text=Ticket+Details)

## 🚧 Development

### Available Scripts

```bash
# Development
npm start              # Start development server
npm run build         # Build for production
npm test              # Run tests
npm run eject         # Eject from Create React App

# Linting & Formatting
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

### Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use ESLint and Prettier for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 🔄 API Integration

Wekoleko integrates with a RESTful backend API:

```javascript
// Example API endpoints
GET    /api/tickets           # Get all tickets
POST   /api/tickets           # Create new ticket
GET    /api/tickets/:id       # Get specific ticket
PUT    /api/tickets/:id       # Update ticket
DELETE /api/tickets/:id       # Delete ticket

POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
```

## 🌟 Features Roadmap

- [ ] **Offline Support** - PWA capabilities for field work
- [ ] **Team Collaboration** - Multi-user ticket assignment
- [ ] **Reporting Dashboard** - Analytics and insights
- [ ] **Mobile App** - Native mobile application
- [ ] **Integration APIs** - Third-party service integrations
- [ ] **Advanced Filtering** - Search and filter enhancements
- [ ] **Notification System** - Email and push notifications
- [ ] **Barcode Scanning** - QR code integration for assets

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support & Community

- **Documentation** - [docs.wekoleko.com](https://docs.wekoleko.com)
- **Issues** - [GitHub Issues](https://github.com/your-username/wekoleko/issues)
- **Discussions** - [GitHub Discussions](https://github.com/your-username/wekoleko/discussions)

## 👨‍💻 Author

**Your Name**
- Website: [yourwebsite.com](https://yourwebsite.com)
- Twitter: [@yourusername](https://twitter.com/yourusername)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- The open-source community for inspiration
- All contributors who help improve Wekoleko

---

<div align="center">
  <p>Made with ❤️ by maintenance professionals, for maintenance professionals</p>
  <p>
    <a href="#quick-start">Quick Start</a> •
    <a href="#features">Features</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#license">License</a>
  </p>
</div>
