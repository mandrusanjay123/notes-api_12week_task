const mongoose=require('mongoose');

const noteSchema= new mongoose.Schema({
content:{
    type:String,
    required:true,
},
important:Boolean,
});

const Note=mongoose.model('Note',noteSchema);
module.exports=Note;


