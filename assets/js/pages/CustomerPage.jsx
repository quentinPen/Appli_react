import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import customersApi from '../services/customersApi';

const CustomerPage = ({ history, match }) => {

    const { id = "new" } = match.params;

    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: ""
    });

    const [editing, setEditing] = useState(false);

    // Récuprération du customer en fonction de l'id
    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company } = await customersApi.find(id);
            setCustomer({ firstName, lastName, email, company });
        } catch (error) {
            console.log(error.response)
            // TODO Notif error
        }
    }
    // Chargement du customer si besoin au chargement du composant ou changement de l'id
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        };

    }, [id]);

    // Gestion des changement des inputs formulaires
    const handleChange = ({ currentTarget }) => {
        const name = currentTarget.name;
        const value = currentTarget.value;
        setCustomer({ ...customer, [name]: value });
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                await customersApi.update(id, customer);
                // TODO flash notif de success
            } else {
                await customersApi.create(customer);
                // TODO flash notif de success
                history.replace("/customers");
            }
            setErrors({});
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
        console.log(customer);
    }

    return (<>
        {!editing && <h1>Création d'un client</h1> || <h1>Modification d'un client</h1>}

        <form onSubmit={handleSubmit}>
            <Field name="lastName" label="Nom" onChange={handleChange} placeholder="Nom de famille du client" value={customer.lastName} error={errors.lastName}></Field>
            <Field name="firstName" label="Prénom" onChange={handleChange} placeholder="Prénom du client" value={customer.firstName} error={errors.firstName}></Field>
            <Field name="email" label="Email" onChange={handleChange} placeholder="Email du client" type="email" value={customer.email} error={errors.email}></Field>
            <Field name="company" label="Entreprise" onChange={handleChange} placeholder="Entreprise du client" value={customer.company} error={errors.company}></Field>
            <div className="form-group">
                <button className="btn btn-success" type="submit">Enregistrer</button>
                <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
            </div>

        </form>
    </>);
}

export default CustomerPage;