import Axios from 'axios';

function findAll() {
    return Axios.get('https://127.0.0.1:8000/api/invoices');
}
function deleteInvoice(id) {
    return Axios.delete('https://127.0.0.1:800/api/invoices/' + id);
}

function find(id) {
    return Axios.get("https://127.0.0.1:8000/api/invoices/" + id).then(response => response.data);
}

function update(id, invoice) {
    return Axios.put("https://127.0.0.1:8000/api/invoices/" + id, { ...invoice, customer: `/api/customers/${invoice.customer}` })
}

function create(invoice) {
    return Axios.post("https://127.0.0.1:8000/api/invoices", { ...invoice, customer: `/api/customers/${invoice.customer}` })
}
export default {
    findAll,
    delete: deleteInvoice,
    find,
    update,
    create
}