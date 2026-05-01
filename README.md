# Classroom Backend

A robust and scalable TypeScript Express backend API for managing classroom subjects and departments. Built with modern technologies including Express.js, Drizzle ORM, and PostgreSQL, this API provides comprehensive endpoints for educational institution management.

## 🌟 Features

- **Subject Management**: Full CRUD operations for academic subjects with advanced filtering
- **Department Organization**: Manage departments and their associated subjects
- **Search & Filtering**: Powerful search capabilities across subject names and codes with department filtering
- **Pagination Support**: Efficient data retrieval with configurable page limits (max 100 items per page)
- **CORS Configuration**: Secure cross-origin resource sharing with frontend integration
- **Type Safety**: Full TypeScript support with type-safe database operations
- **Database Relationships**: Proper one-to-many relationships between departments and subjects
- **RESTful API**: Standards-compliant REST endpoints with consistent response formatting

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | Latest LTS | Runtime environment |
| **Express.js** | ^5.2.1 | Web framework |
| **TypeScript** | ^6.0.2 | Type-safe development |
| **Drizzle ORM** | ^0.45.2 | Database ORM |
| **PostgreSQL** | Via Neon | Database (serverless) |
| **Neon Serverless** | ^1.0.2 | Database client |
| **CORS** | ^2.8.6 | Cross-origin support |
| **dotenv** | ^17.3.1 | Environment configuration |

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- PostgreSQL database (or Neon serverless PostgreSQL)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/chigemezu2202/classroom-backend.git
cd classroom-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_neon_database_url_here
PORT=3000
FRONTEND_URL=http://localhost:5173
```

**Note:** The `FRONTEND_URL` defaults to `http://localhost:5173` if not specified.

### 4. Database Setup

Generate and run database migrations:

