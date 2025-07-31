"use client"
import React, { useState, useEffect } from "react";
import Question from "./question"
import { fetchQuestion, generateQuizQuestions } from "@/lib/question"
import Congratulations from "./congrats"


interface QuizQuestion {
  flag: string;
  correctAnswer: string;
  options: string[];
}

type UserAnswers = {
  [questionIndex: number]: string;
};

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const questionData = await fetchQuestion();
    console.log(questionData)
    const quizQuestions: QuizQuestion[] = await generateQuizQuestions(questionData);
    setQuestions(quizQuestions);
    console.log(quizQuestions)
    setLoading(false);
  }
  console.log(questions);

  const handleAnswer = (questionIndex: number, selectedAnswer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedAnswer
    }));
  };

  const handleQuestionNavigation = (questionIndex: number) => {
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
    <div className="h-[100dvh] sm:w-[75dvw] sm:h-[90dvh] w-[100dvw] flex flex-col gap-8 justify-center px-4 sm:px-8  
        bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl  items-center  p-4">
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
          totalQuestions={10}
          handlePlayAgain={handlePlayAgain}
        />}
    </div>
  )
}