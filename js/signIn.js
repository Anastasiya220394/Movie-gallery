let psw = document.querySelector('#psw');
let email = document.querySelector('#email');
let btnSign = document.querySelector('.signinbtn')

/*let currentUser = JSON.parse(localStorage.getItem('user'));
console.log(currentUser)
 if (currentUser) {
    email === currentUser.email
    psw === currentUser.psw
    btnSign.addEventListener('click', (event) => {
    document.location.href = 'index.html';
    })
    } else {
        console.log('aaaa')
    }*/
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
        let emailUser = users.find( user => user.email === currentUser.email);
        //let userName = emailUser.name;
        console.log(emailUser)
    }
