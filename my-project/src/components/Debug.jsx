import React from 'react'
import { useState } from 'react'
const Debug = () => {
    const [qus, setqus] = useState("Sum of two numbers");
    const [code, setcode] = useState(`#include <stdio.h>
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
            <div className='font-bold text-5xl'>Debug The Code</div>
            <p className='font-bold text-2xl p-2 mt-4'>{qus}</p>
            <textarea
                className="w-[50vw] h-[60vh] bg-slate-800 p-10 m-4 rounded-lg text-white outline-none"
                value={code}
                onChange={(e) => setcode(e.target.value)}
            />
            <button className='bg-green-500 font-bold text-2xl w-1/3 p-4 rounded-lg hover:bg-green-600'>Submit</button>
        </div>
    )
}

export default Debug
