const btn = document.querySelector('.signupbtn');

btn.addEventListener('click', (event) => {
let password1 = document.getElementById('psw');      
let password2 = document.getElementById('psw-repeat');  
        
let name = document.querySelector('#name');
let surname = document.querySelector('#surname');
let psw = document.querySelector('#psw');
let email = document.querySelector('#email');



let array = JSON.parse(localStorage.getItem('user')) || [];
let data = {
        name : name.value,
        surname : surname.value,
        psw : psw.value,
        email : email.value,
        loggined: true || false
}

if (password1.value !== password2.value) {
        alert('Пароли не совпадают');
        return false;                 
}
if (password1.value == '') {
        return false;
}

array.push(data);
       
localStorage.setItem('user', JSON.stringify(array));
localStorage.setItem('loginInfo', JSON.stringify({ loggined: true, email: email.value }));
})      
