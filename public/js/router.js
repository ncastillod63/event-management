
// === Event Management===
// Instructions: Implement the routing and view logic by importing the necessary functions from views.js and auth.js.
// You can add, modify, or remove routes as required by your application.

// Import the necessary modules
import { auth } from './auth.js';
import {
  showLogin, // Implemented en views.js
  showRegister, // Implemented en views.js
  showDashboard, // Implemented en views.js
  showEvents, // Implemented en views.js
  showCreateEvent, // Implemented en views.js
  showEditEvent, // Implemented views.js
  showEnrolledEvent, // Implemented en views.js
  showEnrolledGuest, // Implemented en views.js
  renderNotFound, // Implemented en views.js
} from './views.js';

// SPA Routes
const routes = {
  '#/login': showLogin, // login view
  '#/register': showRegister, // register view
  '#/dashboard': showDashboard, // Main view after login
  '#/dashboard/events': showEvents, // List of events
  '#/dashboard/events/create': showCreateEvent, // Form to create event
  '#/dashboard/events/enrolled': showEnrolledEvent, // List of registered events
  '#/dashboard/events/enrolled/guests': showEnrolledGuest, // List of registered guests
  
};

// Main routing function middleware example
export function router() {
  const path = location.hash || '#/login'; // This is my current route, but if my route does not exist, it redirects to the login route.
  const user = auth.getUser();

  // Protecting dashboard routes
  if (path.startsWith('#/dashboard') && !auth.isAuthenticated()) {
    location.hash = '#/login';
    return;
  }

  // Prevent logged-in users from accessing login/register
  if ((path === '#/login' || path === '#/register') && auth.isAuthenticated()) {
    location.hash = '#/dashboard';
    return;
  }

  // dynamic route to edit event
  if (path.startsWith('#/dashboard/events/edit/')) {
    showEditEvent(); // Implementa esta función en views.js
    return;
  }
  // Prevent guests from accessing the event creation path
  if (path.startsWith('#/dashboard/events/create') && user.role === 'guest') {
    location.hash = '#/dashboard';
    return;
  }
  if (path === '#/dashboard/events/enrolled' && user.role === 'admin') {
    location.hash = '#/dashboard';
    return;
  }

  if (path.startsWith('#/dashboard/events/enrolled/guests') && user.role === 'guest') {
    location.hash = '#/dashboard';
    return;
  }

  // Load the corresponding view
  const view = routes[path];
  if (view) { // If the route exists, the view is loaded
    view();
  } else {
    renderNotFound(); // Implement this function in views.js
  }
}

