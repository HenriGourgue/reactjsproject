import React, { useState, useEffect  } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MyBeers from '../components/MyBeers';
import RandomBeers from '../components/RandomBeers';
import About from '../components/About';
 
function Home() {

    const [myBeers, setMyBeers] = useState(false);
    const [randomBeers, setRandomBeers] = useState(false);
    const [about, setAbout] = useState(false);

    const beerName = useFormInput('');

    const history = useHistory();

    const showFavorites = async () => {
        setRandomBeers(false);
        setAbout(false);
        setMyBeers(true);
    }

    const showRandom = async () => {
        setMyBeers(false);
        setAbout(false);
        setRandomBeers(true);
    }

    const showAbout = async () => {
        setMyBeers(false);
        setRandomBeers(false);
        setAbout(true);
    }

    const showHome = async () => {
        setMyBeers(false);
        setRandomBeers(false);
        setAbout(false);
    }

    const findBeers = async () => {
        
        let localBeerName = beerName.value;

        const response = await axios.get("https://api.punkapi.com/v2/beers?beer_name=" + localBeerName);

        let beersFound = response.data;
    }

    const logout = async () => {

        localStorage.clear();
        history.push("/login");
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userEmail");
        if (!loggedInUser) {
            console.log('not logged')
            history.push("/login");
        }
    });

    const userEmail = localStorage.getItem("userEmail");

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top justify-content-between">
                    <div class="container-fluid">
                        <a class="navbar-brand" id="customLink" onClick={showHome}>MyBeers</a>({userEmail})
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                <a class="nav-link active" id="customLink" aria-current="page" onClick={showFavorites}>Mes Bières</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" id="customLink" aria-current="page" onClick={showRandom}>Bières aléatoires</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" id="customLink" aria-current="page" onClick={showAbout}>A propos</a>
                                </li>
                            </ul>
                            <form class="form-inline navbar-nav ml-auto">
                                <input class="form-control me-2" type="search" placeholder="Rechercher" aria-label="Rechercher" {...beerName}/>
                                <button type="button" class="btn btn-outline-success" onClick={findBeers}>Rechercher</button>
                            </form>
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" id="customLink" aria-current="page" onClick={logout}>Logout <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/><path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {myBeers &&
                    <div id="bodyItem">
                        <MyBeers />
                    </div>
                }

                {randomBeers &&
                    <div id="bodyItem">
                        <RandomBeers />
                    </div>
                }

                {about &&
                    <div id="bodyItem">
                        <About />
                    </div>
                }

                {!myBeers && !randomBeers && !about &&
                    <div id="bodyItem">
                        Page d'accueil !
                    </div>
                }
                
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
 
export default Home;
