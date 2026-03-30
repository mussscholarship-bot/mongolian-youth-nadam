# Mongolian Youth Nadam Event Registration

This project is a web application for online registration for the "Mongolian Youth Nadam" event in Japan. It allows participants to register, and includes an admin panel for managing registrations and sending confirmation emails.

## Features

- **Participant Registration**: Users can fill out a registration form to participate in the event.
- **Email Confirmation**: Automatic confirmation emails are sent to participants upon successful registration.
- **Admin Panel**: Admins can view registration data and manage participant information.

## Project Structure

```
mongolian-youth-nadam
├── src
│   ├── app.ts
│   ├── controllers
│   │   ├── adminController.ts
│   │   ├── emailController.ts
│   │   └── registrationController.ts
│   ├── models
│   │   └── participant.ts
│   ├── routes
│   │   ├── adminRoutes.ts
│   │   └── registrationRoutes.ts
│   ├── services
│   │   ├── emailService.ts
│   │   └── registrationService.ts
│   ├── utils
│   │   └── validation.ts
│   └── views
│       ├── admin
│       │   └── dashboard.ejs
│       └── registration
│           └── form.ejs
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
│   └── assets
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd mongolian-youth-nadam
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```
2. Access the application in your web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.