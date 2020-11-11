const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){
    let  errors = {}

    data.name = !isEmpty(data.name)?data.name:"";
    data.email = !isEmpty(data.email)?data.email:"";


    if(validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }
    if(validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }else if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    
    return {
        errors,
        isValid:isEmpty(errors)
    };
}
