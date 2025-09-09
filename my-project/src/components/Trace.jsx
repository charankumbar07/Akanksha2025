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
        <div className='flex flex-col items-center justify-center bg-slate-950 text-white w-screen h-screen'>
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
            <button className='bg-green-500 font-bold text-2xl w-1/4 p-4 rounded-lg hover:bg-green-600'>Submit</button>
        </div>
    )
}

export default Trace
