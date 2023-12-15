function sendForm(event){

    let error = {};
    let address = event.target[6].value;

    if(address.length < 10){
        error.address = "слишком коротко";
        let addressField = document.getElementById("address-error");
        addressField.innerHTML = error.address;
        addressField.previousElementSibling.classlist.add("error");
    }
    else{
        error.address = null; 
        let addressField = document.getElementById("address-error");
        addressField.innerHTML = '';
        addressField.previousElementSibling.classlist.remove("error");
    }

    let name = event.target[0].value;
    let nameTemplate = /^[А-Я][а-яА-Я\s]*[а-яА-Я]$/g;

    if(!nameTemplate.test(name)){
        error.name = "введите корректное имя";
        let nameField = document.getElementById("name-error")
        nameField.innerHTML = error.name;
        nameField.previousElementSibling.classlist.add("error");
    }
    else{
        error.name = null;
        let nameField = document.getElementById("name-error");
        nameField.innerHTML = '';
        nameField.previousElementSibling.classlist.remove("error");
    }

    let phone = event.target[3].value;
    let phoneTemplate = /^\+375[0-9]{9}$/g;

    if(!phoneTemplate.test(phone)){
        error.phone = "введите правильный номер";
        let phoneField = document.getElementById("phone-error")
        phoneField.innerHTML = error.phone;
        phoneField.previousElementSibling.classlist.add("error");
    }
    else{
        error.phone = null;
        let phoneField = document.getElementById("phone-error");
        phoneField.innerHTML = '';
        phoneField.previousElementSibling.classlist.remove("error");
    }

    return false;
}