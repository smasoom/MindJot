import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
 title:{
    type: String,
    require:true
 },
 description:{
    type: String,
    require:true
   
 },
 tag:{
    type: String,
    default:general
 },
 date:{
    type: Date,
    require:Date.now
 }
});

module.exports = mongoose.model('notes', NotesSchema)