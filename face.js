const main = document.getElementById("main");
const aboutus = document.getElementById("aboutus");
const enter = document.getElementById("enter");
const regist = document.getElementById("regist");
const menu = document.getElementById("menu");
const goto = document.getElementById('goto');

menu.addEventListener("click", (event) => {
    if(event.target.id=="me1"){
        main.classList.remove("main-hidden");
        enter.classList.add('enter-hidden');
        aboutus.classList.add("about-hidden");
        regist.classList.add("regist-hidden");
        document.getElementById('login').classList.remove('wrong-border');
        document.getElementById('login1').innerHTML = '';
        document.getElementById('login').value = '';
        document.getElementById('password').classList.remove('wrong-border');
        document.getElementById('password1').innerHTML = '';
        document.getElementById('password').value = '';
        document.getElementById('email').classList.remove('wrong-border');
        document.getElementById('email1').innerHTML = '';
        document.getElementById('email').value = '';
        document.getElementById('log').classList.remove('wrong-border');
        document.getElementById('log1').innerHTML = '';
        document.getElementById('log').value = '';
        document.getElementById('number').classList.remove('wrong-border');
        document.getElementById('number1').innerHTML = '';
        document.getElementById('number').value = '';
        document.getElementById('pass').classList.remove('wrong-border');
        document.getElementById('pass1').innerHTML = '';
        document.getElementById('pass').value = '';
        document.getElementById('name').classList.remove('wrong-border');
        document.getElementById('name1').innerHTML = '';
        document.getElementById('name').value = '';
    }
    if(event.target.id=="me2"){
        main.classList.add("main-hidden");
        enter.classList.remove('enter-hidden');
        aboutus.classList.add("about-hidden");
        regist.classList.add("regist-hidden");
        document.getElementById('email').classList.remove('wrong-border');
        document.getElementById('email1').innerHTML = '';
        document.getElementById('email').value = '';
        document.getElementById('log').classList.remove('wrong-border');
        document.getElementById('log1').innerHTML = '';
        document.getElementById('log').value = '';
        document.getElementById('number').classList.remove('wrong-border');
        document.getElementById('number1').innerHTML = '';
        document.getElementById('number').value = '';
        document.getElementById('pass').classList.remove('wrong-border');
        document.getElementById('pass1').innerHTML = '';
        document.getElementById('pass').value = '';
        document.getElementById('name').classList.remove('wrong-border');
        document.getElementById('name1').innerHTML = '';
        document.getElementById('name').value = '';
    }
    if(event.target.id=="me3"){
        main.classList.add("main-hidden");
        enter.classList.add('enter-hidden');
        aboutus.classList.add("about-hidden");
        regist.classList.remove("regist-hidden");
        document.getElementById('login').classList.remove('wrong-border');
        document.getElementById('login1').innerHTML = '';
        document.getElementById('login').value = '';
        document.getElementById('password').classList.remove('wrong-border');
        document.getElementById('password1').innerHTML = '';
        document.getElementById('password').value = '';
    }
    if(event.target.id=="me4"){
        main.classList.add("main-hidden");
        enter.classList.add('enter-hidden');
        aboutus.classList.remove("about-hidden");
        regist.classList.add("regist-hidden");
        document.getElementById('login').classList.remove('wrong-border');
        document.getElementById('login1').innerHTML = '';
        document.getElementById('login').value = '';
        document.getElementById('password').classList.remove('wrong-border');
        document.getElementById('password1').innerHTML = '';
        document.getElementById('password').value = '';
        document.getElementById('email').classList.remove('wrong-border');
        document.getElementById('email1').innerHTML = '';
        document.getElementById('email').value = '';
        document.getElementById('log').classList.remove('wrong-border');
        document.getElementById('log1').innerHTML = '';
        document.getElementById('log').value = '';
        document.getElementById('number').classList.remove('wrong-border');
        document.getElementById('number1').innerHTML = '';
        document.getElementById('number').value = '';
        document.getElementById('pass').classList.remove('wrong-border');
        document.getElementById('pass1').innerHTML = '';
        document.getElementById('pass').value = '';
        document.getElementById('name').classList.remove('wrong-border');
        document.getElementById('name1').innerHTML = '';
        document.getElementById('name').value = '';
    }
});

