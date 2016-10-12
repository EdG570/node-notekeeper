const fs = require('fs');
const helpers = require('./helpers.js');

const fetchFile = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch(e) {
    return [];
  }
}

const saveFile = (note) => {
  fs.writeFileSync('notes.json', JSON.stringify(note));
}

const addNote = (title, body) => {
  let notes = [];
  let date = helpers.getFormattedDate();
  let newNote = {
    title,
    body,
    createdAt: date,
    updatedAt: date
  };

  notes = fetchFile();

  if (notes.length > 0) {
    let target = notes.filter(note => note.title === title);

    if (target.length === 0) {
      notes.push(newNote);
      saveFile(notes);
    }
  } else {
    notes.push(newNote);
    saveFile(notes);
  }

  // create the new note object
  // fetch notes file
  // Check if note title exists
  //    If note doesn't exist add new note object to fetch notes file
  //    else do nothing and return a response to the user that note exists and it wasn't saved
  // save updated notes file

}

module.exports = {
  addNote
};