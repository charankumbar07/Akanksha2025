import React from 'react'
import { useState } from 'react'

const ResultPage = () => {
  const [result, setresult] = useState({
    team:"meta",
    selected:true
  })
  return (
    <div className='bg-gradient-linear from-customPurple1 via-customPurple2 to-customPurple3 w-screen rounded-lg h-screen flex flex-col justify-center items-center gap-10'>
      <div className='p-10 rounded-lg text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[40vw] h-[30vh] flex flex-col justify-center items-center gap-5'>
        <h1 className='text-4xl font-bold'>Round-1</h1>
        <h2 className='text-2xl font-bold'>{result.selected ? "Congratulations Your Qualified" : "Disqualified" }</h2>
      </div>
      <div className='p-10 rounded-lg text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[40vw] h-[30vh] flex flex-col justify-center items-center gap-5'>
        <h1 className='text-4xl font-bold'>Round-2</h1>
        <h2 className='text-2xl font-bold'>{result.selected ? "Congratulations Your Qualified" : "Disqualified" }</h2>
      </div>
      <div className='p-10 rounded-lg text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[40vw] h-[30vh] flex flex-col justify-center items-center gap-5'>
        <h1 className='text-4xl font-bold'>Round-3</h1>
        <h2 className='text-2xl font-bold'>{result.selected ? "Congratulations Your Qualified" : "Disqualified" }</h2>
      </div>
    </div>
  )
}

export default ResultPage
