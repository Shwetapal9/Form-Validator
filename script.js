const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('Confirm Password');

//Show Error
function showError(input, message){
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show sucess outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.classList.add('success');
}

//Check valid email
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){
        showSuccess(input);
    }
    else{
        showError(input, `Email is not valid`);
    }
}

//Check Required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        }
        else{
            showSuccess(input);
        }
    });
}

//Check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min}`)
    }
    else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max}`)
    }
    else{
        showSuccess(input);
    }
}

//Check password match
function checPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password does not match');
    }
}


//Get fieldname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase () + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    checkRequired([username, email, password, confirmPassword]);    
    checkLength(username, 3, 5);
    checkLength(password, 6, 25);
    checkEmail(email);
    checPasswordMatch(password, confirmPassword)
})