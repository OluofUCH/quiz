"use client"
import React, { useState, useEffect } from "react";
import Question from "./question"
import {fetchQuestion, generateQuizQuestions} from "@/lib/question"
import Congratulations from "./congrats"


export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  loadData();
  }, []);

  const loadData = async ()=>{
  const questionData  = await fetchQuestion();
      console.log(questionData)
    const quizQuestions = await generateQuizQuestions(questionData);
      setQuestions(quizQuestions);
      console.log(quizQuestions)
  }
  console.log(questions);

  const handleAnswer = (questionIndex, selectedAnswer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedAnswer
    }));
  };

  const handleQuestionNavigation = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 10 - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    console.log("first")
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

    const handleFinishQuiz = () => {
    setShowResult(true);
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResult(false);
    loadData();
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };


 
  

  return (
    <div className="h-[100dvh] sm:w-[70dvh] rounded-xl w-[100dvw] bg-gradient-to-br from-purple-900  to-indigo-900 flex items-center justify-center p-4">
    <Question
            question={questions[currentQuestion]}
            questionIndex={currentQuestion}
            userAnswer={userAnswers[currentQuestion]}
            handleAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
            onFinish={handleFinishQuiz}
            />
             {showResult && 
      <Congratulations
        correctAnswers={calculateScore()}
        totalQuestions="10"
        handlePlayAgain={handlePlayAgain}
      /> }
    </div>
  )
}

