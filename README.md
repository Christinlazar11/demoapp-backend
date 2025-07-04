# Learner Licence Application Backend

This is a Node.js/Express backend for managing learner licence applications. It supports user submissions, admin review, email notifications, and file uploads to Cloudinary.

## Features
- User application submission with validation
- Admin login and JWT-based authentication
- Admin can view and update application statuses
- Email notifications for submissions and status updates
- File uploads (images, PDFs) to Cloudinary
- Modular code structure with controllers, services, middleware, and utils

## Tech Stack
- Node.js, Express, TypeScript
- MongoDB (via Mongoose)
- Nodemailer (for email)
- Cloudinary (for file uploads)
- JWT (for authentication)

## Project Structure
```
src/
  app.ts                # Main entry point
  controllers/          # Route controllers (admin, user)
  middleware/           # Auth, upload, etc.
  models/               # Mongoose models
  routes/               # Express route definitions
  services/             # Mailer, JWT, etc.
  utils/                # DB connection, enums, email templates
```

## Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB instance

### Installation
1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd ass-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ass-backend
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_admin_password
   SMTP_EMAIL=your_email@gmail.com
   SMTP_PASSWORD=your_email_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Running the App
- Development:
  ```bash
  npm run dev
  ```
- Production:
  ```bash
  npm run build
  npm start
  ```

## API Endpoints

### User
- `POST /api/user/submission` — Submit a new application

### Admin
- `POST /api/admin/login` — Admin login
- `GET /api/admin/submissions` — Get all submissions (auth required)
- `PATCH /api/admin/submissions/:id/status` — Update submission status (auth required)

## Environment Variables
See the `.env` example above. All sensitive credentials are loaded from environment variables.

## File Uploads
- Images and PDFs are uploaded to Cloudinary.
- Max file size: 2MB
- Allowed types: PDF, PNG, JPEG, JPG

## Email Notifications
- Uses Nodemailer with Gmail SMTP.
- Email templates are in `src/utils/emailTemplates.ts`.

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
MIT 