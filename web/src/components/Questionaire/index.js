import React from 'react';

import { Container, Button } from './styles';

// const Answers = ({ answer, className }) => (
//   <button className={className} type="button">
//     {answer}
//   </button>
// );

function Questionaire({
  showAnswers,
  handleAnswer,
  handleNextQuestion,
  data: { question, correct_answer, answers },
}) {
  return (
    <Container>
      <h2
        className="text-purple-700"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div>
        {answers.map((answer) => {
          const textColor = showAnswers
            ? answer === correct_answer
              ? 'text-green-500'
              : 'text-red-500'
            : 'text-purple-700';

          return (
            <button
              className={`${textColor} bg-white hover:bg-gray-300`}
              onClick={() => handleAnswer(answer)}
              type="button"
            >
              {answer}
            </button>
          );
        })}
        {showAnswers && (
          <Button
            onClick={handleNextQuestion}
            className="bg-purple-700 hover:bg-purple-600"
          >
            Próximo
          </Button>
        )}
      </div>
    </Container>
  );
}

export default Questionaire;
