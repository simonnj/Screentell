
const isEmpty = (string) => {
    if (string.trim() === '') {
        return true;
    } else {
        return false;
    }
}
// helper method to check wheter the email given is a valid possiblity
const isEmail = (email) => {
    const validSigns = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validSigns)) {
        return true;
    } else {
        return false;
    }
}

export function validateSignUp(data) {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'please give an email';
    } else if (!isEmail(data.email)) {
        errors.email = 'please give a valid email';
    }

    if (isEmpty(data.password)) {
        errors.password = 'please give a password';
    }
    if (isEmpty(data.nickName)) {
        errors.nickName = 'please give a nickName';
    }
    // to return errors if there are any.
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

export function validateLogin(data) {
    let errors = {};
    if (isEmpty(data.email)) {
        errors.email = 'please type your email';
    }
    if (isEmpty(data.password)) {
        errors.password = 'please type your password';
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}