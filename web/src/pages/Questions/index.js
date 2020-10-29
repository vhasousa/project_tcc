import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Questionaire from '~/components/Questionaire';
import DefaultLayout from '~/pages/_layouts/default';
import api from '~/services/api';

// const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

function Questions({ match }) {
  const { module_id } = match.params;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    api.get(`questions/${module_id}`).then((res) => {
      const questionsSort = res.data.results.map((question) => ({
        ...question,
        answers: [question.correct_answer, ...question.incorrect_answer].sort(
          () => Math.random() - 0.5
        ),
      }));
      setQuestions(questionsSort);
    });
  }, [module_id]);

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);

    setShowAnswers(false);
  };

  return questions.length > 0 ? (
    <DefaultLayout>
      {currentIndex >= questions.length ? (
        <h1>Your Score was {score}</h1>
      ) : (
        <Questionaire
          data={questions[currentIndex]}
          showAnswers={showAnswers}
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
        />
      )}
    </DefaultLayout>
  ) : (
    <h1>Carregando...</h1>
  );
}

Questions.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      module_id: PropTypes.string,
    }),
  }).isRequired,
};

export default Questions;
