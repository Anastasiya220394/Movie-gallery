let psw = document.querySelector('#psw');
let email = document.querySelector('#email');
let btnSign = document.querySelector('.signinbtn')

btnSign.addEventListener('click', (event) => {
let users = JSON.parse(localStorage.getItem('user'));
users.user.forEach(user => {
  if(email.value == user.email && psw.value == user.psw) {
    localStorage.setItem('loginInfo', JSON.stringify({ loggined: true, email: email.value }));
  } else if (email.value == user.email && psw.value !== user.psw) {
      alert('You entered an invalid password. Please try again.');  
  }
});
})

let admin = JSON.parse(localStorage.getItem('user'));
if (!admin) {
  fetch('./dummy_data/users.json').then(elem => elem.text().then(elem2 => localStorage.setItem('user', elem2)));
}