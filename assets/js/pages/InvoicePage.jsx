import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import customersApi from '../services/customersApi';
import InvoicesApi from '../services/InvoicesApi';


const InvoicePage = ({ history, match }) => {
    const { id = "new" } = match.params;


    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT",
    })

    const [customers, setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: "",
    })
    // Récupération des clients
    const fetchCustomer = async () => {
        try {
            const data = await customersApi.findAll();
            setCustomers(data);
            if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
        } catch (error) {
            history.replace("/invoices");
            // TODO flash notif des erreurs
        }
    }
    // Récupération d'une facture
    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await InvoicesApi.find(id);
            setInvoice({
                amount, status, customer: customer.id
            });
        } catch (error) {
            // TODO flash notif des erreurs
            history.replace("/invoices");
        }
    }

    // Récupération de la liste des clients à chaque chargement du composant
    useEffect(() => {
        fetchCustomer()
    }, [])

    // Récupération de la bonne facture quand l'identifiant change
    useEffect(() => {
        if (id !== "new") {
            fetchInvoice(id);
            setEditing(true);
        }
    }, [id]);

    console.log(invoice)

    // Gestion de changements au niveau des inputs
    const handleChange = ({ currentTarget }) => {
        const value = currentTarget.value;
        const name = currentTarget.name;
        setInvoice({ ...invoice, [name]: value });
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                await InvoicesApi.update(id, invoice);
                // TODO flash notif succès
            } else {
                // TODO flash notif succès
                await InvoicesApi.create(invoice);
                history.replace("/invoices")
            }
        } catch ({ response }) {
            if (response.data.violations) {
                const apiErrors = {};
                response.data.violations.map(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
                // TODO flash notif des erreurs
            }
        }
    }

    // name, label, value, onChange, placeholder, type = "text", error = ""
    return (<>
        {editing && <h1>Modification d'une facture</h1> || <h1>Création d'une facture</h1>}
        <form onSubmit={handleSubmit}>
            <Field name="amount" label="Montant" type="number" error={errors.amount} onChange={handleChange} placeholder="Montant de la facture" value={invoice.amount}></Field>
            <Select name="customer" label="Client" error={errors.customer} onChange={handleChange} value={invoice.customer}>
                {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.lastName} {customer.firstName}</option>)}
            </Select>
            <Select name="status" label="Statut" error={errors.status} onChange={handleChange} value={invoice.status}>
                <option value="SENT">Envoyée</option>
                <option value="PAID">Payée</option>
                <option value="CANCELLED">Annnulée</option>
            </Select>
            <div className="form-group">
                <button className="btn btn-success">Enregistrer</button>
                <Link to="/invoices" className="btn btn-link">Retour aux factures</Link>
            </div>
        </form>
    </>)
}

export default InvoicePage;