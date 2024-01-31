type Result<T> = { ok: true, value: T } | { ok: false, message: string };
type Value = string;
type IndexType = {[prop: string]: RegExp}

const validators: IndexType = {
    phone: new RegExp(/^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/),
    password: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\W]{8,}$/),
    email: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    lastName: new RegExp(/^[A-zА-Яа-яЁёЇїІіЄєҐґ']{3,30}$/),
    firstName: new RegExp(/^[A-zА-Яа-яЁёЇїІіЄєҐґ']{3,30}$/)
}

const validateInputs = (name: string, value: Value): Result<Value> => {
    if (!Object.keys(validators).includes(name)) {
        return { ok: true, value };
    } else {
        let message: string = '';

    switch (name) {
        case 'email':
            message = 'Please enter a valid e-mail';
            break;
        case 'password':
            message = 'At least 8 characters, 1 number, 1 upper and 1 lowercase!'
            break;
        case 'firstName':
        case 'lastName':
            message = 'At least 3 characters needed';
            break;
        case 'phone':
            message = 'Please enter a valid phone number';
            break;
        default:
            break
    }

    return validators[name as keyof IndexType].test(value) ? { ok: true, value } : { ok: false, message};
    }
};

export default validateInputs;