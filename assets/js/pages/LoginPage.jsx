import React, { useState, useContext } from 'react';
import AuthApi from '../services/AuthApi';
import AuthContext from '../contexts/AuthContext';

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
                <div className="form-group">
                    <label htmlFor="username">Adresse e-mail</label>
                    <input id="username" type="email" name="username"
                        placeholder="Adresse e-mail de connexion" className={"form-control" + (error && " is-invalid")}
                        value={credentials.username}
                        onChange={handleChange}
                        required />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input id="password" type="text" name="password"
                        placeholder="Votre mot de passe" className="form-control"
                        value={credentials.password}
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success btn-primary">Connexion</button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;