# Hastial - Construction & Architecture Website

A modern, responsive website for Hastial, a construction and architecture company, built with React, TypeScript, Tailwind CSS, and Framer Motion.

![Hastial Website](client/public/hastial-preview.png)

## Features

- 🌐 Multi-language support (English/Spanish)
- 🎨 Modern UI with smooth animations and transitions
- 📱 Fully responsive design for all devices
- 🚀 Fast loading with optimized assets
- 🧩 Modular component architecture

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: Drizzle ORM with PostgreSQL
- **Deployment**: Fully configured for containerization and cloud deployment

## Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Benignomnez/Hastial.git
   cd Hastial
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - For local development, you can use:
   ```
   DATABASE_URL=your_database_connection_string
   PORT=5000
   ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

This will start the development server on `http://localhost:5000`.

### Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```
Hastial/
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # React components
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # Utility functions and constants
│       └── pages/         # Page components
├── server/                # Backend Express server
│   ├── controllers/       # Route controllers
│   ├── db/                # Database schemas and migrations
│   └── middleware/        # Express middleware
└── shared/                # Shared code between client and server
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/Benignomnez/Hastial](https://github.com/Benignomnez/Hastial) 