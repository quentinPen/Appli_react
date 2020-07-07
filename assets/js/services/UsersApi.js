import Axios from 'axios';
import { USERS_API_URL } from './Config';

function register(user) {
    return Axios.post(USERS_API_URL, user);
}

export default { register }