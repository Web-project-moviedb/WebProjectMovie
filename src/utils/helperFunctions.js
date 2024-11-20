// this returns a string of stars and empty stars based on integer 1-5
const renderStars = (stars) => {
    const filledStars = '★'.repeat(stars)
    const emptyStars = '☆'.repeat(5 - stars)
    return filledStars + emptyStars
}


// this returns a formatted date string from database in "18.11.2024 15:05:59" format
const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    let formattedDate = date.toLocaleString('fi-FI')
    formattedDate = formattedDate.replace(' klo', ' ')
    return formattedDate
}


export { renderStars, formatTimestamp } 