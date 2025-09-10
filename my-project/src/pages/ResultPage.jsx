import classNames from 'classnames/bind'
import React from 'react'
import { useState } from 'react'

const ResultPage = () => {
  const [result, setresult] = useState({
    team: "meta",
    round_1_selected: true,
    round_2_selected: false,
  })
  return (
    <div className='bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-sans antialiased w-screen h-screen flex flex-col justify-center items-center gap-[100px]'>
      <div className=' flex justify-center items-center gap-[100px]'>
        <div className={classNames('p-10 rounded-lg text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[25vw] h-[30vh] flex flex-col justify-center items-center gap-5', {
          "bg-green-600": result.round_1_selected === true
          , "bg-red-600": result.round_1_selected === false
        })}>
          <h1 className='text-4xl font-bold'>Round-1</h1>
          <h2 className='text-2xl font-bold'>{result.round_1_selected === true
            ? "Passed! You're qualified for Round 2"
            : result.round_1_selected === false
              ? "You're not qualified for next round"
              : "Result not available"}</h2>
        </div>
        <div className={classNames('p-10 rounded-lg text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[25vw] h-[30vh] flex flex-col justify-center items-center gap-5', {
          "bg-green-600": result.round_2_selected === true
          , "bg-red-600": result.round_2_selected === false
        })}>
          <h1 className='text-4xl font-bold'>Round-2</h1>
          <h2 className='text-2xl font-bold'>{result.round_2_selected === true
            ? "Passed! You're qualified for Round 3"
            : result.round_2_selected === false
              ? "You're not qualified for next round"
              : "Result not available"}</h2>
        </div>
        <div className='p-10 rounded-lg text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[25vw] h-[30vh] flex flex-col justify-center items-center gap-5'>
          <h1 className='text-4xl font-bold'>Round-3</h1>
          <h2 className='text-2xl font-bold'>Result will be Announced Soon</h2>
        </div>
      </div>
      <div className='p-10 rounded-lg text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[35vw] h-[40vh] flex flex-col justify-center items-center gap-5'>
        <div className='flex flex-col justify-center items-start gap-2 w-full'>
          <label htmlFor="team" className='text-white/60 text-xl'>Team Name :</label>
          <input
            id='team'
            name='team'
            type="text"
            placeholder='Enter Your Team Name'
            className='bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[95%] h-10 rounded-md text-white/80 text-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50'
          />
        </div>
        <div className='flex flex-col justify-center items-start gap-2 w-full'>
          <label htmlFor="passward" className='text-white/60 text-xl'>Passward :</label>
          <input
            id='passward'
            name='passward'
            type="text"
            placeholder='Enter Your Passward'
            className='bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[95%] h-10 rounded-md text-white/80 text-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50'
          />
        </div>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-[50%]'>Check Result</button>
      </div>
    </div>
  )
}

export default ResultPage
