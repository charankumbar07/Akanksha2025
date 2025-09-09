import React from 'react'
import { useState } from 'react'
const Program = () => {
    const [output, setoutput] = useState(`Enter first number: 5
Enter second number: 7
Sum of 5 and 7 is 12
`)
    const [ans, setans] = useState("")
    return (
        <div className='flex flex-col items-center justify-center  text-white bg-gradient-linear from-customPurple1 via-customPurple2 to-customPurple3 rounded-lg w-screen h-screen'>
            <h1 className='text-5xl font-bold'>Write The Program</h1>
            <p className='font-bold text-4xl p-2 mt-4'>For given output</p>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-2xl'>Output</h2>
                    <pre className="w-[30vw] h-[60vh] bg-slate-800 p-10 m-4 rounded-lg text-white outline-none">{output}</pre>
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-2xl'>Program</h2>
                    <textarea
                        className='w-[30vw] h-[60vh] bg-slate-800 p-10 m-4 rounded-lg text-white outline-none'
                        placeholder='Write your Program here...'
                        value={ans}
                    />
                </div>
            </div>
            <button className='bg-[rgb(55,83,187)] font-bold text-2xl w-1/4 p-4 rounded-full hover:bg-[rgb(55,92,229)]'>Submit</button>
        </div>
    )
}

export default Program
