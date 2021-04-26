import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
 
function Login(props) {

    const history = useHistory();

    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    const handleLogin = async () => {

        let localEmail = email.value;
        let localPassword = password.value;

        if(localEmail.length < 1 || localPassword.length < 1){
            alert('Formulaire non valide.')
        } else {
            const response = await axios.post("http://localhost:3001/user/login", {email: localEmail, password: sha256(localPassword)});
            
            let error = response.data.error;

            if(error === "no"){
                //Success
                toast.success('Connexion réussie !');
                setUser(localEmail);
                localStorage.setItem('userEmail', localEmail);
                history.push("/", {email:localEmail});
            } else {
                toast.error(error);
            }
        }
    }

    const goRegister = () => {

        history.push('/register')
    }

  return (

    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-md-auto">
                <div class="card cardLogin">
                    <div class="card-body">
                        <h5 class="card-title">MyBeers - Connexion</h5>

                        <form>

                            <div class="form-group">
                                <label>Adresse mail</label>
                                <input type="email" class="form-control" {...email}/>
                            </div>

                            <div class="form-group">
                                <label>Mot de passe</label>
                                <input type="password" class="form-control" {...password}/>
                            </div>

                            <div class="form-group">
                                <button type="button" class="btn btn-link" onClick={goRegister}>Inscription</button>
                                <input type="button" class="btn btn-primary" value={loading ? 'Charment...' : 'Se connecter'} onClick={handleLogin} disabled={loading} /><br />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
}

function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = crypto.subtle.digest('SHA-256', data);
    return hash;
}
 
export default Login;
