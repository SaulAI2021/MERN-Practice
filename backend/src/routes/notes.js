const{Router} = require('express');
const router = Router();
const{getNotes,createNotes,getNote,deleteNote,updateNotes} = require('../controllers/notes.controller');


router.route('/')
  .get(getNotes)
  .post(createNotes);

router.route('/:id')
  .get(getNote)
  .put(updateNotes)
  .delete(deleteNote);
module.exports = router;