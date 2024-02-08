const notesCtrl = {};

notesCtrl.getNotes = (req,res)=> res.json({message : [] });
notesCtrl.createNotes = (req,res)=> res.json({message : 'POST Request'});
notesCtrl.updateNotes =  (req,res)=> res.json({title : 'Update'});
notesCtrl.getNote  =  (req,res)=> res.json({title : 'note'});
notesCtrl.deleteNote  =  (req,res)=> res.json({title : 'Delete'});
module.exports = notesCtrl;