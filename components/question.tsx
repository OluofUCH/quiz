import React, { useState, useEffect } from "react";
import ProgressBar from "./progressbar";

interface QuestionType {
  flag: string;
  options: string[];
}

interface Props {
  question: QuestionType | undefined;
  questionIndex: number;
  userAnswer: string | null;
  handleAnswer: (index: number, answer: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Question({
  question,
  questionIndex,
  userAnswer,
  handleAnswer,
  onNext,
  onPrev,
  onFinish,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer || null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setSelectedAnswer(userAnswer || null);
    setShowFeedback(!!userAnswer);
  }, [userAnswer, questionIndex]);

  const handleOptionClick = (option: string) => {
    if (selectedAnswer) return; 
    setSelectedAnswer(option);
    setShowFeedback(true);
    handleAnswer(questionIndex, option);
  };
  const next=()=>{
    setShowFeedback(false);
  }
  const getOptionStyle = (option) => {
    if (!showFeedback) {
      return "bg-slate-700/50 hover:bg-slate-600/50 text-white border-slate-600";
    }
    
    if (option === question.correctAnswer) {
      return "bg-green-500 text-white border-green-400";
    }
    
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return "bg-red-500 text-white border-red-400";
    }
    
    return "bg-slate-700/30 text-gray-400 border-slate-600";
  };

  const getOptionIcon = (option) => {
    if (!showFeedback) return null;
    
    if (option === question.correctAnswer) {
      return <span className="ml-2">✓</span>;
    }
    
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return <span className="ml-2">✗</span>;
    }
    
    return null;
  };

  if (!question) {
    return (
      <div className="flex flex-col gap-8 justify-center">
        <ProgressBar />
        <div className="text-center mb-8">
          <h2 className="text-white text-xl mb-6">
            No question data available.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div key={questionIndex} className="flex w-full flex-col gap-8 justify-center">
      <ProgressBar 
          current={questionIndex}/>
      <div className="text-center mb-8">
        <h2 className="text-white text-xl mb-6">
          Which country does this flag belong to?
        </h2>
        <div className="mb-8">
          <img
            src={question.flag}
            alt="Country flag"
            className="w-64 h-40 object-cover rounded-lg mx-auto shadow-lg border-2 border-slate-600"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
         {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={showFeedback}
            className={`
              p-4 rounded-xl font-medium transition-all duration-200 border-2 text-left
              ${getOptionStyle(option)}
              ${!showFeedback ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
              flex items-center justify-between
            `}
          >
            <span>{option}</span>
            {getOptionIcon(option)}
          </button>
        ))}
      </div>
     <div className="flex gap-4  items-center">
       {(questionIndex > 0) && 

         <button
         className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium "
         onClick={onPrev} >
          Previous
        </button>
      }


          {(questionIndex < 9) ?
          <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium "
          onClick={()=>{
            onNext(); 
            next()}}
            >
            Next
          </button>
          : <button
          className="bg-green-500 hover:bg-green-600 text-white  px-6 py-3 rounded-xl font-medium "
          onClick={onFinish}
            >
            Submit
          </button>
          }
        
      </div>
    </div>
  );
}