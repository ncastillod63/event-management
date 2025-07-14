Event Management - nadineisabelcastillodominguez198

Final project for Module 4 of the Javascript course, focusing on building a SPA (Single Page Application) web application with user authentication using HTML, CSS, JavaScript, and JSON Server to manage events.

---

Features

Authentication with login and logout

New user registration and login with roles

Event CRUD for administrators

Navigation between views (home, login, registration, dashboard)

Session persistence with local storage

Protected routes and redirects

Simulated API consumption with json-server

---
Installation

1. Clone the repository:

git clone https://github.com/ncastillod63/event-management.git
cd modulo-4-master

2. Install dependencies:

npm install

3. Start the API:

npm run start:api

4. Open in browser: http://localhost:3000/#/login


---

Test Users
Administrator: admin@eventos.co / admin123
Guest: moises.invitado@eventos.com / invitado123
You can add users manually in the db.json file under the "users" section or register using the /register view.

---

Technologies Used

HTML5

CSS3

JavaScript

JSON Server

---

Project Structure

Module-4-master/
├── db.json # Mock Database
├── public/
│ ├── index.html # Home Page
│ ├── styles.css # CSS Styles
│ └── js/
│ ├── api.js # API Functions
│ ├── auth.js # Authentication Logic
│ ├── router.js # Routing System
│ ├── app.js # Main Entrance
│ └── views.js # HTML templates per view
├── package.json # Project configuration
└── README.md # This file

---

Contributions

This is an academic project, but if you'd like to contribute or improve it, you're welcome! You can fork it or submit a pull request.

---

License

MIT License. Free to use for educational purposes.
