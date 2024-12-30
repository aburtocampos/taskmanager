const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    description: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

// autoincremento para el campo taskId
TaskSchema.plugin(AutoIncrement, { inc_field: 'taskId' });

// índice único para garantizar que taskId no se repita
TaskSchema.index({ taskId: 1 }, { unique: true });

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;
