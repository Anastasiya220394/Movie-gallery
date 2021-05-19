let object = {};
let film = [];
let title = document.querySelector('#title');
let overview = document.querySelector('#overview');
let poster_path = document.querySelector('#poster_path');
let popularity = document.querySelector('#popularity');
let release_date = document.querySelector('#release_date');
let list2 = document.querySelector('#list2');
let vote_average = document.querySelector('#vote_average');
let vote_count = document.querySelector('#vote_count');

document.querySelector(".signupbtn").addEventListener('click', (event) => {
    object = {
        title : title.value,
        overview : overview.value,
        poster_path : poster_path.value,
        popularity : popularity.value,
        release_date : release_date.value,
        list2 : list2.value,
        vote_average : vote_average.value,
        vote_count : vote_count.value
    }
    film.push(object);
    localStorage.setItem('film', JSON.stringify(object));
    document.location.href = 'page_add_film.html';
})