console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
// undefined but gets array in the addImages function //
let breeds;

const ul = document.querySelector('ul')

fetch(imgUrl)
    .then((res) => res.json())
    .then((dataDogImages) => addImages(dataDogImages.message))

function addImages(dogImages) {
    dogImages.forEach((dog) => {
        const img = document.createElement('img')
        img.src = dog
        document.querySelector('#dog-image-container').appendChild(img)
    })
}    

fetch(breedUrl)
    .then((res) => res.json())
    .then((breedsData) => {
        // Save breeds Globably in undefined breed variable at the top //
        breeds = Object.keys(breedsData.message)
        addDogBreeds(breeds)})

function addDogBreeds(breeds) {
    for (let breed of breeds) {
        const li = document.createElement('li')
        li.textContent = breed
        li.addEventListener('click', (e) => {
            e.target.style.color = 'blue'
        })
        ul.appendChild(li)
    }
}

// Drop Down Breed Filter //

const dropDownMenu = document.querySelector("select")

dropDownMenu.addEventListener("change", filterBreeds)

function filterBreeds(e) {
    let breedsFilter = breeds.filter((breed) => {
        return breed[0] === e.target.value
    })
    ul.innerHTML = ''
    addDogBreeds(breedsFilter)
}