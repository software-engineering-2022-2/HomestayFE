import { writable } from "svelte/store";


const user = writable({
    username: "",
    avatar: ""
});

export {user};