import React from 'react'

export default function ProgressBar({ current }: { current: number }) {
    const questions=[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    console.log(current)
  return (
     <div className="">
      <div className="flex justify-between items-center mb-6 gap-2 flex-wrap">
        {questions.map((item, index) => (
          <button
            key={index}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${index < current ? 'bg-pink-500 text-white'  : 'bg-pink-100 text-black' 
               
              }
            `}
          > 
            {index + 1}
          </button>
        ))}
      </div>
      
    </div>
  )
}
