import mongoose from 'mongoose';

const { Schema } = mongoose;

const QuestionSchema = new Schema({
  question: String,
  correct_answer: String,
  incorrect_answer: Array,
  module_id: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
  },
});

export default mongoose.model('Question', QuestionSchema);
