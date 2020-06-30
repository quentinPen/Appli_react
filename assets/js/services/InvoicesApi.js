import Axios from 'axios';

function findAll() {
    return Axios.get('https://127.0.0.1:8000/api/invoices')
}
function deleteInvoice(id){
    return Axios.delete('https://127.0.0.1:800/api/invoices/'+id)
}
export default {
    findAll,
    delete: deleteInvoice
}