import React, { useState, useContext } from 'react';
import AuthApi from '../services/AuthApi';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field'

const LoginPage = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredential] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("");
    // Gestion des champs
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredential({ ...credentials, [name]: value });
    }
    // Gestion du Submit
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthApi.authenticate(credentials);
            setIsAuthenticated(true);
            setError("");
            history.replace("/customers");
        } catch (error) {
            setError("Acun compte ne possède cette adresse e-mail ou les informations ne correspondent pas");
        }
    }

    return (
        <>
            <h1>Connexion à l'application</h1>
            <form onSubmit={handleSubmit}>
                <Field label="Adresse e-mail" name="username" value={credentials.username} onChange={handleChange} placeholder="Adresse e-mail de connexion" error={error} />
                <Field label="Mot de passe" name="password" value={credentials.password} onChange={handleChange} placeholder="Votre mot de passe" />
                <div className="form-group">
                    <button type="submit" className="btn btn-success btn-primary">Connexion</button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;