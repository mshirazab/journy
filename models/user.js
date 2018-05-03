const fs = require('fs-extra');
const bcrypt = require('bcrypt');

const fileName = './data/user.txt';
const getUsers = async () => {
  fs.ensureFileSync(fileName);
  const fileContents = await fs.readFile(fileName);
  const users = fileContents
    .toString()
    .trim()
    .split('\n')
    .map(user => ({ username: user.split('\t')[0], password: user.split('\t')[1] }));
  return users;
};
/**
 * creates a user
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} message of type object with a success flag and message
 */
const create = async (username, password) => {
  const users = await getUsers();
  const foundUser = users.find(user => user.username === username);
  if (foundUser === undefined) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    fs.appendFileSync(fileName, `${username}\t${hashedPassword}\n`);
    return {
      message: 'User created successfully, please login!',
      success: true,
    };
  }
  return {
    message: 'Username already taken!',
    success: false,
  };
};
/**
 * Finds and returns the user object
 *
 * @param {string} username
 * @returns {Promise<Object>} returns an object with sucess flag and a message
 */
const find = async (username) => {
  const users = await getUsers();
  const foundUser = users.find(user => user.username === username);
  return foundUser;
};

module.exports = {
  create,
  find,
};
