const fs = require('fs');
const path = require('path');

const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

const { notes } = require('./db/db.json');




function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)[0];
  return result;
}


function createNewNote (body, NotesArray) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: NotesArray}, null, 2)
  );

  return note;

}


app.post('/api/notes', (req, res) => {
  
  req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes);
    res.json(note);

});


app.get('/api/notes', (req, res) => {
  
  res.json(notes);

});

app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.delete('/api/notes/:id', (req, res) => {

  res.send(notes);

});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });








app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });