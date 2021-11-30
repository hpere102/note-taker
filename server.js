const fs = require('fs');
const path = require('path');

const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// allows additional files linked to the html to work
app.use(express.static('public'));

const { notes } = require('./db/db.json');



// filter array by id
function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)[0];
  return result;
}

// function for adding new note to data array
function createNewNote (body, NotesArray) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: NotesArray}, null, 2)
  );

  return note;

}

// adds new note to data array 
app.post('/api/notes', (req, res) => {
  
  req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes);
    res.json(note);

});

// displays data array 
app.get('/api/notes', (req, res) => {
  
  res.json(notes);

});

// displays array with id filter
app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// enables js function to delete from array but not currently working
app.delete('/api/notes/:id', (req, res) => {

  res.send(notes);

});

// allows server to connect with index html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

// allows server to connect with notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });








app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });