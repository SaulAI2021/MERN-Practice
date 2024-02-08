const notesCtrl = {};
const NoteModel  = require('../models/Note')

notesCtrl.getNotes = async (req,res)=> {
  const notes = await NoteModel.find();
  res.json(notes)
};
notesCtrl.createNotes = async (req,res)=> {
  const {title,content,date,author} = req.body;
  const newNote = new NoteModel({
    title : title,
    content : content,
    author : author,
    date: date
  });
  await newNote.save();
  res.json({message : 'POST Request'})
}
notesCtrl.updateNotes =  (req,res)=> res.json({title : 'Update'});
notesCtrl.getNote  =  (req,res)=> res.json({title : 'note'});
notesCtrl.deleteNote  =  (req,res)=> res.json({title : 'Delete'});

module.exports = notesCtrl;