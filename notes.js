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
      return newNote;
    }
  } else {
    notes.push(newNote);
    saveFile(notes);
    return newNote;
  }
}

const fetchAllNotes = () => {
  // Get all notes
  const notes = fetchFile();
  // Display them to the console
  if (notes.length > 0) {
    notes.forEach((note) => {
      helpers.printNote(note);
      console.log('---');
    });
  }
}

module.exports = {
  addNote,
  fetchAllNotes
};