const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let  errors = {}

    data.name = !isEmpty(data.name)?data.name:"";
    data.email = !isEmpty(data.email)?data.email:"";
    data.password = !isEmpty(data.password)?data.password:"";


    if(validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }
    if(validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }else if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    if(validator.isEmpty(data.password)){
        errors.password1 = "password is required";
    }
    if(!validator.isLength(data.password,{min:6,max:undefined})){
        errors.password = "min length of the password should be 6";
    }
    return {
        errors,
        isValid:isEmpty(errors)
    };
}
