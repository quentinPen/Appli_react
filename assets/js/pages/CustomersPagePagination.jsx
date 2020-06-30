import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Paginator from '../components/Paginator';

const CustomersPagePagination = props => {
    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        Axios.get(`https://127.0.0.1:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
        .then(response => {
            setCustomers(response.data['hydra:member']),
            setTotalItems(response.data["hydra:totalItems"])
        })
            .catch(error => console.log(error.response));
    }, [currentPage]);

    const handleDelete = (id) => {
        const orignalCustomers = [...customers];
        // 1 L'approche optimiste
        setCustomers(customers.filter(customer => customer.id !== id));
        // 2 L'approche Pessimiste

        Axios.delete('https://127.0.0.1:8000/api/customers/' + id)
            .then(response => console.log(response))
            .catch(error => {
                setCustomers(orignalCustomers);
                console.log(error.response);
            });
    };

    // Function executed in Paginator
    // const start = currentPage * itemsPerPage / itemsPerPage;
    // const paginatedCustomers = customers.slice(start, start + itemsPerPage)
    const paginatedCustomers = Paginator.getData(customers, currentPage, itemsPerPage);

    const handleChangePage = page => {
        setCustomers([]);
        setCurrentPage(page);

    };

    return (<>
        <h1>Liste des clients Pagination</h1>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Facture</th>
                    <th className="text-center">Montant total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {customers.length === 0 && 
                    <tr>
                        <td>Chargement</td>
                    </tr>
                }
                {customers.map(customer =>
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center"><span className="badge badge-primary">{customer.invoices.length}</span></td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td><button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger">Supprimer</button></td>
                    </tr>
                )}
            </tbody>
        </table>
        <Paginator handleChangePage={handleChangePage} length={totalItems} currentPage={currentPage} itemsPerPage={itemsPerPage} />
    </>);
}

export default CustomersPagePagination;