const moviesEl = document.querySelector('.films_list');
const btnSign = document.querySelector('.link_sign');
const body = document.querySelector('body');

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

getMovies(1).then(showMovies);


//пагинация
const pagination = document.querySelector('.pagination')

const clickHandler = (page, e) => {
    getMovies(page).then(showMovies);
    const allLinks = Array.from(pagination.querySelectorAll('a'));
    allLinks.forEach(element => element.classList.remove('active'));
    e.target.classList.add('active');
}
 
let content = [];

let startElement = () => {
  let a = document.createElement("a");
  a.innerHTML = 'start';
  return a
}

pagination.addEventListener('click', function(event) {  
  const lastItem = content[content.length - 1];
 
   if (event.target == content[0]) {
    const allLinks = Array.from(pagination.querySelectorAll('a'));
    allLinks.forEach(element => element.classList.remove('active'));
    content[2].classList.add('active');
    getMovies(1).then(showMovies);
  } else if (event.target == lastItem) {
    const allLinks = Array.from(pagination.querySelectorAll('a'));
    allLinks.forEach(element => element.classList.remove('active'));
    content[11].classList.add('active');
    getMovies(10).then(showMovies);
  } else if (event.target == content[1]) {
    for (let i=0; i<=13; i++ ) {
     if (content[i].classList.contains('active')) {
      content[i].previousElementSibling.click()
     }
    }  
  } else if (event.target == content[12]) {
    for (let i=13; i>=0; i-- ) {
     if (content[i].classList.contains('active')) {
      content[i].nextElementSibling.click()
     }
    }  
  }
})


let prevElement = () => {
    let a = document.createElement("a");
    a.innerHTML = 'prev';
    return a
}

let nextElement = () => {
  let a = document.createElement("a");
  a.innerHTML = 'next';
  return a
}

let endElement = () => {
    let a = document.createElement("a");
    a.innerHTML = 'end';
    return a
}

for (let i=1; i<=10; i++ ) {
    let a = document.createElement("a");
    a.addEventListener('click', (e) => clickHandler(i, e))
    a.innerHTML = i;
    if (i === 1) {
        a.classList.add('active');
    }
    content.push(a)
}

content = [startElement(),prevElement(), ...content, nextElement(), endElement()];
content.forEach(x => pagination.appendChild(x));



// создание блока с фильмом
function showMovies(data) {
    moviesEl.innerHTML = '';
    data.forEach(movie => {
        const movieEl = document.createElement('li');
        movieEl.classList.add('films_elem');
        movieEl.innerHTML = `
                <a href="#" data link>
                <img class="img_elem" id=${movie.id} src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt= "${movie.title}">
                </a>
                <img class="delete_icon" onclick="deleteFilm()" src="./images/delete.png"> 
                <h1 class="movie_title">${movie.title}</h1>
                <p class="vote">${movie.vote_average}</p>
                <p class="date">${movie.release_date}</p>
        `;
        
        moviesEl.appendChild(movieEl);  
      })
      
}


document.querySelector('.films_list').addEventListener('click', function(event) {
  
  let filmId = event.target.id;
  let className = event.target.classList[0];

 if (className === 'img_elem') {
  sessionStorage.setItem('tempValue', filmId)
  document.location.href = 'movie_section.html';
  } 
  
});


//сортировка
const selectElement = document.querySelector('.selected');

