import React, { useState, useEffect } from 'react'
import { MainHeader } from '../components/Header.js'
import { fetchFinnkinoData } from '../api/fetchFinnkino.js'
import finnkinoList from '../utils/finnkinoList.js'
import axios from 'axios'

import { UseUser } from '../context/UseUser.js'

const url = process.env.REACT_APP_API_URL
const areaList = finnkinoList

const ShowTimes = () => {
  const { user, token } = UseUser()
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
    const getGroups = async () => {
      if (!user.id) return
      try {
        const response = await axios.get(url + "/user/group/" + user.id)
        const groups = response.data.filter(group => group.pending === false) // check that user is accepted to group
        setGroups(groups);
      }
      catch (error) {
        console.log(error)
        throw error
      }
    }
    getGroups()
  }, [user.id])

  // search for showtimes. Area and date are required
  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formattedDate = dt.split('-').reverse().join('.') //YYYY-MM-DD -> DD.MM.YYYY, needed for getting right day from API
    try {
      const data = await fetchFinnkinoData(areaId, formattedDate)
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
  const handleShowtimeAdd = async (showid, areaid, showdate, showtime) => {
    if (!user.id) return
    if (!selectedGroup) {
      alert("please select group first")
      return
    }
    const showdateFormat = showdate.split(':').reverse().join('-')
    const showtimeFormat = showtime.toString()
    const showFullDate = [showdateFormat, showtimeFormat].join('T')
    const posturl = url + '/pinned/showtime/' + selectedGroup
    const response = await axios({
      method: 'post',
      url: posturl,
      headers: {},
      data: {
        movie_id: `${showid}`,
        area_id: `${areaid}`,
        date: `${showFullDate}`
      }
    })
    console.log(response)
    console.log(response.status)
    return response
  }


  if (loading) return <p>Loading...</p>

  return (
    <div>
      <MainHeader text="Finnkino Showtimes" />
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
            {token ? <th>Pin to Group</th> : <></>}
            {token ? <th>
              <select
                id='group'
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}>
                <option value=""> Select group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.user_group_id}>
                    {group.group_name}
                  </option>
                ))}
              </select>
            </th> : <></>}

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
                {token ? <button type="button" onClick={() => handleShowtimeAdd(show.showId, show.areaId, show.showDate, show.showTime)}>Pin</button> : <></>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ShowTimes