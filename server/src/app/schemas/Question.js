import mongoose from 'mongoose';

const { Schema } = mongoose;

const QuestionSchema = new Schema({
  description: String,
  alternatives: [
    {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  content: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Question', QuestionSchema);
