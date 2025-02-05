# Earnly Platform

Welcome to **Earnly**, a Micro-Task and Earning Platform designed to empower workers and streamline task management for buyers. Below is an overview of the project, its features, and relevant credentials.

## Admin Credentials
- **Email**: rkjia1311@gmail.com
- **Password**: Admin13

## Live Site URL
[Visit Earnly Platform](https://earnly-fad73.web.app/)

## 📸 Screenshot
![Earnly Screenshot](https://i.ibb.co.com/mrHg4dWV/Screenshot-2025-02-05-153029.png) 

## Key Features

1. **User Roles**:
   - Two primary user roles: Workers and Buyers.
   - Admin panel for monitoring and managing the platform.

2. **Task Management**:
   - Buyers can create tasks and assign them to workers.
   - Workers can view and complete tasks for earnings.

3. **Earning System**:
   - Workers earn coins upon completing tasks.
   - Buyers purchase coins to create tasks (10 coins = $1).

4. **Withdrawal System**:
   - Workers can withdraw earnings (1 dollar = 20 coins).
   - Minimum withdrawal threshold: 200 coins ($10).

5. **Admin Dashboard**:
   - View total workers, total buyers, total coins in circulation, and total payments made.
   - Manage withdrawal requests with the ability to approve and update statuses.

6. **Payment Integration**:
   - Integration with Stripe for secure payments.
   - Options for Bkash, Rocket, Nagad, and other local payment systems.

7. **Leaderboard**:
   - Highlights top-performing workers based on earnings.

8. **Secure Authentication**:
   - JWT-based authentication system.
   - Role-based access control for Admin, Workers, and Buyers.

9. **User-Friendly Interface**:
   - Responsive design for seamless experience across devices.
   - Dashboard views tailored to each user role.

10. **Robust Backend**:
   - Built with Node.js and Express.
   - MongoDB as the database for scalable and efficient data management.

## Installation
1. Clone the repository.
   ```bash
   git clone https://github.com/your-repo/earnly.git
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file.
   ```env
   DB_USER=your_db_user
   DB_PASS=your_db_password
   STRIPE_SECRET_KEY=your_stripe_secret
   ACCESS_TOKEN_SECRET=your_jwt_secret
   ```
4. Start the development server.
   ```bash
   npm run dev
   ```

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Gateway**: Stripe

---

Enjoy exploring **Earnly**! For any questions or support, feel free to reach out.
