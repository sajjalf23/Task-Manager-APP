const router = require("express").Router();
const { CreateTask, FetchAlltasks , UpdateTaskById , DeleteTaskById} =  require('../Controllers/Taskcontroller.js');

router.get('/',FetchAlltasks);

router.post('/', CreateTask);

router.delete('/:id', DeleteTaskById);

router.put('/:id', UpdateTaskById);

module.exports = router;

