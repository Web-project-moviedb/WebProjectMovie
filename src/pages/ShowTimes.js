import React, { useState, useEffect } from 'react';
import fetchFinnkinoData from '../api/fetchFinnkino.js';
import axios from 'axios'

import { UseUser } from '../context/UseUser.js'

const url = process.env.REACT_APP_API_URL

// List of areas and theatres
const areaList = [

  { name: 'Valitse alue/teatteri', id: '1029' },
  { name: 'Pääkaupunkiseutu', id: '1014' },
  { name: 'Espoo', id: '1012' },
  { name: 'Espoo: OMENA', id: '1039' },
  { name: 'Espoo: SELLO', id: '1038' },
  { name: 'Helsinki', id: '1002' },
  { name: 'Helsinki: ITIS', id: '1045' },
  { name: 'Helsinki: KINOPALATSI', id: '1031' },
  { name: 'Helsinki: MAXIM', id: '1032' },
  { name: 'Helsinki: TENNISPALATSI', id: '1033' },
  { name: 'Vantaa: FLAMINGO', id: '1013' },
  { name: 'Jyväskylä: FANTASIA', id: '1015' },
  { name: 'Kuopio: SCALA', id: '1016' },
  { name: 'Lahti: KUVAPALATSI', id: '1017' },
  { name: 'Lappeenranta: STRAND', id: '1041' },
  { name: 'Oulu: PLAZA', id: '1018' },
  { name: 'Pori: PROMENADI', id: '1019' },
  { name: 'Tampere', id: '1021' },
  { name: 'Tampere: CINE ATLAS', id: '1034' },
  { name: 'Tampere: PLEVNA', id: '1035' },
  { name: 'Turku ja Raisio', id: '1047' },
  { name: 'Turku: KINOPALATSI', id: '1022' },
  { name: 'Raisio: LUXE MYLLY', id: '1046' }


]

const ShowTimes = () => {
  const { user } = UseUser()
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dt, setDt] = useState(new Date().toISOString().slice(0, 10))  // päivämäärä
  const [movieName, setMovieName] = useState('')
  const [areaId, setAreaId] = useState('1029')
  const [filteredShows, setFilteredShows] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')

  useEffect(() => {
    console.log("id is " + user.id)
    const getGroups = async () => {
      try {
        const response = await axios.get(url + "/user/group/" + user.id)
        console.log("response data: " + response.data)
        setGroups(await response.data);
        console.log("groups value: " + groups)
        groups.forEach((value) => console.log(value))
      }
      catch (error) {
        console.log(error)
        throw error
      }
    }
    getGroups()
  }, [])
  // search for showtimes. Area and date are required
  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formattedDate = dt.split('-').reverse().join('.') //YYYY-MM-DD -> DD.MM.YYYY, needed for getting right day from API

    try {
      const data = await fetchFinnkinoData(areaId, formattedDate)
      console.log('Fetched data:', data);
      setShows(data)
      setFilteredShows(data)
    } catch (error) {
      setError(error.message)
      console.log('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMovieSearch = () => {
    const filtered = shows.filter(show =>
      show.movieName.toLowerCase().includes(movieName.toLowerCase()),
    )
    setFilteredShows(filtered)
    if (filtered.length === 0) {
      setError(`Movie named "${movieName}" did not found`)
      console.log(`Movie named "${movieName}" did not found`, error)
    } else {
      setError(null)
    }
  }
  const handleShowtimeAdd = async () => {
    // const response = await axios.post()
    console.log("in handle showtime" + selectedGroup)
  }


  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Movie Showtimes</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>Select City/Theatre:</label>
          <select
            id='city'
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}>
            {areaList.map((areaItem) => (
              <option key={areaItem.id} value={areaItem.id}>
                {areaItem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Date:</label>
          <input
            type="date"
            value={dt}
            onChange={(e) => setDt(e.target.value)}
          />
        </div>
        <div>
          <label>Movie Name:</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Filter by movie"
          />
          <button type="button" onClick={handleMovieSearch}>Filter movie</button>
        </div>
        <button type="submit">Search</button>
      </form>

      {/* Error message if not found movie by gived name */}
      {error && <p style={{ color: 'orange' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Show Time</th>
            <th>Theatre</th>
            <th>Auditorium</th>
            <th>Movie Name</th>
            <th>Add to group</th>
          </tr>
        </thead>
        <tbody>
          {filteredShows.map((show, index) => (
            <tr key={index}>
              <td>{show.showTime}</td>
              <td>{show.theatreName}</td>
              <td>{show.theatreAuditorium}</td>
              <td>{show.movieName}</td>
              <td>
                <select
                  id='group'
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.group_name}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={handleShowtimeAdd}>add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ShowTimes