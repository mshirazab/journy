const fs = require('fs-extra');
const crypto = require('crypto');
const nthline = require('nthline');

const dataFileName = './data/journal.txt';
const indexFileName = './data/journal-primary.txt';
const secondaryFileName = './data/journal-seconary.txt';

let indexData = {};
let secondaryData = {};
let isDeleting = false;

const readIndex = () => {
  fs.ensureFileSync(indexFileName);
  const fileContents = fs.readFileSync(indexFileName);
  indexData = fileContents
    .toString()
    .trim()
    .split('\n')
    .reduce((acc, elem) => {
      if (elem) {
        const id = elem.split('\t')[0];
        const pos = elem.split('\t')[1];
        acc[id] = pos;
      }
      return acc;
    }, {});
};
const writeIndex = () => {
  if (!isDeleting) {
    fs.ensureFileSync(indexFileName);
    const fileContents = Object.keys(indexData).reduce(
      (acc, elem) => `${acc}${elem}\t${indexData[elem]}\n`,
      '',
    );
    fs.writeFileSync(indexFileName, fileContents);
  }
};

const readSecondary = () => {
  fs.ensureFileSync(secondaryFileName);
  const fileContents = fs.readFileSync(secondaryFileName);
  secondaryData = fileContents
    .toString()
    .trim()
    .split('\n')
    .reduce((acc, elem) => {
      if (elem.split('\t').length !== 2) return acc;
      if (elem) acc[elem.split('\t')[0]] = elem.split('\t')[1].split(',');
      return acc;
    }, {});
};
const writeSecondary = () => {
  fs.ensureFileSync(secondaryFileName);
  const fileContents = Object.keys(secondaryData).reduce(
    (acc, elem) => `${acc}${elem}\t${secondaryData[elem].join(',')}\n`,
    '',
  );
  fs.writeFileSync(secondaryFileName, fileContents);
};
const repeatSetup = async () => {
  console.log('Writing secondary index into file');
  writeIndex();
  writeSecondary();
  setTimeout(repeatSetup, 5000);
};

const add = ({ username, entry, heading }) => {
  if (!username) return { success: false, message: 'Error while adding journal!' };
  let response;
  try {
    fs.ensureFileSync(dataFileName);
    const id = crypto.randomBytes(16).toString('hex');
    const position = Object.keys(indexData).length;
    fs.appendFileSync(
      dataFileName,
      `${id}\t${username}\t${Date.now().toString()}\t${heading}\t${entry}\n`,
    );
    indexData[id] = position;
    if (!(username in secondaryData)) {
      secondaryData[username] = [];
    }
    secondaryData[username].push(id);
    response = { success: true, message: 'Successfully added journal!' };
  } catch (e) {
    response = { success: false, message: 'Error while adding journal!' };
  }
  return response;
};
const del = ({ username, id }) => {
  if (!username) return { success: false, message: 'Error while deleting journal!' };
  if (!(id in indexData)) return { success: false, message: 'Error while deleting journal!' };
  const indexOfIdInSecondary = secondaryData[username].indexOf(id);
  if (indexOfIdInSecondary === -1) {
    return { success: false, message: 'Error while deleting journal!' };
  }
  isDeleting = true;
  const fileContents = fs
    .readFileSync(dataFileName)
    .toString()
    .trim();
  const deletedFileContents = fileContents.split('\n');
  deletedFileContents.splice(Number(indexData[id]), 1);
  console.log(deletedFileContents);
  let i = 0;
  fs.writeFileSync(dataFileName, deletedFileContents.join('\n'));
  if (deletedFileContents.length !== 0) fs.appendFileSync(dataFileName, '\n');
  indexData = {};
  deletedFileContents.forEach((elem) => {
    const elemId = elem.split('\t')[0];
    indexData[elemId] = i;
    i += 1;
  });
  secondaryData[username].splice(secondaryData[username].indexOf(id), 1);
  console.log(indexData, secondaryData);
  const response = { success: true, message: 'Successfully deleted journal!' };
  isDeleting = false;
  return response;
};
const getAll = async ({ username }) => {
  const message = [];
  for (const id of secondaryData[username]) {
    const line = await nthline(Number(indexData[id]), dataFileName);
    const data = {};
    [data.id, , data.time, data.heading, data.entry] = line.split('\t');
    // data.time = new Date(Number(line.split('\t')[2])).toLocaleDateString();
    message.push(data);
  }
  const response = { success: true, message };
  return response;
};

readIndex();
readSecondary();
repeatSetup();

module.exports = {
  add,
  del,
  getAll,
};