selectElement.addEventListener('change', (e) => {

  let trgt = e.target.value;
  let firstPage = document.querySelector('.pagination a:nth-child(3)');

  if (trgt === 'no_sorted') {
    getUrl = (page) => {
      return `https://api.themoviedb.org/3/discover/movie?api_key=198100242855246c2d813957d899b0ee&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    }
    url = getUrl(1);
    getMovies(url).then(showMovies);
    firstPage.click();
  

  } else if (trgt === 'rating_down') {
    getUrl = (page) => {
      return `https://api.themoviedb.org/3/discover/movie?api_key=198100242855246c2d813957d899b0ee&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    }
    url = getUrl(1);
    getMovies(url).then(showMovies);
    firstPage.click();


  } else if (trgt === 'rating_up') {
    getUrl = (page) => {
      return `https://api.themoviedb.org/3/discover/movie?api_key=198100242855246c2d813957d899b0ee&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    }
    url = getUrl(1);
    getMovies(url).then(showMovies);
    firstPage.click();


  } else if (trgt === 'release_up') {
    getUrl = (page) => {
      return `https://api.themoviedb.org/3/discover/movie?api_key=198100242855246c2d813957d899b0ee&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    }
    url = getUrl(1);
    getMovies(url).then(showMovies);
    firstPage.click();


  } else if (trgt == "release_down") {
    getUrl = (page) => {
        return `https://api.themoviedb.org/3/discover/movie?api_key=198100242855246c2d813957d899b0ee&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    }
    url = getUrl(1);
    getMovies(url).then(showMovies);
    firstPage.click();
  }
})




// проверка пользователя на авторизацию



const parentUserName = document.querySelector('.authorization');
let currentUser = JSON.parse(localStorage.getItem('loginInfo'));

if (!currentUser) {
let guest = {
  loggined: false,
  email: ''
}

localStorage.setItem('loginInfo', JSON.stringify(guest));

currentUser = guest;
}
 if (currentUser.loggined == true) {
  let users = JSON.parse(localStorage.getItem('user'));
  let logginedUser = users.user.find( user => user.email === currentUser.email);
  let userName = logginedUser.name;
  const spanElem = document.createElement('span');
  spanElem.classList.add('user_name');
  spanElem.innerHTML = userName;
  parentUserName.appendChild(spanElem);
  btnSign.innerHTML = 'Log Out';
}

if (btnSign.innerHTML == 'Sign in/Sign up') {
  btnSign.addEventListener('click', (event) => {
    document.location.href = 'signIn.html';
    btnSign.innerHTML == 'Log out';
})
}

if (btnSign.innerHTML == 'Log Out') {
  btnSign.addEventListener('click', (event) => {
    document.location.href = 'index.html';
    currentUser = {
    loggined: false,
    email: ''
    }
    localStorage.setItem('loginInfo', JSON.stringify(currentUser));
    btnSign.innerHTML == 'Sign in/Sign up';
})
}



//админ

let admin = JSON.parse(localStorage.getItem('user'));
if (currentUser.email = 'anonim22@icloud.com') {
  document.querySelector(".add_film_icon").style.display = "inline";
  document.querySelector(".add_film_icon").addEventListener('click', (event) => {
    document.location.href = 'page_add_film.html';
  })
  if (btnSign.innerHTML == 'Log Out') {
    btnSign.addEventListener('click', (event) => {
      document.location.href = 'index.html';
      currentUser = {
      loggined: false,
      email: ''
      }
      localStorage.setItem('loginInfo', JSON.stringify(currentUser));
      btnSign.innerHTML == 'Sign in/Sign up';
  })
  }
}


//добавить фильм (не отображается)
let object = JSON.parse(localStorage.getItem('film'));
let title = object.title;
let list2 = object.list2;
let overview = object.overview;
let popularity = object.popularity;
let poster_path = object.poster_path;
let release_date = object.release_date;
let vote_average = object.vote_average;
let vote_count = object.vote_count;

  const li = document.createElement('li');
  li.classList.add('films_elem');
  li.innerHTML = `
            <a href="#" data link>
            <img class="img_elem" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            </a>
            <img class="delete_icon" id="aa" src="./images/delete.png"> 
            <h1 class="movie_title">${title}</h1>
            <p class="vote">${vote_average}</p>
            <p class="date">${release_date}</p>
`;
  moviesEl.appendChild(li); 
        
  //document.querySelector(".delete_icon").style.display = "inline";
  //console.log(document.querySelector(".delete_icon"));