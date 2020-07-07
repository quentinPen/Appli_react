import Axios from 'axios';
import jwtDecode from "jwt-decode";
import { LOGIN_API_URL } from './Config';

function authenticate(credentials) {
    // Récupération du token si success
    return Axios.post(LOGIN_API_URL, credentials)
        .then(response => response.data.token)
        .then(token => {
            // Stockage du token en local Storage
            window.localStorage.setItem("authToken", token);
            setAxiosToken(token);
        });
}

function logout() {
    window.localStorage.removeItem("authToken");
    delete Axios.defaults.headers["Authorization"];
}

function setUp() {
    // Voir si on a un token
    const token = window.localStorage.getItem("authToken");
    // Si le token est encore valide
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }

}

function setAxiosToken(token) {
    // On prévient Axios que l'on a un header par défault sur toutes les requêtes HTTP
    Axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function isAuthenticated() {
    // Voir si on a un token
    const token = window.localStorage.getItem("authToken");
    // Si le token est encore valide
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true
        }
        return false;
    }

    return false;
}

export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
};