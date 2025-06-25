require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const Note=require('./models/note');
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Conncted to MongoDB Atlas"))
.catch((err)=>console.error("had an error connecting",err ));


app.get('/notes',async(req,res)=>{
try{
    const notes=await Note.find();
    res.json(notes);
}
catch(err){
    console.error(err);
    res.status(500).json({message:err.message});
}
});

app.post('/notes',async(req,res)=>{
    try{
        const {content,important}=req.body;
        const note=new Note({
            content,
            important: important || false,
        });
        const savedNote=await note.save();
        res.status(201).json(savedNote);
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message});
    }
});

app.delete('/notes/:id',async(req,res)=>{
   try{
    const deletedNode= await Note.findByIdAndDelete(req.params.id);
    if(!deletedNode){
        return res.status(404).json({message:'Note not found'});
    }
    res.status(204).end();

   }
   catch(err){
    console.error(err);
    res.status(500).json({message:err.message});
   }

});

app.put('/notes/:id',async(req,res)=>{
    try{
        const {content,important}=req.body;
        const updatedNote= await Note.findByIdAndUpdate(req.params.id,
            {content,important},
        {new: true,runValidators:true});
        if(!updatedNote){
            return res.status(404).json({message: "Note not found "});
        }
        res.status(200).json(updatedNote);

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err.message});
    }
});

app.listen(PORT,()=>{
console.log(`Listening to port ${PORT}`)
});





// require('dotenv').config();
// const mongoose=require('mongoose');
// const Note=require('./models/note');

// mongoose.connect(process.env.MONGODB_URI)
// .then(()=>{
//     console.log("onnected to MONGODB ATLAS");
//     const note=new Note({
//         content:"This is the first NOTE through Mongoose from Node.js",
//         important:true,
//     });
//     return note.save();

// })

// .then((savedNote)=>{
// console.log('Note saved',savedNote);
// return mongoose.connection.close();
// })

// .catch((err)=>{
// console.log('Error in connecying to mongoDB Atlas',err);
// });




// // const express=require('express');
// // const app= express();
// // const PORT=3000;
// // let notes=[];

// // app.use(express.json());
// // app.listen(PORT,()=>{
// //     console.log(`Listening to port${PORT}`);
// // });
// // app.get("/notes",(req,res)=>{
// //     res.json(notes);
// // });

// // app.post("/notes",(req,res)=>{
// //     const note={
// //         id: Date.now(),
// //         text: req.body.text
// //     };
// //     notes.push(note);
// //     res.status(201).json(note);
// // });

// // app.delete('/notes/:id',(req,res)=>{
// //     const id= Number(req.params.id)
// //     notes=notes.filter(note=>(note.id!==id));
// //     res.status(204).send();
// // });
