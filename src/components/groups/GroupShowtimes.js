import React, { useEffect, useState } from 'react'
import { fetchFinnkinoDataById } from '../../api/fetchFinnkino.js'
import { deletePinnedShowtime } from '../../utils/groupFunctions.js'

export default function GroupShowtimes({ group_id }) {
    const [showtimes, setShowtimes] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchShowtimes = async () => {
            if (!group_id) return

            try {
                const response = await fetchFinnkinoDataById(group_id)
                setShowtimes(response)
                setError(null)
            } catch (error) {
                setError('Failed to fetch showtimes')
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

    if (showtimes.length === 0) return <p>No pinned showtimes...</p>
    if (error) return <p>{error}</p>

    return (
        <>
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
                    {showtimes.map((showtime, index) => (
                        <tr key={index}>
                            <td>{showtime.showTime}</td>
                            <td>{showtime.theatreName}</td>
                            <td>{showtime.theatreAuditorium}</td>
                            <td>{showtime.movieName}</td>
                            <td>{showtime.showDate}</td>
                            <td>
                                <button
                                    type='button'
                                    onClick={() => handleDeleteShowtime(showtime.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}