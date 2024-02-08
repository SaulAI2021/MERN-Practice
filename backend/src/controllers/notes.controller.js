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
notesCtrl.getNote =  async (req,res)=> {
  const note = await NoteModel.findById(req.params.id);
  res.json(note)
};
notesCtrl.updateNotes =  async (req,res)=>{
  const {title, content,author} = req.body;
  await NoteModel.findByIdAndUpdate(req.params.id,{
    title,
    content,
    author
  });
  res.json({message : "Nota actualizada"});
}
notesCtrl.deleteNote  =  async (req,res)=> {
  await NoteModel.findByIdAndDelete(req.params.id);
  res.json({message : "Nota eliminada"});
};
module.exports = notesCtrl;