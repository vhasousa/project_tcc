import mongoose from 'mongoose';

import Question from './Question';

const { Schema } = mongoose;

const QuestionDoneSchema = new Schema({
  user_id: Number,
  questions: [
    {
      question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
      },
    },
  ],
});

export default mongoose.model('QuestionDone', QuestionDoneSchema);
