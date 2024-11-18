

const fetchFinnkinoData = async (areaId, date, movieName) => {

    try {
      const response = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${areaId}&dt=${date}`)

      if(!response.ok){
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
        const city = show.getElementsByTagName('Theatre')[0]?.getElementsByTagName('Area')[0]?.textContent

        let formattedDateTime = ''
        if(dateTime){
            const date = new Date(dateTime)
            const hours =date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            
            formattedDateTime = `${hours}:${minutes}`
        }
        return {
        showTime: formattedDateTime,
        city,
        theatreName,
        movieName,
        }
      })

        return showDetails

    } catch (error) {
      console.error('Failed to fetch dataa', error)
      throw new Error(`Failed to fetch data: ${error.message}`)
  }
}
  export default fetchFinnkinoData