import axios from 'axios'
const url = process.env.REACT_APP_API_URL


const fetchFinnkinoData = async (areaId, date) => {
  try {
    const response = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${areaId}&dt=${date}`)

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.text()
    const parser = new window.DOMParser()
    const xmlDoc = parser.parseFromString(data, "text/xml")
    const showsData = xmlDoc.getElementsByTagName('Show')
    const showDetails = Array.from(showsData).map(show => {
      const dateTime = show.getElementsByTagName('dttmShowStart')[0]?.textContent
      const theatreName = show.getElementsByTagName('Theatre')[0]?.textContent
      const movieName = show.getElementsByTagName('Title')[0]?.textContent
      const theatreAuditorium = show.getElementsByTagName('TheatreAuditorium')[0]?.textContent
      const showId = show.getElementsByTagName('ID')[0]?.textContent
      let formattedDateTime = ''
      let formattedDate = ''
      if (dateTime) {
        const date = new Date(dateTime)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const month = date.getMonth().toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        const monthPlusOne = (parseInt(month) + 1).toString()
        formattedDateTime = `${hours}:${minutes}`
        formattedDate = `${day}:${monthPlusOne}:${year}`
      }

      return {
        showTime: formattedDateTime,
        theatreName,
        theatreAuditorium,
        movieName,
        showId,
        areaId,
        showDate: formattedDate
      }
    })

    return showDetails

  } catch (error) {
    console.error('Failed to fetch dataa', error)
    throw new Error(`Failed to fetch data: ${error.message}`)
  }
}


const fetchFinnkinoDataById = async (group_id) => {
  let date_now = new Date();
  const response2 = await axios.get(url + "/pinned/showtime/" + group_id)
  const returnArray = []
  for (const [key, value] of Object.entries(response2.data)) {
    let date_object = new Date(value.showdate)
    if (date_now > date_object) {
      const delete_response = await axios({
        method: 'delete',
        url: url + '/pinned/showtime/' + value.id,
      })
      return delete_response
    }
    let formattedDate2 = value.showdate.split('T')[0].split('-').reverse()
    formattedDate2 = formattedDate2.join('.')
    const areaid = value.area_id
    try {
      const response = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${value.area_id}&dt=${formattedDate2}`)
      const data = await response.text()
      const parser = new window.DOMParser()
      const xmlDoc = parser.parseFromString(data, "text/xml")
      const showsData = xmlDoc.getElementsByTagName('Show')
      let showDetails = Array.from(showsData).map(show => {
        if (show.getElementsByTagName('ID')[0]?.textContent === value.movie_id.toString()) {
          const dateTime = show.getElementsByTagName('dttmShowStart')[0]?.textContent
          const theatreName = show.getElementsByTagName('Theatre')[0]?.textContent
          const movieName = show.getElementsByTagName('Title')[0]?.textContent
          const theatreAuditorium = show.getElementsByTagName('TheatreAuditorium')[0]?.textContent
          const showId = show.getElementsByTagName('ID')[0]?.textContent
          let formattedDateTime = ''
          let formattedDate = ''
          if (dateTime) {
            const date = new Date(dateTime)
            const hours = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            const month = date.getMonth().toString().padStart(2, '0')
            const day = date.getDate().toString().padStart(2, '0')
            const year = date.getFullYear().toString()
            const monthPlusOne = (parseInt(month) + 1).toString()
            formattedDateTime = `${hours}:${minutes}`
            formattedDate = `${day}:${monthPlusOne}:${year}`
          }

          return {
            showTime: formattedDateTime,
            theatreName,
            theatreAuditorium,
            movieName,
            showId,
            areaid,
            showDate: formattedDate
          }
        }

      })
      showDetails = showDetails.filter(Boolean)
      returnArray.push(showDetails)

    } catch (error) {
      console.error('Failed to fetch dataa', error)
      throw new Error(`Failed to fetch data: ${error.message}`)
    }
  }
  return returnArray
}


export { fetchFinnkinoData, fetchFinnkinoDataById }