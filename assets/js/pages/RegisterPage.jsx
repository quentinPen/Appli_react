import React, { useState } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import UsersApi from '../services/UsersApi';
import {toast} from 'react-toastify'

const RegisterPage = ({ history }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    // Gestion des champs
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setUser({ ...user, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme au mot de passe original"
            setErrors(apiErrors);
            toast.error("Des erreurs dans votre formulaire");
            return;
        }
        try {
            await UsersApi.register(user);
            setErrors({});
            toast.success("Vous êtes désormais inscrit, vous pouvez vous connecter");
            history.replace('/login');
        } catch (error) {
            const { violations } = error.response.data;
            if (violations) {
                violations.map(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire");
        }
    }

    return (<>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <Field name="firstName" label="Prénom" placeholder="Votre prénom" onChange={handleChange} value={user.firstName} error={errors.firstName}></Field>
            <Field name="lastName" label="Nom" placeholder="Votre nom" onChange={handleChange} value={user.lastName} error={errors.lastName}></Field>
            <Field name="email" label="Email" type="email" placeholder="Votre email" onChange={handleChange} value={user.email} error={errors.email}></Field>
            <Field name="password" label="Mot de passe" placeholder="Votre Mot de passe" onChange={handleChange} value={user.password} type="password" error={errors.password}></Field>
            <Field name="passwordConfirm" label="Confirmation de mot de passe" placeholder="Confirmation de mot de passe" onChange={handleChange} value={user.passwordConfirm} type="password" error={errors.passwordConfirm}></Field>
            <button type="submit" className="btn btn-success">Enregister</button>
            <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
        </form>
    </>);
}

export default RegisterPage;