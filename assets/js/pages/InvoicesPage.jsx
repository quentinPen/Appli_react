import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Paginator from "../components/Paginator";
import InvoicesApi from '../services/InvoicesApi';
import { Link } from 'react-router-dom';

const InvoicesPage = props => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const STATUS_CLASSES = {
        PAID: "success",
        SENT: "primary",
        CANCELLED: "warning"
    }
    const STATUS_LABEL = {
        PAID: "Payée",
        SENT: "Envoyée",
        CANCELLED: "Annulée"
    }
    const itemsPerPage = 20;

    // Récupération des données API
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesApi.findAll().then(response => response.data["hydra:member"]);
            setInvoices(data);
        } catch (error) {
            console.log(error.response)
        }
    }

    // Charger les factures au chargement du composant
    useEffect(() => { fetchInvoices() }, []);


    // Gestion du chargement de la page
    const handleChangePage = page => setCurrentPage(page);

    // Gestion de la recherche
    const filteredInvoices = invoices.filter(i =>
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().includes(search.toLowerCase()) ||
        STATUS_LABEL[i.status].toLowerCase().includes(search.toLowerCase())
    );

    const paginatedInvoices = Paginator.getData(filteredInvoices, currentPage, itemsPerPage);
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    // Gestion de la suppression
    const handleDelete = async (id) => {
        const orignalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoicesApi.delete(id)
        } catch (error) {
            setInvoices(orignalInvoices);
            console.log(error.response);
        }
    };

    const formatDate = (str) => {
        return moment(str).format('DD/MM/YYYY')
    }
    return (<>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Liste des factures</h1>
            <Link to="/invoices/new" className="btn btn-primary">Créer une facture</Link>
        </div>
        <div className="form-group">
            <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="rechercher" />
        </div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th>Date d'envoi</th>
                    <th className="text-center">Montant</th>
                    <th className="text-center">Statut</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>
                            {invoice.customer.firstName} {invoice.customer.lastName}</td>
                        <td>{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            {invoice.amount}
                        </td>
                        <td className="text-center">
                            <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABEL[invoice.status]}
                            </span>
                        </td>
                        <td>
                            <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-primary mr-1">Editer</Link>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                        </td>

                    </tr>
                )}

            </tbody>
        </table>

        <Paginator handleChangePage={handleChangePage} length={filteredInvoices.length} currentPage={currentPage} itemsPerPage={itemsPerPage} />

    </>);
}

export default InvoicesPage;