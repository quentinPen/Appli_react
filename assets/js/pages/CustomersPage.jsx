import React, { useEffect, useState } from 'react';
import Paginator from '../components/Paginator';
import customersApi from '../services/customersApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';

const CustomersPage = props => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;
    const filteredCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(search.toLowerCase())) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    const fetchCustomers = async () => {
        // Meilleure facon javascript
        try {
            const data = await customersApi.findAll();
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            toast.error("Une erreur est survenue lors du chragement des clients");
            console.log(error.response)
        }
        // Autre facon de faire
        // customersApi.findAll()
        //     .then(data => setCustomers(data))
        //     .catch(error => console.log(error.response));
    }

    // !On ne peut passer async a un useEffect de react
    useEffect(() => {
        fetchCustomers()
    }, []);

    const handleDelete = async (id) => {
        const orignalCustomers = [...customers];
        // 1 L'approche optimiste
        setCustomers(customers.filter(customer => customer.id !== id));
        // 2 L'approche Pessimiste

        // Meilleure facon javascript
        try {
            await customersApi.delete(id);
            toast.info("Client supprimé");
        } catch (error) {
            toast.error("Une erreur est survenue lors de la suppression du client");
            setCustomers(orignalCustomers);
        }

        // Autre facon de faire
        // customersApi.delete(id)
        //     .then(response => console.log(response))
        //     .catch(error => {
        //         setCustomers(orignalCustomers);
        //         console.log(error.response);
        //     });
    };

    // Function executed in Paginator
    // const start = currentPage * itemsPerPage / itemsPerPage;
    // const paginatedCustomers = customers.slice(start, start + itemsPerPage)
    const paginatedCustomers = Paginator.getData(filteredCustomers, currentPage, itemsPerPage);

    const handleChangePage = page => setCurrentPage(page);

    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    return (<>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Liste des clients</h1>
            <Link to="/customers/new" className="btn btn-primary">Créer un client</Link>
        </div>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="rechercher" />
            </div>
        {!loading &&
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
                    {paginatedCustomers.map(customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td><Link to={"/customers/" + customer.id}>{customer.firstName} {customer.lastName}</Link></td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className="text-center"><span className="badge badge-primary">{customer.invoices.length}</span></td>
                            <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                            <td><button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger">Supprimer</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        }
        {loading && <TableLoader />}
        {itemsPerPage < filteredCustomers.length &&
            <Paginator handleChangePage={handleChangePage} length={filteredCustomers.length} currentPage={currentPage} itemsPerPage={itemsPerPage} />
        }
    </>);
}

export default CustomersPage;