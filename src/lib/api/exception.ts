

export class NetworkError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}

export class UnauthorizedError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class NotFoundError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class TokenError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, TokenError.prototype);
    }
}

export class FieldsError extends Error {
    errorFields: Object;

    constructor(msg: string, errorFields:  Object) {
        super(msg);
        this.errorFields = errorFields
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FieldsError.prototype);
    }

    getMessage(){
        const myArray = [];
        for (const [key, value] of Object.entries(this.errorFields)){
            myArray.push(...value)
        }
        return myArray.join("\n")
    }
}
