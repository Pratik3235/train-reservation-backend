# 🚆 Train Seat Reservation – Backend

A Node.js + Express backend for managing train seat reservations, user authentication, and seat availability. The backend is connected to a MongoDB database and exposes a set of APIs for booking seats, managing user data, and more.

🔗 **Live API:** [Backend API](https://train-reservation-backend-er3f.onrender.com)

---

## 🛠 Tech Stack

- **Backend Framework**: Node.js + Express
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **API Documentation**: Swagger UI
- **Environment Variables**: dotenv
- **Deployment**: Render (or your preferred provider)

---

## 📦 Features

- 🔐 User authentication (Signup, Login, JWT token)
- 🎟️ Booking seats (1-7 seats at a time)
- 🚋 Seat grid management (available, booked, and reset operations)
- 📝 Route protection (admin access for resetting seats)
- 🔄 API endpoints for resetting, fetching, and booking seats

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/train-seat-backend.git
cd train-seat-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of your project and add the following:

```plaintext
PORT=8000
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/train-booking?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret
```

- Replace `<your-username>` and `<your-password>` with your MongoDB Atlas credentials.
- Replace `your-jwt-secret` with a secret key for JWT signing.

### 4. Start the server

```bash
npm start
```

The server will start on `http://localhost:8000`.

---

## 📁 Project Structure

```
├── config
│   └── db.js        # MongoDB connection
├── controllers
│   ├── authController.js  # User authentication logic
│   └── seatController.js  # Seat reservation logic
├── models
│   ├── User.js      # User model (Schema)
│   └── Seat.js      # Seat model (Schema)
├── routes
│   ├── authRoutes.js    # Authentication routes
│   └── seatRoutes.js    # Seat management routes
├── middlewares
│   └── authMiddleware.js  # JWT token verification
├── .env              # Environment variables
├── server.js         # Main server file
└── package.json      # Project dependencies
```

---

## 🌐 API Endpoints

### Authentication

- `POST /auth/signup` - Signup a new user.
- `POST /auth/login` - Login and get a JWT token.

### Seat Reservation

- `GET /seat/all` - Get all seat data.
- `POST /booking/book` - Book seats (up to 7).
- `POST /seat/init` - Initialize/reset all seat bookings.

---

## 📝 API Documentation

The API is documented with **Swagger UI**. After running the backend locally, you can access the API documentation at:

```
http://localhost:8000/api-docs
```

---

## 🌐 Deployment

This project is deployed using **Render**. 

To deploy:

1. Push your code to GitHub.
2. Go to [Render](https://render.com) and create a new Web Service.
3. Choose your GitHub repository and connect it.
4. Set the build and start commands to:
    - **Build command**: `npm install`
    - **Start command**: `npm start`
5. Set up environment variables in the Render dashboard (same as `.env`).
6. Render will automatically deploy your project.

---

## 🔗 Important Links

- 🔧 **Frontend Repo**: [your-frontend-repo-link]
- 🌍 **Backend Live URL**: [Train Seat Reservation Backend](https://train-reservation-backend-er3f.onrender.com)
- ⚙️ **Swagger API Docs**: [API Docs](https://train-reservation-backend-er3f.onrender.com/api-docs)

---

## 📩 Contact

For any suggestions, bugs, or issues, please open an issue on GitHub or contact [pratikpatil57432@gmail.com].
