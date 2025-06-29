# Pest Control Service Management System

## Overview

This is a full-stack web application for managing pest control services, built with React frontend and Express backend. The system allows users to manage clients, schedule services, track appointments, and view business analytics through a mobile-first interface with Spanish localization.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React with TypeScript, Vite build tool, Tailwind CSS for styling
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI components with shadcn/ui design system
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components with TypeScript
- **Styling**: Tailwind CSS with custom pest control theme variables
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Mobile-First Design**: Responsive design with bottom navigation for mobile
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query for server state, React hooks for local state

### Backend Architecture
- **API Design**: RESTful API endpoints for clients, services, and dashboard data
- **Database Layer**: Drizzle ORM with PostgreSQL adapter
- **Data Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request logging for API endpoints

### Database Schema
- **Clients Table**: Customer information (name, contact details, address, business type)
- **Services Table**: Service appointments with scheduling, pricing, and status tracking
- **Relationships**: Foreign key relationship between services and clients

## Data Flow

1. **Client Requests**: Frontend makes HTTP requests to Express API endpoints
2. **API Processing**: Express routes handle requests, validate data, and interact with database
3. **Database Operations**: Drizzle ORM executes PostgreSQL queries
4. **Response Handling**: API returns JSON responses to frontend
5. **State Updates**: React Query manages cache updates and UI re-rendering

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database adapter for Neon
- **drizzle-orm**: TypeScript ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **react-hook-form**: Form handling and validation
- **zod**: Schema validation library
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and development experience
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

The application is configured for deployment with:

- **Build Process**: Vite builds the frontend, ESBuild bundles the backend
- **Production Setup**: Express serves both API and static frontend files
- **Database**: PostgreSQL via environment variable configuration
- **Environment**: Development and production modes with appropriate optimizations

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- June 28, 2025: **Native APK Application Ready for Testing**
  - Converted web application to native Android APK using Capacitor
  - Implemented professional dark theme inspired by "Fumigaciones Gemar" design
  - Configured Capacitor Live for immediate mobile testing
  - Created native Android project structure with proper permissions
  - Set up build configurations for APK generation
  - Application ready for testing via Capacitor Live app
  - User can test native app functionality before final APK compilation

- June 28, 2025: Initial setup and development of pest control management system

## Changelog

- June 28, 2025: Complete web application for pest control business management