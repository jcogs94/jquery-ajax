const fetchData = async (url) => {
    let data
    await $.ajax({url: url, success: async (result) => { 
        data = result
    }})
    return data
}
        
const fetchAPIData = async (url) => {
    let data = []
    let crawler = true
    let crawlURL = url

    while (crawler) {
        const foundData = await fetchData(crawlURL)
        if (foundData.results) {
            foundData.results.forEach( (entry) => {
                data.push(entry)
            })
        } else {
            data = foundData
        }

        if (foundData.next) {
            crawlURL = foundData.next
        } else {
            crawler = false
        }
    }
    
    return data
}

const fetchPeople = async () => {
    let peopleNames = []
    
    let peopleData = await fetchAPIData('https://swapi.dev/api/people/')
    peopleData.forEach( (person) => {
        peopleNames.push(`<li>${person.name}</li>`)
    })
    
    $('#loading-characters').hide()
    peopleNames.forEach( (name) => {
        $('#swapi-characters > ul').append(name)
    })
}

const fetchFilm = async () => {
    const filmData = await fetchAPIData('https://swapi.dev/api/films/1/')
    const filmYear = filmData.release_date.slice(0, 4)

    const listItems = [
        `<h2>Star Wars<br>Episode ${filmData.episode_id} - ${filmData.title} (${filmYear})</h2>`,
        `<p><b>Director:</b><br> ${filmData.director}</p>`,
        `<p><b>Producer(s):</b><br> ${filmData.producer}</p>`,
        `<p><b>Opening Crawl:</b><br> ${filmData.opening_crawl}</p>`,
    ]

    $('#loading-film').hide()
    listItems.forEach( (item) => {
        $('#film-info').append(item)
    })
}

const fetchAllData = async () => {
    await fetchPeople()
    await fetchFilm()
}

fetchAllData()
