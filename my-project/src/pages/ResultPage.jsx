import classNames from 'classnames/bind'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CodeVerification from '../components/CodeVerification'

const ResultPage = () => {
  const navigate = useNavigate()
  const [teamName, setTeamName] = useState('')
  const [rounds, setRounds] = useState({
    round1: { status: 'pending', result: null }, // pending, completed, passed, failed
    round2: { status: 'pending', result: null },
    round3: { status: 'pending', result: null }
  })
  const [showCodeVerification, setShowCodeVerification] = useState(false)

  useEffect(() => {
    // Get team name from localStorage (set during login)
    const storedTeam = localStorage.getItem('hustle_team')
    if (storedTeam) {
      const teamData = JSON.parse(storedTeam)
      setTeamName(teamData.teamName || 'Unknown Team')
    }
  }, [])

  const handleStartRound = (roundNumber) => {
    console.log(`Starting Round ${roundNumber}`)
    if (roundNumber === 3) {
      setShowCodeVerification(true)
    } else {
      // For other rounds, show placeholder
      alert(`Starting Round ${roundNumber} for ${teamName}`)
    }
  }

  const handleCodeVerified = () => {
    setShowCodeVerification(false)
    navigate('/round-3')
  }

  const handleCodeVerificationCancel = () => {
    setShowCodeVerification(false)
  }

  const getRoundStatus = (round) => {
    switch (round.status) {
      case 'completed':
        return round.result ? 'passed' : 'failed'
      case 'pending':
        return 'pending'
      default:
        return 'pending'
    }
  }

  const getRoundMessage = (round, roundNumber) => {
    const status = getRoundStatus(round)
    switch (status) {
      case 'passed':
        return `Passed! You're qualified for Round ${roundNumber + 1}`
      case 'failed':
        return "You're not qualified for next round"
      case 'pending':
        return "Result not available"
      default:
        return "Result not available"
    }
  }

  return (
    <div className='bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-sans antialiased min-h-screen flex flex-col justify-center items-center gap-8 py-12'>
      {/* Team Name Header */}
      <div className='text-center mb-8'>
        <h1 className='text-5xl font-bold text-white mb-4'>Welcome, {teamName}!</h1>
        <p className='text-xl text-gray-300'>Check your competition results and start new rounds</p>
      </div>

      {/* Round Blocks */}
      <div className='flex flex-col lg:flex-row justify-center items-center gap-8 w-full max-w-7xl px-4'>
        {/* Round 1 */}
        <div className={classNames('p-8 rounded-2xl text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-full lg:w-80 h-80 flex flex-col justify-center items-center gap-6 transition-all duration-300 hover:scale-105', {
          "bg-green-600/80": getRoundStatus(rounds.round1) === 'passed',
          "bg-red-600/80": getRoundStatus(rounds.round1) === 'failed',
          "bg-blue-600/80": getRoundStatus(rounds.round1) === 'pending'
        })}>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-4xl font-bold text-white'>Round 1</h1>
            <h2 className='text-lg font-semibold text-white text-center leading-relaxed'>
              {getRoundMessage(rounds.round1, 1)}
            </h2>
          </div>
          <button
            onClick={() => handleStartRound(1)}
            className='bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30'
          >
            Start Round 1
          </button>
        </div>

        {/* Round 2 */}
        <div className={classNames('p-8 rounded-2xl text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-full lg:w-80 h-80 flex flex-col justify-center items-center gap-6 transition-all duration-300 hover:scale-105', {
          "bg-green-600/80": getRoundStatus(rounds.round2) === 'passed',
          "bg-red-600/80": getRoundStatus(rounds.round2) === 'failed',
          "bg-blue-600/80": getRoundStatus(rounds.round2) === 'pending'
        })}>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-4xl font-bold text-white'>Round 2</h1>
            <h2 className='text-lg font-semibold text-white text-center leading-relaxed'>
              {getRoundMessage(rounds.round2, 2)}
            </h2>
          </div>
          <button
            onClick={() => handleStartRound(2)}
            className='bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30'
          >
            Start Round 2
          </button>
        </div>

        {/* Round 3 */}
        <div className={classNames('p-8 rounded-2xl text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg shadow-black/20 w-full lg:w-80 h-80 flex flex-col justify-center items-center gap-6 transition-all duration-300 hover:scale-105', {
          "bg-green-600/80": getRoundStatus(rounds.round3) === 'passed',
          "bg-red-600/80": getRoundStatus(rounds.round3) === 'failed',
          "bg-blue-600/80": getRoundStatus(rounds.round3) === 'pending'
        })}>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-4xl font-bold text-white'>Round 3</h1>
            <h2 className='text-lg font-semibold text-white text-center leading-relaxed'>
              {getRoundMessage(rounds.round3, 3)}
            </h2>
          </div>
          <button
            onClick={() => handleStartRound(3)}
            className='bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30'
          >
            Start Round 3
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className='text-center mt-8'>
        <p className='text-gray-300 text-lg'>
          Complete each round to unlock the next one. Good luck!
        </p>
      </div>

      {/* Code Verification Modal */}
      {showCodeVerification && (
        <CodeVerification
          onCodeVerified={handleCodeVerified}
          onCancel={handleCodeVerificationCancel}
        />
      )}
    </div>
  )
}

export default ResultPage