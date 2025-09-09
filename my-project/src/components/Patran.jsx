import React from 'react'
import classNames from 'classnames';
import { useState } from 'react';
const patran = () => {

    const [selected, setSelected] = useState(null);
    console.log(selected);

    const options = [
        { id: 'A', text: '40 km/h' },
        { id: 'B', text: '50 km/h' },
        { id: 'C', text: '60 km/h' },
        { id: 'D', text: '70 km/h' },
    ];

    return (
        <div className="w-[50vw] h-[55vh] bg-slate-800 p-4 m-4 rounded-lg text-white relative">
            <p className="text-3xl font-bold">
                A train travels 240 km at a uniform speed. If the speed had been 10 km/h more, it would have taken 2 hours less for the journey. What is the original speed of the train?
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10 text-white">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={classNames(
                            "font-bold text-2xl rounded-md py-2 m-2 cursor-pointer text-center",
                            {
                                "bg-green-500": selected === option.id,
                                "bg-slate-900": selected !== option.id
                            }
                        )}
                        onClick={() => setSelected(option.id)}
                    >
                        {option.id}) {option.text}
                    </div>
                ))}
            </div>
            <button className='w-1/2 bg-green-500 p-4 absolute bottom-5 left-[25%] rounded-md'>Submit</button>
        </div>
    )
}

export default patran
