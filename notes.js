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
  const notes = fetchFile();

  if (notes.length > 0) {
    notes.forEach((note) => {
      helpers.printNote(note);
      console.log('---');
    });

    return true;
  }

  return false;
}

const fetchOneNote = (title) => {
  const notes = fetchFile();
  const targetNote = notes.filter(note => note.title === title);

  if (targetNote.length === 0) {
    return false;
  } else if (targetNote.length === 1) {
    helpers.printNote(targetNote[0]);
    return targetNote[0];
  }
}

const deleteNote = (title) => {
  const notes = fetchFile();
  const newArr = notes.filter(note => note.title !== title);

  saveFile(newArr);
  helpers.printAllNotes(newArr);
  return newArr;
}

const updateNote = (title, newTitle, newBody) => {
  const notes = fetchFile();
  let targetNote = notes.filter(note => note.title === title);

  if (targetNote.length > 0) {
    targetNote = targetNote[0];
  } else if (targetNote.length === 0) {
    return false;
  }

  if (newTitle) targetNote.title = newTitle;
  if (newBody) targetNote.body = newBody;
  targetNote.updatedAt = helpers.getFormattedDate();

  let updatedNotes = notes.filter(note => note.title !== title);
  updatedNotes.push(targetNote);

  saveFile(updatedNotes);
  helpers.printNote(targetNote);

  return targetNote;
};


module.exports = {
  addNote,
  fetchAllNotes,
  fetchOneNote,
  deleteNote,
  updateNote
};

