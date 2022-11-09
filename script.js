'use strict';

const loadUser = async () => {
  const response = await fetch('https://randomuser.me/api');
  const { results } = await response.json();
  return results;
};

const getUser = async () => {
  const userData = await loadUser();

  const { picture, name, cell, location } = userData[0];

  const user = {};

  user.picture = picture.large;
  user.name = `${name.title} ${name.first} ${name.last}`;
  user.cell = cell;
  user.city = location.city;
  user.country = location.country;

  return user;
};

const getUsers = async (array, numberOfUsers) => {
  const user = await getUser();
  array.push(user);
  if (array.length === numberOfUsers) return;
  return getUsers(array, numberOfUsers);
};

const renderUsers = async () => {
  const users = [];

  await getUsers(users, 5);

  const usersToRender = [];

  for (const user of users) {
    const userToRender = `
      <div>
        <img src=${user.picture} alt=${user.name}>
        <p><b>Name:</b> ${user.name}</p>
        <p><b>Cell phone:</b> ${user.cell}</p>
        <p><b>Country:</b> ${user.country}</p>
        <p><b>City:</b> ${user.city}</p>
      </div>
    `;

    usersToRender.push(userToRender);
  }

  const usersElement = document.getElementById('users');

  const usersGroup = `
    <div id="group">
      ${usersToRender.join('\n')}
    </div>
  `;

  usersElement.insertAdjacentHTML('afterbegin', usersGroup);
};

const downloadButton = document.getElementById('download');

downloadButton.addEventListener('click', renderUsers);
