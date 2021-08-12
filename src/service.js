import dotenv from 'dotenv'
import firebase from "firebase/app";
import '@firebase/storage';
import '@firebase/database'
import "firebase/firestore";
dotenv.config();

if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyDt-S90tQUFUCQQW_0I0PfUU1vz-XOrZd8",
        authDomain: "expense-c879f.firebaseapp.com",
        projectId: "expense-c879f",
        storageBucket: "expense-c879f.appspot.com",
        messagingSenderId: "813328062502",
        appId: "1:813328062502:web:ee11e180a500ba2d506ee7"
    });
} 

const db = firebase.firestore();

export const addLink = async (info) => {
    try {
        await db.collection("links").add({
            name: info.name,
            url: info.url,
        }).then((response) => console.log(response))
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const fetchLinks = async () => {
    let linksRef = await db.collection("links").get();
    let links = [];
    linksRef.forEach(link => links.push({ name: link.data().name, url: link.data().url }));
    return links;
}

export const addResourceLink = async (info) => {
    try {
        await db.collection("Resourcelinks").add({
            name: info.name,
            url: info.url,
        }).then((response) => console.log(response))
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const fetchResourceLinks = async () => {
    let linksRef = await db.collection("Resourcelinks").get();
    let links = [];
    linksRef.forEach(link => links.push({ name: link.data().name, url: link.data().url }));
    return links;
}