// Simulated user data fetch function (meant to represent an API call)
function fetchUsers(callback) {
    setTimeout(() => {
      callback(JSON.parse(localStorage.getItem('users')) || []);
    }, 1000);
  }
  
  // Function to display users
  function displayUsers(users) {
    const userListDiv = document.querySelector('#usersList');
    userListDiv.innerHTML = '';
    users.forEach((user) => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `${user.name} <button onclick="deleteUser(${user.id})">Delete</button>`;
      userListDiv.appendChild(userDiv);
    });
  }
  
  // Function to add a new user
  function addUser() {
    const name = document.querySelector('#userName').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { id: Date.now(), name };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    fetchUsers(displayUsers);
  }
  
  // Function to delete a user
  function deleteUser(id) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter((user) => user.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    fetchUsers(displayUsers);
  }
  
  // Function to search users
  function searchUsers() {
    const query = document.querySelector('#search').value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(query));
    displayUsers(filteredUsers);
  }
  
  // Event listeners
  document.addEventListener('DOMContentLoaded', () => {
    fetchUsers(displayUsers);
  });
  
  document.querySelector('#addUserForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addUser();
  });
  
  document.querySelector('#search').addEventListener('input', searchUsers);
  