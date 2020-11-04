import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';
import Questionaire from '~/components/Questionaire';
import Score from '~/components/Score';
import DefaultLayout from '~/pages/_layouts/default';
import api from '~/services/api';

// const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

function Questions({ match }) {
  const { module_id } = match.params;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
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

  const handleAnswer = async (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        const amount = await api.post(`score/${questions[currentIndex]._id}`);
        const { score } = amount.data;
        setCount(score);
      }
    }

    const amount = await api.get('score');
    const score = amount.data;

    setCount(score);

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);

    setShowAnswers(false);
  };

  return questions.length > 0 ? (
    <DefaultLayout>
      {currentIndex >= questions.length ? (
        <Score score={count} />
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

export default Questions;