```bash
npm run db:generate  # Generate migration files
npm run db:migrate   # Apply migrations to database
npm run db:seed      # Seed initial data (optional)
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start and listen on the port specified in your `.env` file (default: 3000).

**Output:**
```
Server started and listening on http://localhost:3000
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload (tsx watch) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm run db:generate` | Generate Drizzle ORM migration files |
| `npm run db:migrate` | Execute pending database migrations |
| `npm run db:seed` | Seed database with initial data |
| `npm test` | Run test suite |

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Root Endpoint

**GET** `/`
- Returns a welcome message
- Response: `{ message: "Hello from TypeScript Express server!" }`

### Subjects Endpoints

#### Get All Subjects

**GET** `/api/subjects`

Retrieve all subjects with advanced filtering, search, and pagination capabilities.

**Query Parameters:**
- `search` (optional, string): Search subjects by name or code (case-insensitive)
- `department` (optional, string): Filter by department name (case-insensitive)
- `page` (optional, number): Page number (default: 1, minimum: 1)
- `limit` (optional, number): Items per page (default: 10, maximum: 100)

**Example Request:**
```bash
GET /api/subjects?search=mathematics&department=science&page=1&limit=10
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "departmentId": 2,
      "name": "Calculus",
      "code": "MATH101",
      "description": "Introduction to Calculus",
      "created_at": "2026-03-15T10:30:00Z",
      "updated_at": "2026-03-15T10:30:00Z",
      "department": {
        "id": 2,
        "code": "SCI",
        "name": "Science",
        "description": "Science Department",
        "created_at": "2026-03-15T10:30:00Z",
        "updated_at": "2026-03-15T10:30:00Z"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

**Status Codes:**
- `200 OK`: Successfully retrieved subjects
- `500 Internal Server Error`: Server error occurred

## 📊 Database Schema

### Departments Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | Integer | Primary Key, Auto-generated |
| `code` | VARCHAR(50) | NOT NULL, UNIQUE |
| `name` | VARCHAR(255) | NOT NULL |
| `description` | VARCHAR(255) | - |
| `created_at` | Timestamp | NOT NULL, Default: now() |
| `updated_at` | Timestamp | NOT NULL, Auto-updated |

### Subjects Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | Integer | Primary Key, Auto-generated |
| `departmentId` | Integer | NOT NULL, Foreign Key (departments.id) |
| `name` | VARCHAR(255) | NOT NULL |
| `code` | VARCHAR(50) | NOT NULL, UNIQUE |
| `description` | VARCHAR(255) | - |
| `created_at` | Timestamp | NOT NULL, Default: now() |
| `updated_at` | Timestamp | NOT NULL, Auto-updated |

**Relationships:**
- One Department has Many Subjects
- Each Subject belongs to one Department
- Foreign key constraint with RESTRICT on delete

## 🔐 CORS Configuration

The API is configured with CORS to allow frontend applications to make requests:

**Allowed Origins:**
- Frontend URL from `FRONTEND_URL` env variable
- Default: `http://localhost:5173` (Vite development server)

**Allowed Methods:** GET, POST, PUT, DELETE

**Credentials:** Enabled

Configure the `FRONTEND_URL` in your `.env` file to restrict API access to authorized frontend domains.

## 📁 Project Structure

```
classroom-backend/
├── src/
│   ├── index.ts                 # Express app initialization
│   ├── db/
│   │   ├── index.ts            # Database client configuration
│   │   └── schema/
│   │       ├── index.ts        # Schema exports
│   │       └── app.ts          # Database tables & relationships
│   └── routes/
│       └── subjects.ts         # Subjects API endpoints
├── drizzle/                     # Database migrations
├── drizzle.config.ts           # Drizzle ORM configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
├── .env                        # Environment variables (gitignored)
├── .env.example                # Example environment variables
└── README.md                   # This file
```

## 🔄 Data Flow

1. **Request** → Express middleware processes request (CORS, JSON parser)
2. **Routing** → Request routed to appropriate handler (`/api/subjects`)
3. **Database Query** → Drizzle ORM constructs and executes SQL query
4. **Response** → Data formatted and returned with pagination metadata
5. **Error Handling** → Errors caught and returned with appropriate status codes

## ⚠️ Error Handling

The API includes comprehensive error handling:

- Invalid pagination parameters are normalized (negative values default to minimum)
- Limit is capped at 100 items per page for performance
- Missing or invalid database connections return 500 errors
- Search and filter operations are case-insensitive and safe from SQL injection (via ORM)

## 🔧 Development Workflow

1. Make changes to TypeScript files in `src/`
2. Development server automatically recompiles with `npm run dev`
3. Test changes against the running API
4. Commit changes to version control
5. Build for production with `npm run build`

## 📝 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | ✅ Yes | - | PostgreSQL connection string (Neon format) |
| `PORT` | ❌ No | 3000 | Server port |
| `FRONTEND_URL` | ❌ No | http://localhost:5173 | Allowed CORS origin |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

## 📞 Support & Contact

For issues, questions, or suggestions, please open an issue on the GitHub repository.

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Additional CRUD operations for departments and subjects
- [ ] Advanced query capabilities and filtering
- [ ] Rate limiting and request throttling
- [ ] Comprehensive API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests
- [ ] API versioning
- [ ] Caching strategies
- [ ] Logging and monitoring

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Neon PostgreSQL Documentation](https://neon.tech/docs)

---

**Last Updated:** May 2026  
**Version:** 1.0.0


# Classroom Backend Documentation

## Features
- User authentication and authorization
- Course management
- Assignment submissions and grading
- Real-time notifications
- API support for third-party integrations

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Real-time Communication:** Socket.io
- **Server:** hosted on Heroku

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/chigemezu2202/classroom-backend.git
   cd classroom-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```bash
   PORT=your_port
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the application:
   ```bash
   npm start
   ```

## API Endpoints
| Method | Endpoint                       | Description                     |
|--------|-------------------------------|---------------------------------|
| GET    | `/api/users`                  | Retrieve all users             |
| POST   | `/api/users/register`         | Register a new user            |
| POST   | `/api/users/login`            | User login                     |
| GET    | `/api/courses`                | Retrieve all courses           |
| POST   | `/api/courses`                | Create a new course            |
| PUT    | `/api/courses/:id`            | Update a course                |
| DELETE | `/api/courses/:id`            | Delete a course                |

## Database Schema
- **Users**: `{ id, username, password, email, created_at }`
- **Courses**: `{ id, title, description, created_by, created_at }`
- **Assignments**: `{ id, title, description, due_date, course_id }`

## CORS Configuration
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'your_origin',
  methods: 'GET,POST,PUT,DELETE',
}));
```

## Project Structure
```
classroom-backend/
├── config/          # configuration files
├── controllers/     # request handlers
├── models/          # database models
├── routes/          # API endpoints
├── middleware/      # authentication middleware
├── utils/           # utility functions
└── server.js        # entry point
```

## Error Handling
- Use `try-catch` blocks to handle errors.
- Return appropriate status codes and messages based on error type.

## Future Enhancements
- Implement a notification system for course updates.
- Add payment integrations for premium features.
- Enhance security measures for user data protection.
