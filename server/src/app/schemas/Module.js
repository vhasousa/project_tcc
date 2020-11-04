import mongoose from 'mongoose';

const { Schema } = mongoose;

const ModuleSchema = new Schema({
  number: Number,
  description: String,
  grade_id: Number,
});

export default mongoose.model('Module', ModuleSchema);
