export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity =(value, rules) => {   // metodo para checkar se o formulario é valido ou não
    let isValid = true;

    if (rules.required) {   // checka se existe as regras de validação
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) { // checka se esta dentro da quantidade minima de caracteres
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {  // checka se esta dentro da quantidade maxima de caracteres
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}