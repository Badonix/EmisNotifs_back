# Emis notifications

This a source code of the backend of [emisnotifs.netlify.app](https://emisnotifs.netlify.app). Its basically a Node.js application which serves to connect to the EMIS API and send you an email using Nodemailer when you receive a new score (you must run a cron-job on `/check-scores` endpoint). It uses MongoDB as its primary database for storing user information and application data.

## ✨ Features

* **EMIS API Integration:** Securely fetches data from an EMIS API using user-specific tokens.
* **Email Notifications:** Uses Nodemailer and Google App Passwords to send emails to users.
* **Database:** Leverages MongoDB for persistent data storage.
* **Secure:** Manages sensitive information and secrets using environment variables.
* **JWT Authentication:** Uses JSON Web Tokens for securing API routes.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

* [Node.js](https://nodejs.org/en/) (v14.x or later recommended)
* [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
* [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

## 🚀 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/badonix/EmisNotifs_back.git
    cd EmisNotifs_back
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add the variables listed below.
    ```bash
    touch .env
    ```

## ⚙️ Environment Variables

You will need to add the following environment variables to your `.env` file. Populate them with your specific credentials and configuration details.

```plaintext
# Server Configuration
PORT=6969

# MongoDB Database Credentials
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_URL=your_mongodb_connection_string

# Nodemailer (Google Mail) Configuration
GOOGLE_APP_EMAIL=your_google_email@gmail.com
GOOGLE_APP_PASSWORD=your_16_digit_google_app_password

# JWT Secret Key
TOKEN_SECRET_KEY=your_super_secret_and_long_key
```

**Note on `GOOGLE_APP_PASSWORD`:** This is not your regular Google account password. You need to generate a 16-digit "App Password" from your Google Account security settings. [Learn how here](https://support.google.com/accounts/answer/185833).

## ▶️ Usage

To start the application in development mode, run:

```bash
npm start
```

The server will start on the port specified in your `.env` file (e.g., `http://localhost:6969`).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the ProjectToday at 12:35:00 AM	
HISTORY
EDIT

2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
