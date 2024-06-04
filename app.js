let pokemonGrid = document.querySelector('#container')
let searchInput = document.querySelector('#searchBar')
// fetchData()

// async function fetchData() {
//   try {
//     const response = await fetch(
//       'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
//     )

//     if (!response.ok) {
//       throw new Error('Could not fetch')
//     }
//     const data = await response.json()
//     printData(data)
//     // filterData(data)
//   } catch (error) {
//     console.error(error)
//   }
// }

fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').then((response) =>
  response.json().then((data) => {
    pokemonsList = data.results
    printData(pokemonsList)
  })
)

async function fetchImage(pokemon) {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon/' + pokemon.name
    )
    const data = await response.json()
    return data.sprites.front_default
  } catch (error) {
    console.error(error)
  }
}

// function filterData(data) {
//   let searchQuery = document.querySelector('#searchBar').value
//   console.log(
//     data.results.filter((pokemon) =>
//       pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   )
//   return data.results.filter((pokemon) =>
//     pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )
// }

function printData(data) {
  pokemonGrid.innerHTML = ''

  data.map(async (pokemon) => {
    let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    let card = document.createElement('div')
    let img = await fetchImage(pokemon)
    card.className =
      'max-h-24 flex flex-col items-center justify-between p-5 badge badge-primary'
    card.innerHTML = `
        <img src='${img}' alt='${pokemon.name} image'>
        <p>${name}</p>
    `

    pokemonGrid.append(card)
  })

  // data.map(async (pokemon) => {
  //   let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  //   let card = document.createElement('div')
  //   let img = document.createElement('img')
  //   card.className += 'h-24 w-full flex flex-col items-center bg-red-900'
  //   card.append(img)
  //   img.src = await fetchImage(pokemon)
  //   if (pokemon.name == 'nidoran-f') {
  //     card.append('Nidoran F')
  //   } else if (pokemon.name == 'nidoran-m') {
  //     card.append('Nidoran M')
  //   } else {
  //     card.append(name)
  //   }
  //   pokemonGrid.append(card)
  // })
}

let isDark = true
function changeLogo() {
  let logoImg = document.querySelector('#githubLogo')
  isDark = !isDark
  if (isDark) {
    logoImg.src = './imgs/github-mark-white.svg'
  } else {
    logoImg.src = './imgs/github-mark.svg'
  }
}

searchInput.addEventListener('keyup', filterData)

function filterData() {
  let searchQuery = searchInput.value.toLowerCase()
  let filteredList = []

  filteredList = pokemonsList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (searchQuery) {
    printData(filteredList)
  } else {
    printData(pokemonsList)
  }
}
