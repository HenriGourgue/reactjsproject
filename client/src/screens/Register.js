import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
 
function Register(props) {

    const history = useHistory();

    const email = useFormInput('');
    const name = useFormInput('');
    const password = useFormInput('');
    const passwordConfirm = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        let localName = name.value;
        let localEmail = email.value;
        let localPassword = password.value;
        let localPasswordConfirm = passwordConfirm.value;

        if(localEmail.length < 1 || localPassword.length < 1 || localPasswordConfirm.length < 1 || localName.length < 1){
            alert('Formulaire non valide.')
        } else {
            if(localPassword != localPasswordConfirm){
                alert('Les mots de passe ne correspondent pas.')
            } else {
                console.log('register...')
                const response = await axios.post("http://localhost:3001/user/register", {name: localName, email: localEmail, password: sha256(localPassword)});
                let error = response.data.error

                if(error === "no"){
                    //Success
                    history.push("/login");
                } else {
                    alert(error)
                }
            }
        }
    }

    const goLogin = () => {

        history.push('/login')
    }

  return (

    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-md-auto">
                <div class="card cardLogin">
                    <div class="card-body">
                        <h5 class="card-title">MyBeers - Inscription</h5>
                        <form>

                            <div class="form-group">
                                <label>Nom</label>
                                <input type="text" class="form-control" {...name}/>
                            </div>

                            <div class="form-group">
                                <label>Adresse mail</label>
                                <input type="email" class="form-control" {...email}/>
                            </div>

                            <div class="form-group">
                                <label>Mot de passe</label>
                                <input type="password" class="form-control" {...password}/>
                            </div>

                            <div class="form-group">
                                <label>Confirmation</label>
                                <input type="password" class="form-control" {...passwordConfirm}/>
                            </div>

                            <div class="form-group">
                                <button type="button" class="btn btn-link" onClick={goLogin}>Connexion</button>
                                <input type="button" class="btn btn-primary" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
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
 
export default Register;
