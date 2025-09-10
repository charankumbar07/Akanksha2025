import React from 'react'
import { useState } from 'react'
const Trace = () => {
    const [output, setoutput] = useState()
    const [qus, setqus] = useState("Sum of two numbers");
    const [Code, setCode] = useState(`#include <stdio.h>
int main() {
    int num1, num2, sum;

    printf("Enter first number: ");
    scanf("%d", &num1);

    printf("Enter second number: ");
    scanf("%d", &num2);

    sum = num1 + num2;

    printf("Sum = %d\\n", sum);

    return 0;
}`);
    return (
        <div className='flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-sans antialiased w-screen min-h-screen'>
            <h1 className='text-5xl font-bold'>Trace The Program</h1>
            <p className='font-bold text-4xl p-2 mt-4'>{qus}</p>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-2xl'>Program</h2>
                    <pre className="w-[30vw] h-[60vh] bg-slate-800 p-10 m-4 rounded-lg text-white outline-none">{Code}</pre>
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-2xl'>Output</h2>
                <textarea
                    className='w-[30vw] h-[60vh] bg-slate-800 p-10 m-4 rounded-lg text-white outline-none'
                    placeholder='Write your output here...'
                    value={output}
                />
                </div>
            </div>
            <button className='bg-[rgb(55,83,187)] font-bold text-2xl w-1/4 p-4 rounded-full hover:bg-[rgb(55,92,229)]'>Submit</button>
        </div>
    )
}

export default Trace
