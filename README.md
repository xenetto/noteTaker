# NoteTaker

An application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.

* The following HTML routes are created:

  * GET `/notes` - returns the `notes.html` file.

  * GET `*` - returns the `index.html` file

* The application has a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

* The following API routes are also created:

  * GET `/api/notes` - reads the `db.json` file and returns all saved notes as JSON.

  * POST `/api/notes` - recieves a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client.

  * DELETE `/api/notes/:id` - recieves a query paramter containing the id of a note to delete. Each note takes an unique `id` when it's saved. In order to delete a note, all notes are read from the `db.json` file, the note with the given `id` property is removed, and then the notes will be rewritten to the `db.json` file.

Published at : https://bootcamp-sahar-notetaker.herokuapp.com/
