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
        <div className='bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-sans antialiased w-screen h-screen flex flex-col justify-center items-center'>
            {/* <h1 className='text-4xl font-bold text-white/80'>Admin Panel</h1>
            <div className='bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[30vw] h-[60vh] gap-5 rounded-lg'>
                {teams.map((team) => (
                    <div key={team.id}>
                        <span>{team.team}</span>
                        <input type="radio" />
                    </div>
                ))}
            </div> */}
            <table className="table-auto bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-[50vw] rounded-lg">
                <thead>
                    <tr>
                        <th className='p-4'>Team Name</th>
                        <th className='p-4'>Round 2</th>
                        <th className='p-4'>Round 3</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team.id} className='h-14'>
                            <td className='text-center border border-white/30'><span>{team.team}</span></td>
                            <td className='text-center border border-white/30'>
                            <button></button>
                            <button>disqualified</button>
                            </td>
                            <td className='text-center border border-white/30'>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPage
