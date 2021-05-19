let value = +sessionStorage.getItem('tempValue');
const filmsList = document.querySelector('.films_list')

// ссылка на данные
let getUrl = (page) => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=198100242855246c2d813957d899b0ee&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
}

// получение данных по API
async function getMovies(page) {
    let url = getUrl(page);
    const response = await fetch(url);
    let data = await response.json();
    return data.results
    
}
for (let count = 1; count <= 15; count++) {
    getMovies(count).then(showMovies);
}

// создание блока с фильмом
function showMovies(data) {
    let movie = data;
        const blockFilm = document.createElement('div');
        blockFilm.classList.add('block_film');
        for (let i = 0; i < movie.length; i++) {
            if (movie[i].id == value) {
                blockFilm.innerHTML = `
                <img class="img_film" src="https://image.tmdb.org/t/p/w500${movie[i].poster_path}" alt= "${movie[i].title}">
                <div style="margin-left: 50px">
                <h1 class="title_film">${movie[i].title}</h1>
                <p class="overview_film">${movie[i].overview}</p>
                <p class="vote_film">Vote average: ${movie[i].vote_average}</p>
                <p class="data_film">Release: ${movie[i].release_date}</p>
                <p class="vote_count">Vote: ${movie[i].vote_count}</p>
                <p class="popularity_film">Popularity: ${movie[i].popularity}</p> 
                </div>      
        `;
        filmsList.appendChild(blockFilm); 
        }          
    }
}

const parentUserName = document.querySelector('.authorization');
let currentUser = JSON.parse(localStorage.getItem('loginInfo'));
const btnSign = document.querySelector('.link_sign');

if (!currentUser) {
    let guest = {
      loggined: false,
      email: ''
    }
    localStorage.setItem('loginInfo', JSON.stringify(guest));
    currentUser = guest;
}
if (currentUser.loggined == true) {
        filmsList.innerHTML = `
        <input type="number" class="vote_user" placeholder="vote(rating)">
        `;
        let users = JSON.parse(localStorage.getItem('user'));
        let logginedUser = users.user.find( user => user.email === currentUser.email);
        let userName = logginedUser.name;
        const spanElem = document.createElement('span');
        spanElem.classList.add('user_name');
        spanElem.innerHTML = userName;
        parentUserName.appendChild(spanElem);
        btnSign.innerHTML = 'Log Out';
}  
if (currentUser.email == 'anonim22@icloud.com') {
    document.querySelector('.vote_user').style.display = "none";

}