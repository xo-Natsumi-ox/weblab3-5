//export const edit_button='edit-button-';
const nameInput = document.getElementById('name_input');
const rateInput = document.getElementById('rate_input');
const durationInput = document.getElementById('duration_input');
const filmList = document.getElementById('film_list');
const showFilms = ({ id, name, rate, duration }) => `
            <li id="${id}" class="movie">
                <img src="image/cinema.png">
                <h1> ${name}</h1>
                <h3>Rating on IMDb: ${rate}</h3>
                <h3>Duration: ${duration} minutes</h3>
                <div class= "buttons_movie">
                    <button class="edit_button" id="edit_button"><a href="edit_page.html">Edit</a></button>
                    <button class="remove" id="remove">Remove</button>
                </div>
            </li>`;
export const clearInputValues = () => {
    nameInput.value = "";
    rateInput.value = null;
    durationInput.value = null;
};

export const showMovie = ({ id, name, rate, duration }, onEditItem, onRemoveItem) => {
    filmList.insertAdjacentHTML(
        "afterbegin",
        showFilms({ id, name, rate, duration })
    );

    const element = document.getElementById(id);
    const editButton = document.getElementById(edit_button);

    //element.onmousedown = onDragNDrop(element, onRemoveItem);
    //editButton.addEventListener("click", onEditItem);

    // VERY IMPORTANT
    // Allows not to trigger DragNDrop when user clicks Edit Button
    //editButton.onmousedown = e => e.stopPropagation();
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
    filmList.innerHTML = "";

    for (const item of items) {
        showMovie(item, onEditItem, onRemoveItem);
    }
};

export const inputValues = () => {
    return {
        name: nameInput.value,
        rate: rateInput.value,
        duration: durationInput.value,
    };
};