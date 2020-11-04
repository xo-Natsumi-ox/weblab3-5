const filmList = document.getElementById('film_list');
const searchFilm = document.getElementById('input');
const clearInput = document.getElementById('clear');

let film = [{
        id: 1,
        name: "The Shawshank Redemption",
        rate: 9.2,
        duration: 142,
        img: "image/shawshank.jpg"
    },
    {
        id: 2,
        name: "Up",
        rate: 8.2,
        duration: 96,
        img: "image/up.jpg"
    },
    {
        id: 3,
        name: "Requiem for a Dream",
        rate: 8.3,
        duration: 102,
        img: "image/Requiem.jpg"
    },
    {
        id: 4,
        name: "Harry Potter and the philosopher's stone",
        rate: 7.6,
        duration: 152,
        img: "image/harry.jpg"
    },
    {
        id: 5,
        name: "Shrek",
        rate: 7.8,
        duration: 90,
        img: "image/shrek.jpg"
    }
]
let films = film

searchFilm.addEventListener('keyup', (searchedString) => {
    const findSomething = searchedString.target.value.toLowerCase();
    const findFilmByName = film.filter(movie => {
        return movie.name.toLowerCase().includes(findSomething);
    });
    films = findFilmByName;
    sortedFilm();
})

clearInput.addEventListener('click', () => {
    searchFilm.value = '';
    films = film;
    sortedFilm();
})

function countDuration() {
    let durationTotal = 0;
    let totalDuration = document.getElementById('total_duration');
    films.forEach(movie => durationTotal += movie.duration);
    totalDuration.textContent = 'Total duration: ' + durationTotal + ' minutes';
}

function sortedFilm() {
    let sortBy = document.getElementById('sorting').value;
    console.log(sortBy);
    if (sortBy == 'none') {
        showFilms(films);
        return;
    } else if (sortBy == 'rate') {
        films.sort(compareByRate);
    } else if (sortBy == 'short') {
        films.sort(compareByDurationAsc);
    } else if (sortBy == 'long') {
        films.sort(compareByDurationDesc);
    }
    showFilms(films);
}

function compareByRate(first, second) {
    return second.rate - first.rate;
}

function compareByDurationAsc(first, second) {
    return first.duration - second.duration;
}

function compareByDurationDesc(first, second) {
    return second.duration - first.duration;
}




const showFilms = (movies) => {
    const showMovies = movies.map((film) => {
        return `
        <li class="movie">
            <img src="${film.img}">
            <h1> ${film.name}</h1>
            <h3>Rating on IMDb: ${film.rate}</h3>
            <h3>Duration: ${film.duration} minutes</h3>
            <div class= "buttons_movie">
                <button class="edit_button" id="edit-button"><a href="edit_page.html">Edit</a></button>
                <button class="remove" id="remove">Remove</button>
            </div>
        
    </li>`
    }).join('');
    filmList.innerHTML = showMovies;
}
showFilms(films)