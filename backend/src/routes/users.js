const{Router} = require('express');
const router = Router();
const {getUser,createUser,deleteUser} = require('../controllers/users.controller');


router.route('/')
  .get(getUser)
  .post(createUser);

router.route('/:id')
 .delete(deleteUser);
module.exports = router;