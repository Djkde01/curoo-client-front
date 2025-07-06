# Curoo Client Frontend

A modern Angular frontend application for client management system. This application provides a comprehensive interface for user authentication, registration, and client management with a clean, responsive design.

## 📝 Description

Curoo Client Frontend is a single-page application (SPA) built with Angular that serves as the user interface for the client management system. The application allows users to:

- **User Management**: Register new accounts, login with secure authentication, and update user profiles
- **Client Management**: Create, read, update, and delete client records with comprehensive CRUD operations
- **Authentication**: JWT-based authentication with automatic token management and protected routes
- **Responsive Design**: Mobile-first design approach with modern UI components

The frontend integrates seamlessly with the backend API to provide a complete client management solution.

## 📱 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Authentication**: Secure JWT-based login with automatic token management
- **Real-time Validation**: Form validation with instant feedback
- **Error Handling**: Comprehensive error handling and user-friendly messages
- **Loading States**: Visual feedback during API operations
- **Route Guards**: Protected routes for authenticated users only
- **Clean Architecture**: Modular design with services, components, and types

## 🔐 Security Features

- JWT token automatic attachment via HTTP interceptors
- Protected routes with authentication guards
- Secure token storage in localStorage
- Automatic logout on token expiration
- Input validation and sanitization

## 📊 Project Structure

```
src/
├── app/
│   ├── components/           # Angular components
│   │   ├── login/           # Login component
│   │   ├── register/        # Registration component
│   │   ├── dashboard/       # Main dashboard
│   │   └── client/          # Client management components
│   ├── guards/              # Route guards
│   ├── interceptors/        # HTTP interceptors
│   ├── services/            # Business logic services
│   ├── types/               # TypeScript type definitions
│   └── environments/        # Environment configurations
├── assets/                  # Static assets
└── styles.css              # Global styles
```

## 🛠 Tools Used

### Core Technologies

- **Angular 20** - Modern TypeScript-based frontend framework
- **TypeScript** - Type-safe JavaScript superset
- **RxJS** - Reactive programming with Observables
- **Angular Signals** - Modern state management approach

### UI & Styling

- **Tailwind CSS v4** - Utility-first CSS framework for responsive design
- **Angular Standalone Components** - Modern component architecture
- **CSS Grid & Flexbox** - Advanced layout systems

### Development Tools

- **Angular CLI** - Command-line interface for Angular development
- **ESLint** - TypeScript and Angular linting
- **Prettier** - Code formatting
- **Angular DevTools** - Browser extension for debugging

### Authentication & HTTP

- **JWT Authentication** - Secure token-based authentication
- **HTTP Interceptors** - Automatic token attachment and error handling
- **Angular Guards** - Route protection and navigation control

### CI/CD Pipelines

- **GitHub Actions** - Automated testing and deployment workflows
- **Husky** - Git hooks for pre-commit checks

## 🚀 Instructions to Execute the Project

### Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 20.0 or higher)

```bash
# Install Angular CLI globally
npm install -g @angular/cli
```

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:Djkde01/curoo-client-front.git
   cd curoo-client-front
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   The application is pre-configured to connect to the backend API. Verify the environment settings:
   - **Development**: `src/environments/environment.ts`
   - **Production**: `src/environments/environment.prod.ts`

   Default API URL: `http://localhost:8080/api`

### Running the Application

#### Development Server

```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200/`

#### Production Build

```bash
npm run build
# or
ng build
```

Build artifacts will be stored in the `dist/` directory.

#### Testing

```bash
# Run unit tests
npm test
# or
ng test

# Run linting
npm run lint
# or
ng lint
```

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run unit tests
npm run lint       # Run ESLint
```

## 🔗 Dependencies

### Backend Requirements

The frontend application requires the **Curoo Backend API** to be running for full functionality:

#### Backend Repository

- **Repository**: [Curoo Backend API](https://github.com/Djkde01/curoo-client-server)
- **Default URL**: `http://localhost:8080`
- **API Base Path**: `/api`

#### Required Backend Endpoints

The frontend expects the following API endpoints to be available:

**User Management:**

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `PUT /api/users/{id}` - Update user profile

**Client Management:**

- `GET /api/clients/all` - Get all clients for authenticated user
- `GET /api/clients/{idType}/{idNumber}` - Get client by ID type and number
- `POST /api/clients/save` - Create new client
- `PUT /api/clients/{id}` - Update existing client
- `DELETE /api/clients/{id}` - Delete client

#### Backend Setup

1. Clone and set up the Curoo Backend repository
2. Ensure the backend is running on `http://localhost:8080`
3. Verify all API endpoints are accessible
4. Configure CORS to allow requests from `http://localhost:4200`

### Additional Configuration

#### Environment Variables

If deploying to different environments, update the API URL in:

- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

#### Browser Compatibility

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

For more detailed information about the Angular CLI and framework features, visit the [Angular Documentation](https://angular.dev/).
