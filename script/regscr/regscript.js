if(window.localStorage.getItem("users"))
{
    let users = JSON.parse(window.localStorage.getItem("users"));
    let cardList = document.getElementsByClassName("card-list")[0];

    if(cardList){
        if(users.length > 0){
            cardList.innerHTML = "";

            users.forEach(function(user){
                let newCard = 
                `
                <div class="card" draggable="true" ondragstart="startDrag(event)" id="user-${user.id}">
                    <img src="img/profileIcon.png" alt="">
                    <div class="card-name">${user.name}</div>
                    <div class="card-age">Возраст: ${user.age}</div>
                    <button>Инфо</button>
                `
                cardList.insertAdjacentHTML("beforeend", newCard);
            });
        }
    }
}

function sendForm(event){

    let error = {};
    let address = event.target[6].value;

    if(address.length < 10){
        error.address = "Слишком короткий адрес";
        let addressField = document.getElementById("address-error");
        addressField.innerHTML = error.address;
        addressField.previousElementSibling.classList.add("error");
    }
    else{
        let addressField = document.getElementById("address-error");
        addressField.innerHTML = '';
        addressField.previousElementSibling.classList.remove("error");
    }

    let name = event.target[0].value;
    let nameTemplate = /^[А-Я][а-яА-Я\s]*[а-яА-Я]$/g;

    if(!nameTemplate.test(name)){
        error.name = "Введите корректное имя";
        let nameField = document.getElementById("name-error")
        nameField.innerHTML = error.name;
        nameField.previousElementSibling.classList.add("error");
    }
    else{
        let nameField = document.getElementById("name-error");
        nameField.innerHTML = '';
        nameField.previousElementSibling.classList.remove("error");
    }

    let phone = event.target[3].value;
    let phoneTemplate = /^\+375[0-9]{9}$/g;

    if(!phoneTemplate.test(phone)){
        error.phone = "Введите правильный номер";
        let phoneField = document.getElementById("phone-error")
        phoneField.innerHTML = error.phone;
        phoneField.previousElementSibling.classList.add("error");
    }
    else{
        let phoneField = document.getElementById("phone-error");
        phoneField.innerHTML = '';
        phoneField.previousElementSibling.classList.remove("error");
    }

    let date = event.target[1].value;
    let gender = event.target[2].value;
    let email = event.target[3].value;
    let url = event.target[4].value;
    let errors = 0;

    for(key in error){
        errors++;
    }

    if(errors){
        return false;
    }
    else{
        let cardList = document.getElementsByClassName("card-list")[0];
        
       

        let now = new Date();
        let birthday = new Date(date);
        let age = now.getFullYear() - birthday.getFullYear();
        let id = Math.floor(Math.random() * 1000);

        let newCard = cardList.insertAdjacentHTML("beforeend", 
        `<div class="card">
        <img src="images/avatar.png">
        <div class="card-name">${name}</div>
        <div class="card-age">Возраст: ${age}</div>
        <button class="">Инфо</button>
        </div>`);

        let cards = document.getElementsByClassName("card");

        if(cards.length > 0){
            cardList.insertAdjacentHTML("beforeEnd", newCard);
        }
        else{
            cardList.innerHTML = newCard;
        }

        let user = {
            id: id,
            name: event.target[0].value,
            birthday: event.target[1].value,
            age: now.getFullYear() - birthday.getFullYear(),
            gender: event.target[2].value,
            phone: event.target[3].value,
            email: event.target[4].value,
            url: event.target[5].value,
            address: event.target[6].value
        }

        let users = [];

        if(window.localStorage.getItem("users")){
            users = JSON.parse(window.localStorage.getItem("users"));
        }

        users.push(user);

        window.localStorage.setItem("users", JSON.stringify(users));

    }
    return false;
}

    function startDrag(event){
        event.dataTransfer.setData("text/html", event.target.id);
        event.dataTransfer.effectAllowed = "move";
    }

    function enterDrag(event){
        console.log(event.target);
        event.dataTransfer.dropEffect = "move";
        event.target.parentElement.classList.add("active");   
    }

    function leaveDrag(event){
        event.target.parentElement.classList.remove("active");
    }