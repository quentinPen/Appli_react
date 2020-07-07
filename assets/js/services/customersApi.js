import Axios from 'axios';
import Cache from '../services/Cache';
import { CUSTOMERS_API_URL } from '../services/Config';

async function findAll() {
    const cachedCustomers = await Cache.get('customers');
    if (cachedCustomers) return cachedCustomers;

    return Axios.get(CUSTOMERS_API_URL)
        .then(response => {
            const customers = response.data['hydra:member'];
            Cache.set("customers", customers);
            return customers;
        })
}

function deleteCustomer(id) {
    return Axios.delete(CUSTOMERS_API_URL + '/' + id)
        .then(async response => {
            const cachedCustomers = await Cache.get('customers');
            if (cachedCustomers) {
                Cache.set("customers", cachedCustomers.filter(c => c.id !== + id));
            }
            return response;
        });
}

function find(id) {
    return Axios.get(CUSTOMERS_API_URL + '/' + id)
        .then(response => response.data);
}

function update(id, customer) {
    return Axios.put(CUSTOMERS_API_URL + '/' + id, customer)
        .then(async response => {
            const cachedCustomers = await Cache.get('customers');
            if (cachedCustomers) {
                const index = cachedCustomers.findIndex(c => c.id === + id);
                cachedCustomers[index] = response.data;
            }
            return response;
        });
}

function create(customer) {
    return Axios.post(CUSTOMERS_API_URL, customer)
        .then(async response => {
            const cachedCustomers = await Cache.get('customers');

            if (cachedCustomers) {
                Cache.set("customers", [...cachedCustomers, response.data])
            }
            return response;
        });
}

export default {
    findAll, delete: deleteCustomer, find, update, create
}