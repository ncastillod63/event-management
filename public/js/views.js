// === Event Management ===


import { api } from './api.js'; // Implement and export API functions in api.js
import { auth } from './auth.js'; // Implement and export authentication functions in auth.js
import { router } from './router.js'; // Import the router to redirect after actions

// Display a page not found message
export function renderNotFound() {
  document.getElementById('app').innerHTML = '<h2>Page not found</h2>';
}


// Implements the login view
export async function showLogin() {
  document.getElementById('app').innerHTML = `
    <div class="login-container">
      <form id="form" class="login-form card">
        <h2 style="text-align:center; margin-bottom:1em;">Login</h2>
        <input type="email" id="email" placeholder="email">
        <input type="password" id="password" placeholder="pass">
        <button>Login</button>
        <br>
        <a href="#/register" data-link>Don't have an account? <strong class="text-blue-500 hover:text-blue-700">Sign up</strong></a>
      </form>
    </div>`;
  document.getElementById('form').onsubmit = async event => {
    event.preventDefault();
    try {
      await auth.login(event.target.email.value, event.target.password.value);
      location.hash = '#/dashboard';
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}

// Implements the log view
export async function showRegister() {
  document.getElementById('app').innerHTML = `
    <div class="login-container">
      <form id="f" class="login-form card">
        <h2 style="text-align:center; margin-bottom:1em;">Register</h2>
        <input placeholder="name" id="n">
        <input placeholder="email" id="e">
        <input placeholder="pass" id="p">
        <div class="flex flex-col gap-2">
          <label for="role">Rol</label>
          <select name="role" id="role">
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        <button>Register</button>
      </form>
    </div>`;
  document.getElementById('f').onsubmit = async e => {
    e.preventDefault();
    console.log(e.target.role.value)
    try {
      await auth.register(e.target.n.value, e.target.e.value, e.target.p.value, e.target.role.value);
      location.hash = '#/dashboard';
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}

// Implements the main view of the dashboard
export async function showDashboard() {
  const u = auth.getUser();
  document.getElementById('app').innerHTML = `
    <div class="flex flex-col gap-4">
      <h2>Welcome, ${u.name} (${u.role})</h2>
      <button id="out" class="w-40">Exit</button>
    <nav>
        <a href="#/dashboard/events" data-link>View Events</a>
        ${u.role === 'guest' ? `<a href="#/dashboard/events/enrolled" data-link>View registered events</a>` : ''}
        ${u.role === 'admin' ? `<a href="#/dashboard/events/create" data-link>Create event</a>` : ''}
        ${u.role === 'admin' ? `<a href="#/dashboard/events/enrolled/guests" data-link>View registered guests by event</a>` : ''}
      </nav>
    </div>`;
  document.getElementById('out').onclick = () => {
    auth.logout();
    location.hash = '#/login';
  };
  document.querySelectorAll('[data-link]').forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      location.hash = a.getAttribute('href');
    };
  });
}


// Implements the event listing view
export async function showEvents() {
  const user = auth.getUser();
  const events = await api.get('/events');

  document.getElementById('app').innerHTML = `
  <button onclick="location.hash = '#/dashboard'" class="bg-blue-500 text-white px-4 py-2 rounded-md"> Return </button>
    <h2>Available events</h2>
    <ul class="flex flex-col gap-4">${events.map(c => `
      <li>${c.title || 'Sin título'} (${c.capacity || 0} slots) — <strong>Planner:</strong> ${c.planner || 'N/A'} — <strong>Place:</strong> ${c.place || 'N/A'} — <strong>Description:</strong> ${c.description || 'N/A'}
        ${user.role === 'admin' ? `<button class="edit-btn" data-id="${c.id}">Edit</button>` : ''}
        ${user.role === 'admin' ? `<button class="delete-btn" data-id="${c.id}">Delete</button>` : ''}
        ${user.role === 'guest' ? `<button class="enroll-btn" data-id="${c.id}">Register</button>` : ''}
      </li>`).join('')}</ul>`;

  if (user.role === 'guest') {
    document.querySelectorAll('.enroll-btn').forEach(btn => {
      btn.onclick = async () => {
        const eventId = btn.dataset.id;

        // Get current event
        const event = await api.get('/events/' + eventId);
        // Simulate list of registered participants (optional)
        if (!event.enrolled) event.enrolled = [];

      // Avoid double registration
        if (event.enrolled.includes(user.email)) {
          alert('You are already registered for this event.');
          return;
        }

        let capacity = event.capacity - 1;

        
// Check capacity
        if (event.enrolled.length >= event.capacity) {
          alert('This event is already full.');
          return;
        }

        event.enrolled.push(user.email);
        event.capacity = capacity;

        await api.put('/events/' + eventId, event);
        alert('Successful registration!');
        showEvents(); // reload list
      };
    });
  }

  if (user.role === 'admin') {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.onclick = () => {
        const eventId = btn.dataset.id;
        location.hash = '#/dashboard/events/edit/' + eventId;
      };
    });
  }
  if (user.role === 'admin') {
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = async () => {
        const eventId = btn.dataset.id;
        await api.del('/events/' + eventId);
        alert('event deleted successfully');
        showEvents();
      };
    });
  }
}

