let Validator = require('validatorjs');

const USER = {
    first_name: 'required|string',
    last_name: 'required|string',
    photo_url: 'url',
    email: 'required|email',
    password: 'required|min:8',
    tipperBoolean: 'required|boolean',
    start_date: [{ required_if: ['tipperBoolean', false] }, 'date'],
    tagline: [{ required_if: ['tipperBoolean', false] }, 'string'],
    company: [{ required_if: ['tipperBoolean', false] }, 'string'],
};

const LOGIN = {
    email: 'required|email',
    password: 'required',
    tipperBoolean: 'required|boolean',
};

const userValidator = data => {
    let output;
    let isValid;
    const validator = new Validator(data, USER);
    validator.passes(() => {
        isValid = true;
    });
    validator.fails(() => {
        isValid = false;
        output = validator.errors.all();
    });
    return { isValid: isValid, err: output };
};

module.exports = { userValidator };
