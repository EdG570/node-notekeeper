const fs = require('fs');

const fetchFile = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch(err) {
    return [];
  }
}

const saveFile = (note) => {
  fs.writeFileSync('notes.json', JSON.stringify(note));
}

const addNote = (title, body) => {
  const note = {
    title,
    body
  };

  const file = fetchFile();
  // create the new note object
  // fetch notes file
  // add new note object to fetch notes file
  // save updated notes file

}