goto.onclick = () => {
    login = document.getElementById('log').value;
    password = document.getElementById('pass').value;
    email = document.getElementById('email').value;
    Username = document.getElementById('name').value;
    number = document.getElementById('number').value
    $.ajax({
        type: "POST",
        url: 'php/registration.php',
        data: {login: login, password: password, email: email,username: Username,number: number},
        success: function(error) {
            console.log(error)
            if(error == "00000") {
                document.getElementById('email').classList.remove('wrong-border');
                document.getElementById('email1').innerHTML = '';
                document.getElementById('log').classList.remove('wrong-border');
                document.getElementById('log1').innerHTML = '';
                document.getElementById('number').classList.remove('wrong-border');
                document.getElementById('number1').innerHTML = '';
                document.getElementById('pass').classList.remove('wrong-border');
                document.getElementById('pass1').innerHTML = '';
                document.getElementById('name').classList.remove('wrong-border');
                document.getElementById('name1').innerHTML = '';
                regg.classList.add('btn-hidden');
                sub.classList.remove('sub-hidden');
            }
            else{
                if(error[0] == "1"){
                    document.getElementById('log1').innerHTML = '???????? ?????????? ?????? ????????????????????????';
                    document.getElementById('log').classList.add('wrong-border');     
                }
                else if(error[0] == "2"){
                    document.getElementById('log1').innerHTML = '?????????? ???????????? ?????????????????? 3-15 ????????????????';
                    document.getElementById('log').classList.add('wrong-border');
                }
                else{
                    document.getElementById('log').classList.remove('wrong-border');
                    document.getElementById('log1').innerHTML = '';
                }
                if(error[1] == "1"){
                    document.getElementById('number1').innerHTML = '*???????? ???????????????????? ?????????? ?????? ??????????????????????????????';
                    document.getElementById('number').classList.add('wrong-border');
                }
                else if(error[1] == "2"){
                    document.getElementById('number1').innerHTML = '*?????????????? ???????????????????? ???????????????????? ??????????';
                    document.getElementById('number').classList.add('wrong-border');
                }
                else{
                    document.getElementById('number').classList.remove('wrong-border');
                    document.getElementById('number1').innerHTML = '';
                }
                if(error[2] == "1"){
                    document.getElementById('email1').innerHTML = '*?????? ???????????????????? ?????????? ?????? ????????????????????????????????';
                    document.getElementById('email').classList.add('wrong-border');
                }
                else if (error[2] == "2"){
                    document.getElementById('email1').innerHTML = '*?????????????? ?????????????????????? ?????????? ?? ?????????????? "Vasya..Pupkin"@example.com';
                    document.getElementById('email').classList.add('wrong-border');
                }
                else{
                    document.getElementById('email').classList.remove('wrong-border');
                    document.getElementById('email1').innerHTML = '';
                }
                if (error[3] == "2"){
                    document.getElementById('pass1').innerHTML = '*???????????? ???????????? ?????????????????? ???? ?????????? 3 ????????????????';
                    document.getElementById('pass').classList.add('wrong-border');
                }
                else{
                    document.getElementById('pass').classList.remove('wrong-border');
                    document.getElementById('pass1').innerHTML = '';
                }
                if (error[4] == "2"){
                    document.getElementById('name1').innerHTML = '*?????????????? ?????? ???? ??????????????????';
                    document.getElementById('name').classList.add('wrong-border');
                }
                else{
                    document.getElementById('name').classList.remove('wrong-border');
                    document.getElementById('name1').innerHTML = '';
                }
            }
        }
    });    
}

loginto.onclick = () => {
    login = document.getElementById('login').value;
    password = document.getElementById('password').value;
    $.ajax({
        type: "POST",
        url: 'php/enter.php',
        data: {login: login, password: password},
        success: function(error) {
            console.log(error);
            if(error == "11") {
                document.getElementById('login').classList.remove('wrong-border');
                document.getElementById('login1').innerHTML = '';
                document.getElementById('password').classList.remove('wrong-border');
                document.getElementById('password1').innerHTML = '';
                window.sessionStorage.setItem("login", login);
                document.location.href = "html/personal.html";
            }
            else{
                if(error[0] == "0"){
                    document.getElementById('login1').innerHTML = '*?????????? ???????????? ???? ????????????????????';
                    document.getElementById('login').classList.add('wrong-border');
                }
                else if(error[0] == "3"){
                    document.getElementById('login1').innerHTML = '*???????????????????????? ??????????';
                    document.getElementById('login').classList.add('wrong-border');
                }
                else{
                    document.getElementById('login').classList.remove('wrong-border');
                    document.getElementById('login1').innerHTML = '';
                }
                if(error[1] == "0"){
                    document.getElementById('password1').innerHTML = '*???????????????? ????????????';
                    document.getElementById('password').classList.add('wrong-border');
                }
                else{
                    document.getElementById('password').classList.remove('wrong-border');
                    document.getElementById('password1').innerHTML = '';
                }
            }
        }
    }); 
}