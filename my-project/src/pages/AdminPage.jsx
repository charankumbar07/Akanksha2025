import React from 'react'
import { useState } from 'react'

const AdminPage = () => {
    const [teams, setteams] = useState([
        {
            id: 1,
            team: "meta",
            round_1_selected: true,
            round_2_selected: false,
        },
        {
            id: 2,
            team: "meta",
            round_1_selected: true,
            round_2_selected: false,
        }, {
            id: 3,
            team: "meta",
            round_1_selected: true,
            round_2_selected: false,
        }
    ])
    return (
        <div className='bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex'>
            <div className='w-[15vw] h-screen text-white bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 flex items-center justify-center'>
                <ul className=' flex flex-col gap-10'>
                    <li className='bg-white/20 backdrop-blur-sm border border-white/30  shadow-black/20 p-4 rounded-full text-black font-bold text-center'>
                        Team Info
                    </li>
                    <li className='bg-white/20 backdrop-blur-sm border border-white/30  shadow-black/20 p-4 rounded-full text-black font-bold text-center'>
                        Round 2
                    </li>
                    <li className='bg-white/20 backdrop-blur-sm border border-white/30  shadow-black/20 p-4 rounded-full text-black font-bold text-center'>
                        Round 3
                    </li>
                </ul>
            </div>
            <div className='font-sans antialiased w-screen h-screen flex flex-col justify-center items-center'>
                {/* <h1 className='text-4xl font-bold text-white/80'>Admin Panel</h1>
            <div className='bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[30vw] h-[60vh] gap-5 rounded-lg'>
                {teams.map((team) => (
                    <div key={team.id}>
                        <span>{team.team}</span>
                        <input type="radio" />
                    </div>
                ))}
            </div> */}
                <table className="table-auto text-white bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[50vw] rounded-lg">
                    <thead>
                        <tr>
                            <th className='p-4'>Team Name</th>
                            <th className='p-4'>Round 2</th>
                            <th className='p-4'>Round 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id} className='h-20'>
                                <td className='text-center border border-white/30 text-xl'><span>{team.team}</span></td>
                                <td className='text-center border border-white/30'>
                                    <form className="max-w-sm mx-auto flex flex-col items-center justify-center">
                                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Active</option>
                                            <option value="US">Qualified</option>
                                            <option value="CA">Disqualified</option>
                                        </select>
                                    </form>
                                </td>
                                <td className='text-center border border-white/30'>
                                    <form className="max-w-sm mx-auto flex flex-col items-center justify-center">
                                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Active</option>
                                            <option value="US">Qualified</option>
                                            <option value="CA">Disqualified</option>
                                        </select>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminPage