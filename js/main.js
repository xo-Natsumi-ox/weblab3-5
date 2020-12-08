const filmList = document.getElementById('film_list');
const inputSearch = document.getElementById('search_input');
const clearSearch = document.getElementById('clear_search');


let films = [];

filmJson = filmJson.replaceAll('&quot;', '"');
if (filmJson != '') {
    films = JSON.parse(filmJson);
}

let allFilms = films;

function getMovie(id, title, rateIMDb, durationinMin) {
    return `
    <li id="${id}" class="movie">
    <img src="/css/img/movie.png" class="movie_icon">
        <h3 class="movie_title">${title}</h3>
        <p class="movie_p">Rate: ${rateIMDb} IMDb</p>
        <p class="movie_p">Duration: ${durationinMin} min</p>
        <div class= "control_buttons">
            <button class="movie_button edit_button modal_link" href="#modal_edit" id="edit_button">Edit</button>
            <button class="movie_button delete_button" id="delete_button">Delete</button>
        </div>
    </li>
    `
}

const showFilms = (films) => {
    const showMovies = films.map((film) => {
        return getMovie(film._id, film.title, film.rateIMDb, film.durationinMin)
    }).join('');

    filmList.innerHTML = showMovies;
}

//sort
function sortedFilm() {
    let sortType = document.getElementById('sort_by').value;
    if (sortType == 'none') {
        showFilms(allFilms);
        return;
    } else if (sortType == 'name') {
        allFilms.sort(compareByName);
    } else if (sortType == 'rateIMDb') {
        allFilms.sort(compareByRate);
    } else if (sortType == 'duration') {
        allFilms.sort(compareByDuration);
    }
    showFilms(allFilms);
}

function compareByName(first, second) {
    let firstTitle = first.title.toLowerCase();
    let secondTitle = second.title.toLowerCase();
    if (firstTitle < secondTitle) {
        return -1;
    }
    if (firstTitle > secondTitle) {
        return 1;
    }
    return 0;
}

function compareByRate(first, second) {
    return first.rateIMDb - second.rateIMDb;
}

function compareByDuration(first, second) {
    return first.durationinMin - second.durationinMin;
}

inputSearch.addEventListener('keyup', (findString) => {
    const findTitle = findString.target.value.toLowerCase();
    const findFilmByTitle = films.filter(film => {
        return film.title.toLowerCase().includes(findTitle);
    });
    allFilms = findFilmByTitle;
    sortedFilm();
})

clearSearch.addEventListener('click', () => {
    inputSearch.value = '';
    allFilms = films;
    sortedFilm();
})

//count total duration
function countTotalDuration() {
    let sum = 0;
    let totalDuration = document.getElementById('total_duration');
    allFilms.forEach(film => sum += film.durationinMin);
    totalDuration.textContent = 'Total duration: ' + sum + ' min';
}

showFilms(allFilms)


//  modal add and edit //
const modalLinks = document.querySelectorAll('.modal_link');
const body = document.querySelectorAll('body')[0];
const lockPadding = document.querySelectorAll('.lock_padding');

let unlock = true;

const timeout = 500;

for (let index = 0; index < modalLinks.length; index++) {
    const modalLink = modalLinks[index];
    modalLink.addEventListener('click', function(element) {
        const modalName = modalLink.getAttribute('href').replace('#', '');
        //console.log(modalName)
        const curentModal = document.getElementById(modalName);
        //console.log(curentModal)
        modalOpen(curentModal);
        element.preventDefault();
    });
}

const modalCloseWindows = document.querySelectorAll('.close_modal');
for (let index = 0; index < modalCloseWindows.length; index++) {
    const modalCloseWindow = modalCloseWindows[index];
    modalCloseWindow.addEventListener('click', function(element) {
        modalClose(modalCloseWindow.closest('.modal'));
        element.preventDefault();
    });
}

function modalOpen(curentModal) {
    if (curentModal && unlock) {
        const modalActive = document.querySelector('.modal.open_modal');
        if (modalActive) {
            modalClose(modalActive, false);
        } else {
            bodyLock();
        }
        curentModal.classList.add('open_modal');

        curentModal.addEventListener('click', function(element) {
            if (!element.target.closest('.modal_content')) {
                modalClose(element.target.closest('.modal'))
            }
        });
    }
}

function modalClose(modalActive, doUnlock = true) {
    if (unlock) {
        modalActive.classList.remove('open_modal');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.header').offsetWidth + 'px';

    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock__body');

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function() {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock__body');
    }, timeout)

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

//close modal with esc
document.addEventListener('keydown', function(element) {
    if (element.which === 27) {
        const modalActive = document.querySelector('.modal.open_modal');
        modalClose(modalActive);
    }
});

let addExceptions = [];
const addSubmit = document.getElementById('submit_add');
const addName = document.getElementById('add_name');
const addRate = document.getElementById('add_rate');
const addDuration = document.getElementById('add_duration');

let name;
let rateIMDb;
let duration;


addSubmit.addEventListener('click', function(event) {
    name = addName.value;
    rateIMDb = addRate.value;
    duration = addDuration.value;

    if (name === '') {
        addExceptions.push('Please, enter the name.');
    }
    if (rateIMDb === '') {
        addExceptions.push('Please, enter rate.');
    }
    if (duration === '') {
        addExceptions.push('Please, enter the duration.');
    }
    if (addExceptions.length > 0) {
        alert(addExceptions[0]);
        addExceptions = [];
    } else {
        addFilm();
        //close modal 
        const modalActive = document.querySelector('.modal.open_modal');
        modalClose(modalActive);
        //clean input
        addName.value = '';
        addRate.value = '';
        addDuration.value = '';
    }
});

async function addFilm() {

    let film = {
        "title": name,
        "rateIMDb": rateIMDb,
        "durationinMin": duration
    };
    movieJson = JSON.stringify(film);

    let response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: movieJson
    });
    if (response.status == 200) {
        console.log(response.status);
    } else {
        console.log(response.status);
        alert('Error');
    }

}

const deleteButtons = document.querySelectorAll('#delete_button');

for (let index = 0; index < deleteButtons.length; index++) {
    const deleteButton = deleteButtons[index];
    deleteButton.addEventListener('click', function(element) {
        id = deleteButton.closest('.movie').id;
        deleteFilm(id);
    });
}

async function deleteFilm(id) {

    film = {
        "id": id
    }
    movieJson = JSON.stringify(film);

    let response = await fetch('/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: movieJson
    });

    if (response.status == 200) {
        console.log(response.status);
        hideElement(id);
    } else {
        console.log(response.status);
        alert('Error')
    }
}

function hideElement(id) {
    let element = document.getElementById(id);
    element.classList.add('hiden');
}

const editButtons = document.querySelectorAll('#edit_button');
let editId;
for (let index = 0; index < editButtons.length; index++) {
    const editButton = editButtons[index];
    editButton.addEventListener('click', function(element) {
        editId = editButton.closest('.movie').id;
    });
}

const editSubmitBtn = document.getElementById('submit_edit');
const editName = document.getElementById('edit_name');
const editRate = document.getElementById('edit_rate');
const editDuration = document.getElementById('edit_duration');

let newName;
let newRate;
let newDuration;

editSubmitBtn.addEventListener('click', function(event) {
    newName = editName.value;
    newRate = editRate.value;
    newDuration = editDuration.value;
    updateFilm()
    const modalActive = document.querySelector('.modal.open_modal');
    modalClose(modalActive);
    addName.value = '';
    addRate.value = '';
    addDuration.value = '';
});


async function updateFilm() {

    film = {
        "id": editId,
        "title": newName,
        "rateIMDb": newRate,
        "durationinMin": newDuration,
    }

    movieJson = JSON.stringify(film);

    let response = await fetch('/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: movieJson
    });
    if (response.status == 200) {
        console.log(response.status);
    } else {
        console.log(response.status);
        alert('Error')
    }
}