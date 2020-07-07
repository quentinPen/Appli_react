import Axios from 'axios';
import { INVOICES_API_URL } from '../services/Config';

function findAll() {
    return Axios.get(INVOICES_API_URL);
}
function deleteInvoice(id) {
    return Axios.delete(INVOICES_API_URL + "/" + id);
}

function find(id) {
    return Axios.get(INVOICES_API_URL + "/" + id).then(response => response.data);
}

function update(id, invoice) {
    return Axios.put(INVOICES_API_URL + "/" + id, { ...invoice, customer: `/api/customers/${invoice.customer}` })
}

function create(invoice) {
    return Axios.post(INVOICES_API_URL, { ...invoice, customer: `/api/customers/${invoice.customer}` })
}
export default {
    findAll,
    delete: deleteInvoice,
    find,
    update,
    create
}