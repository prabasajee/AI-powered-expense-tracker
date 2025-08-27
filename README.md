# Expense Tracker API

A RESTful API backend for an AI-powered expense tracker built with Node.js, Express, and MongoDB.

## Features

- ✅ Create, read, update, and delete expenses
- ✅ MongoDB integration with Mongoose ODM
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend access
- ✅ RESTful API design
- ✅ Environment-based configuration
- ✅ Query filtering and sorting

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** express-validator
- **CORS:** cors

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AI-powered-expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` file and update the `MONGODB_URI` with your MongoDB connection string
   - For MongoDB Atlas, replace the URI with your cluster connection string

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/health` | Health check | - |
| GET | `/expenses` | Get all expenses | - |
| POST | `/expenses` | Create new expense | See below |
| PUT | `/expenses/:id` | Update expense by ID | See below |
| DELETE | `/expenses/:id` | Delete expense by ID | - |

### Request Body Format

#### POST /expenses & PUT /expenses/:id

```json
{
  "description": "Grocery shopping",
  "category": "Food",
  "amount": 45.50,
  "date": "2025-08-28T10:30:00.000Z"
}
```

#### Fields

- **description** (required): String, max 200 characters
- **category** (required): One of: `Food`, `Transportation`, `Entertainment`, `Utilities`, `Healthcare`, `Shopping`, `Education`, `Travel`, `Other`
- **amount** (required): Positive number
- **date** (optional): ISO 8601 date string (defaults to current date)

### Query Parameters (GET /expenses)

- `category`: Filter by category
- `startDate`: Filter expenses from this date (ISO 8601)
- `endDate`: Filter expenses until this date (ISO 8601)
- `sortBy`: Sort field (`date`, `amount`, `category`) - default: `date`
- `order`: Sort order (`asc`, `desc`) - default: `desc`

Example: `/api/expenses?category=Food&sortBy=amount&order=desc`

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { /* expense object or array */ },
  "count": 10 // for GET all expenses
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ /* validation errors array */ ]
}
```

## Testing with Postman

### 1. Import Collection
Create a new Postman collection with the following requests:

### 2. Health Check
- **Method:** GET
- **URL:** `http://localhost:5000/api/health`

### 3. Get All Expenses
- **Method:** GET
- **URL:** `http://localhost:5000/api/expenses`

### 4. Create Expense
- **Method:** POST
- **URL:** `http://localhost:5000/api/expenses`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "description": "Coffee at Starbucks",
  "category": "Food",
  "amount": 4.95
}
```

### 5. Update Expense
- **Method:** PUT
- **URL:** `http://localhost:5000/api/expenses/{expense_id}`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "description": "Updated: Coffee and pastry",
  "category": "Food",
  "amount": 8.50
}
```

### 6. Delete Expense
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/expenses/{expense_id}`

## MongoDB Setup

### Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use default connection: `mongodb://localhost:27017/expense-tracker`

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `.env` file with your connection string:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Database connection issues
- Invalid request formats
- Resource not found (404)
- Server errors (500)

## Development

### Project Structure
```
├── config/
│   └── database.js          # Database connection
├── controllers/
│   └── expenseController.js # Business logic
├── middleware/
│   └── errorHandler.js      # Error handling
├── models/
│   └── Expense.js          # Mongoose schema
├── routes/
│   └── expenses.js         # API routes
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Dependencies
└── server.js              # Main server file
```

### Available Scripts
- `npm start`: Start production server
- `npm run dev`: Start development server with auto-reload

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/expense-tracker` |
| `FRONTEND_URL` | Frontend URL for CORS | `*` |

## License

MIT License