// Implement the view to create an event (admin only)
export function showCreateEvent() {
  document.getElementById('app').innerHTML = `
  <button onclick="location.hash = '#/dashboard'" class="bg-blue-500 text-white px-4 py-2 rounded-md"> Return </button>
    <h2>Create event</h2>
    <form id="f">
      <input placeholder="Title" id="title">
      <input placeholder="Planner" id="planner">
      <input placeholder="Description" id="description">
      <input placeholder="Place" id="place">
      <input type="number" placeholder="Capacity" id="capacity">
      <button>Save</button>
    </form>`;
  document.getElementById('f').onsubmit = async e => {
    e.preventDefault();
    if (e.target.title.value === '' || e.target.planner.value === '' || e.target.capacity.value === '' || e.target.description.value === '' || e.target.category.value === '') {
      alert('All fields are required');
      return;
    }
    const data = {
      title: e.target.title.value,
      planner: e.target.planner.value,
      capacity: parseInt(e.target.capacity.value),
      description: e.target.description.value,
      place: e.target.place.value
    };
    await api.post('/events', data);
    location.hash = '#/dashboard/events';
    router();
  };
}

// Implements the view to edit an event (admin only)
export async function showEditEvent() {
  const user = auth.getUser();
  if (user.role !== 'admin') {
    renderNotFound();
    return;
  }

  const eventId = location.hash.split('/').pop();
  const event = await api.get('/events/' + eventId);

  if (!event) {
    renderNotFound();
    return;
  }

  document.getElementById('app').innerHTML = `
    <h2>Edit event</h2>
    <form id="f">
      <input id="title" placeholder="Title" value="${event.title}">
      <input id="planner" placeholder="Planner" value="${event.planner}">
      <input type="number" id="capacity" placeholder="Capacity" value="${event.capacity}">
      <button>Save</button>
    </form>`;

  document.getElementById('f').onsubmit = async e => {
    e.preventDefault();
    const updated = {
      title: e.target.title.value,
      planner: e.target.planner.value,
      capacity: parseInt(e.target.capacity.value)
    };
    await api.put('/events/' + eventId, updated);
    location.hash = '#/dashboard/events';
    router();
  };
}




// Implements the view to see the registered events
export async function showEnrolledEvent() {
  const user = auth.getUser();
  const events = await api.get('/events');
  document.getElementById('app').innerHTML = `
    <button onclick="location.hash = '#/dashboard'" class="bg-blue-500 text-white px-4 py-2 rounded-md"> Volver </button>
    <h2>Registered events</h2>
    <ul class="flex flex-col gap-4">${events.filter(c => c?.enrolled?.includes(user.email)).map(c => `
      <li>${c.title || 'Untitled'} (${c.capacity || 0} slots) — planner: ${c.planner || 'N/A'}
      </li>`).join('')}
    </ul>`;
}

// see the complete list of registered guests per event
export async function showEnrolledGuest() {
  const events = await api.get('/events');
  const guests = await api.get('/users?role=guest');


// Render the select and an empty container for the guest list
  document.getElementById('app').innerHTML = `
    <button onclick="location.hash = '#/dashboard'" class="bg-blue-500 text-white px-4 py-2 rounded-md"> Return </button>
    <div class="flex flex-col gap-2">
      <label for="event">Select an event</label>
      <select name="event" id="event">
        ${events.map(c => `<option value="${c.id}">${c.title || 'Untitled'}</option>`).join('')}
      </select>
    </div>
    <h2>Registered guests</h2>
    <ul id="guests-list" class="flex flex-col gap-4"></ul>
  `;

  // Function to render the guests registered for the selected event
  function renderguests(eventId) {
    const event = events.find(c => c.id == eventId);
    if (!event || !event.enrolled || event.enrolled.length === 0) {
      document.getElementById('guests-list').innerHTML = '<li>There are no guests registered.</li>';
      return;
    }
    const enrolledguests = guests.filter(s => event.enrolled.includes(s.email));
    document.getElementById('guests-list').innerHTML = enrolledguests.map(s =>
      `<li>${s.name || 'Unnamed'} (${s.email || 'N/A'})</li>`
    ).join('');
  }

 // Render the guests of the first event by default
  const select = document.getElementById('event');
  renderguests(select.value);

  
// Change the list when another event is selected
  select.onchange = () => {
    renderguests(select.value);
  };
}