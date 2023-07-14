import type { UpdateProfileErrorResponse } from "$lib/types/types";

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

export class TokenError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, TokenError.prototype);
    }
}

export class FieldsError extends Error {
    errorFields: UpdateProfileErrorResponse;

    constructor(msg: string, errorFields: UpdateProfileErrorResponse) {
        super(msg);
        this.errorFields = errorFields
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FieldsError.prototype);
    }

    getMessage(){
        const myArray = [];
        if (this.errorFields.username){
            myArray.push(...this.errorFields.username)
        }
        if (this.errorFields.phone_number){
            myArray.push(...this.errorFields.phone_number)
        }
        if (this.errorFields.email){
            myArray.push(...this.errorFields.email)
        }
        return myArray.join("\n")
    }
}
