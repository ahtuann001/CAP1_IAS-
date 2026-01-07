# Aquaculture Management System

## Overview

This is a comprehensive aquaculture (fish farming) management system built with React and TypeScript on the frontend and Express.js on the backend. The application is designed to help fish farm managers monitor pond conditions, track fish inventory, manage feeding schedules, monitor water quality, and view weather information. The system features a modern, responsive interface with Vietnamese language support and follows Fluent Design principles optimized for data-heavy enterprise applications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent, accessible design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Theme System**: Custom theme provider supporting light/dark modes with CSS custom properties
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Design System**: Fluent Design approach with Inter font, neutral color palette, and enterprise-focused layouts

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Development**: Vite for fast development and hot module replacement
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **API Design**: RESTful endpoints with proper error handling and request logging

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle with schema-first approach and automatic type generation
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon serverless driver with WebSocket support for optimal performance

### Authentication and Authorization
- **User Management**: Basic user schema with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database backends
- **Session Handling**: Server-side session management with PostgreSQL storage

### External Dependencies

- **Weather Service**: OpenWeatherMap API integration for current weather and 5-day forecasts
- **UI Components**: Radix UI primitives for accessibility and consistent behavior
- **Charts and Visualization**: Recharts for water quality monitoring and data visualization
- **Development Tools**: Replit integration for cloud development environment
- **Font Loading**: Google Fonts (Inter, DM Sans, Fira Code, Geist Mono) for typography
- **Database**: Neon PostgreSQL for serverless database hosting
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation

The system is designed for daily operational use by fish farm workers and managers, with features including pond monitoring, fish inventory tracking, feeding schedule management, water quality analysis, and weather-dependent planning. The architecture supports real-time data updates, responsive design for mobile devices, and extensible components for future feature additions.