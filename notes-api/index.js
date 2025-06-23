const express=require('express');
const app= express();
const PORT=3000;
let notes=[];

app.use(express.json());
app.listen(PORT,()=>{
    console.log(`Listening to port${PORT}`);
});
app.get("/notes",(req,res)=>{
    res.json(notes);
});

app.post("/notes",(req,res)=>{
    const note={
        id: Date.now(),
        text: req.body.text
    };
    notes.push(note);
    res.status(201).json(note);
});

app.delete('/notes/:id',(req,res)=>{
    const id= Number(req.params.id)
    notes=notes.filter(note=>(note.id!==id));
    res.status(204).send();
});
