import React from "react";
interface congrats{
  correctAnswers: number;
  totalQuestions: number;
  handlePlayAgain: ()=>void;
}
function Congratulations({ correctAnswers, totalQuestions, handlePlayAgain }: congrats) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  

  return (
    <div className=" fixed bg-slate-500 rounded-lg flex items-center justify-center p-4">
      <div className="rounded-2xl max-w-[50dvw]  max-h-[50dvh] p-12 text-center w-full">
          <h1 className="text-white text-3xl font-bold mb-4">
            Congratulations!
          </h1>
          
          <p className="text-gray-300 text-lg mb-2">
            You completed the quiz!
          </p>
          
          

        <div className="mb-8" >
          <div className=" rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-white mb-2">
              {correctAnswers}/{totalQuestions}
            </div>
            <div className="text-gray-300">
              {percentage}% Correct
            </div>
          </div>
          
        
        </div>

        <button
          onClick={handlePlayAgain}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl font-medium w-full"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Congratulations;