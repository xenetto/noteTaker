const express = require("express");
const path = require("path");
const fs = require ("fs");
const uuidv4 = require("uuid/v4");
const db = require("./db/dbArr");

const port = process.env.PORT || 3000; // set our port
const app = express(); // create our server

Init();

function Init(){

    // to serve static content from the 'html' directory
    app.use(express.static('public'));

    // handle bodyparser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // starts our server
    app.listen(port, function() { console.log("App listening on PORT: " + port); });
   
    // initialize the array
    db.arr = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

}


// Defining Routes :
app.get('/api/notes', function(req, res){
    
    console.log( 'GET method /api/notes' );
    
    let rawdata = fs.readFileSync('./db/db.json'); 
    
    // agar rawdata ro send back konam file download mishe
    // let note = JSON.parse(rawdata);
    // console.log(note.id + "--" + note.title + "--" + note.text);
    
    res.send(db.arr); 
});

app.post('/api/notes', function(req, res){
    console.log( 'POST method /api/notes' );
    
    let note = { 
        id : uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    
    db.arr.push(note);

    
    fs.writeFileSync("./db/db.json", JSON.stringify(db.arr) , function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

    res.send(note);
});

app.delete('/api/notes/:id', function(req, res){
    const id = req.params.id;
    console.log( 'DELETE method : ' + id );
    
    db.arr = removeFromObjectArray(db.arr, "id", id);
    console.log(`now Array has ${db.arr.length} members. *** after delete executed!` );
   
    fs.writeFileSync("./db/db.json", JSON.stringify(db.arr) , function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
     });
    res.send(`Note with id ${id} deleted successfully !`);
});

app.get('/notes', function(req, res){
    console.log( 'GET method /notes returns the notes.html file' );
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get('*', function(req, res){
    console.log("GET method /* returns the index.html file");
    res.sendFile(path.join(__dirname, "public/index.html"));

});

function removeFromObjectArray (arrList, prop, val){
    console.log(`** function called to remove object from array **`)
    return arrList.filter(check);
    function check(element) { return element[prop] != val; }
}