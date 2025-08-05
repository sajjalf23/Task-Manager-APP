const TaskModel = require('../Models/Taskmodel');

const CreateTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res.status(201).json({ message: "Task Created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create Task", success: false });
  }
};

const FetchAlltasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json({ message: "All Tasks are Fetched", success: true ,tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Fetch Tasks", success: false });
  }
};

const UpdateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const Obj = {$set : {...body}};
    await TaskModel.findByIdAndUpdate(id , Obj);
    res.status(200).json({ message: "Task Updated", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Update Task", success: false });
  }
};

const DeleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task Deleted", success: true  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Delete Tasks", success: false });
  }
};


module.exports = {
  CreateTask,
  FetchAlltasks,
  UpdateTaskById,
  DeleteTaskById,
};
