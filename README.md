# Exulted Eagles Survey Form

This project is a customised dynamic survey form for EXULTED EAGLES TECHNICAL SERVICES (A leading manufacturing solar company in Nigeria) to get user's feedback that will help to improve the quality of services rendered. It is built with Next.js and MongoDB. It enables customers to provide valuable feedback about branches, services, and ratings, and includes an admin dashboard for managing responses. The admin dashboard supports searching by branch name, deleting responses, and viewing chart analyses of the feedback data.

## Features

### User Side

- A simple and user-friendly questionnaire form for customers.
- Form submissions are saved to a MongoDB database.

### Admin Side

- **Login Authentication**: Protects access to the admin page.
- **View Responses**: Displays survey responses in a table.
- **Search Responses**: Filters responses by branch name.
- **Delete Responses**: Allows administrators to delete specific responses.
- **Chart Analysis**: Provides graphical insights into survey data.
- **Logout Option**: Securely logs out the admin.

## Technologies Used

- **Frontend**: Next.js (React-based framework), Tailwind CSS for styling.
- **Backend**: Node.js API routes.
- **Database**: MongoDB for storing user responses.
- **Authentication**: Simple localStorage-based login for admin access.

## Installation

### Prerequisites

- Node.js installed on your machine.
- MongoDB database set up (local or cloud).

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/Charzy-1/exultedeagles-questionaire.git
   ```

2. Navigate to the project directory:

   ```bash
   cd exulted-eagles-survey
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root of the project and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Author

👤 **Charles Adikankwu**

- GitHub: [@githubhandle](https://github.com/Charzy-1)
- Twitter: [@twitterhandle](https://x.com/CharlyB124?t=DqI9VdevQ1kz7k3u2dOOtQ&s=08)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/charles-adikankwu)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Show Your Support

Give a ⭐️ if you like this project!

## Acknowledgments

- Chill Academy
- React, Redux, Nextjs and Js mastery
