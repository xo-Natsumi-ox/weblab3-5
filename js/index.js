import {
    edit_button,
    clearInputValues,
    inputValues,
    showFilms,
    renderItemsList
} from "./utils.js";
import { postMovie, getAllMovies, updateMovie, deleteMovie } from "./crud.js";

const searchFilm = document.getElementById('input');
const clearInput = document.getElementById('clear');
const submitButton = document.getElementById('submit');
const remove = document.getElementById('remove');

let film = [{
        id: 1,
        name: "The Shawshank Redemption",
        rate: 9.2,
        duration: 142
    },
    {
        id: 2,
        name: "Up",
        rate: 8.2,
        duration: 96
    },
    {
        id: 3,
        name: "Requiem for a Dream",
        rate: 8.3,
        duration: 102
    },
    {
        id: 4,
        name: "Harry Potter and the philosopher's stone",
        rate: 7.6,
        duration: 152
    },
    {
        id: 5,
        name: "Shrek",
        rate: 7.8,
        duration: 90
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
});

/*
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const { name, rate, duration } = inputValues();
    clearInput();
    addItem({
        name: name,
        rate: rate,
        duration: duration
    });
});



const addItem = ({ name, rate, duration }) => {
    const generatedId = uuid.v1();
    const newItem = {
        id: generatedId,
        name,
        rate,
        duration,
    };
    film.push(newItem);
    addItemToPage(newItem);
};*/

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
//showFilms(films)


const onEditItem = async(e) => {
    const itemId = e.target.id.replace(edit_button, "");

    await updateMovie(itemId, inputValues())

    clearInputValues();

    refetchAllMovies();
};

//remove.addEventListener('click',(onRemoveItem))
const onRemoveItem = (id) => deleteMovie(id).then(refetchAllMovies);

export const refetchAllMovies = async() => {
    const allMovies = await getAllMovies();

    films = allMovies;

    renderItemsList(films, onEditItem, onRemoveItem);
};



submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const { name, rate, duration } = inputValues();

    clearInputValues();

    postMovie({
        name,
        rate,
        duration,
    }).then(refetchAllMovies);
});
/*
findButton.addEventListener("click", () => {
  const foundHamsters = hamsters.filter(
    (hamster) => hamster.title.search(findInput.value) !== -1
  );
  
  renderItemsList(foundHamsters, onEditItem, onRemoveItem);
});
  
cancelFindButton.addEventListener("click", () => {
  renderItemsList(hamsters, onEditItem, onRemoveItem);
  
  findInput.value = "";
});*/

// main code
refetchAllHamsters();