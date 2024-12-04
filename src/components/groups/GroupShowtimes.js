import React, { useEffect, useState } from 'react'
import { SectionHeader } from '../header/Header.js'
import { fetchFinnkinoDataById } from '../../api/fetchFinnkino.js'
import { deletePinnedShowtime } from '../../utils/groupFunctions.js'

export default function GroupShowtimes({ group_id }) {
    const [showtimes, setShowtimes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchShowtimes = async () => {
            if (!group_id) return

            try {
                const response = await fetchFinnkinoDataById(group_id)

                if (Array.isArray(response)) {
                    setShowtimes(response)
                } else {
                    console.error('Error fetching showtimes:', response)
                    setShowtimes([])
                }

                setError(null)
                setLoading(false)
            } catch (error) {
                setError('Failed to fetch showtimes')
                setLoading(false)
            }
        }
        fetchShowtimes()
    }, [group_id])

    const handleDeleteShowtime = async (showtime_id) => {
        try {
            const response = await deletePinnedShowtime(showtime_id)
            if (response.status === 200) {
                alert('Showtime deleted')
                setShowtimes(showtimes.filter(showtime => showtime.id !== showtime_id))
            }
        } catch (error) {
            console.error('Error deleting showtime:', error)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (showtimes.length === 0) return <p>No pinned showtimes...</p>

    return (
        <div className="group-showtimes">
            <SectionHeader text="Pinned Showtimes" />
            <table>
                <thead>
                    <tr>
                        <th>Showtime</th>
                        <th>Theatre</th>
                        <th>Auditorium</th>
                        <th>Movie</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(showtimes) && showtimes.map((showtime, index) => (
                        <tr key={index}>
                            <td>{showtime.showTime}</td>
                            <td>{showtime.theatreName}</td>
                            <td>{showtime.theatreAuditorium}</td>
                            <td>{showtime.movieName}</td>
                            <td>{showtime.showDate}</td>
                            <td>
                                <button
                                    type='button'
                                    onClick={() => handleDeleteShowtime(showtime.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}