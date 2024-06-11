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
        foundData.results.forEach( (entry) => {
            data.push(entry)
        })

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

const fetchAllData = async () => {
    await fetchPeople('https://swapi.dev/api/people/')
}

fetchAllData()

// $('#swapi-people').html(result.results)