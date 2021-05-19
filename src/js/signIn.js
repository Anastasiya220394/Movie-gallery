let psw = document.querySelector('#psw');
let email = document.querySelector('#email');
let btnSign = document.querySelector('.signinbtn')

btnSign.addEventListener('click', (event) => {
let users = JSON.parse(localStorage.getItem('user'));
users.forEach(user => {
  if(email.value == user.email && psw.value == user.psw) {

    localStorage.setItem('loginInfo', JSON.stringify({ loggined: true, email: email.value }));

  }else {
      alert('ERROR.');
}
});
})