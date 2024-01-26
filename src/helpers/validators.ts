type Result<T> = { ok: true, value: T } | { ok: false, message: string };
type Value = string;
type IndexType = {[prop: string]: RegExp}

const validator: IndexType = {
    phone: new RegExp(/^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/),
    password: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\W]{8,}$/),
    confirm: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\W]{8,}$/),
    email: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'i')
}

const validateInputs = (name: string, value: Value): Result<Value> => {
    if (name === 'firstName' || name === 'lastName') {
        return value.length >= 3 ? {ok: true, value} : {ok: false, message: 'At least 3 characters needed'}
    }

    return validator[name as keyof IndexType].test(value) ? { ok: true, value } : { ok: false, message: `${name} must be ${name}` };

    // if (name === 'email') {
    //     return email.test(value) ? {ok: true, value} : {ok: false, message: `${name} must be ${name}`};
    // } else if (name === 'password') {
    //     return password.test(value) ? {ok: true, value} : {ok: false, message: `${name} must be ${name}`};
    // } else if (name === 'phone') {
    //     return phone.test(value) ? {ok: true, value} : {ok: false, message: `${name} must be ${name}`};
    // } else if (value.length === 0) {
    //     return {ok: false, message: `${name} must not be empty`}
    // }
    // else {
    //     return { ok: false, message: 'Something goes wrong..' };
    // }
};

export default validateInputs;