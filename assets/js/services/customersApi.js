import Axios from 'axios';

function findAll() {
    return Axios.get('https://127.0.0.1:8000/api/customers')
        .then(response => response.data['hydra:member']);
}

function deleteCustomer(id) {
    return Axios.delete('https://127.0.0.1:8000/api/customers/' + id);
}

export default {
    findAll, delete: deleteCustomer
}