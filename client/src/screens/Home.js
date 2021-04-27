import React, { useState, useEffect  } from 'react';
import { useHistory } from "react-router-dom";
import MyBeers from '../components/MyBeers';
import RandomBeers from '../components/RandomBeers';
import About from '../components/About';
import SearchBeers from '../components/SearchBeers';
import toast, { Toaster } from 'react-hot-toast';
 
function Home() {

    const [myBeers, setMyBeers] = useState(false);
    const [randomBeers, setRandomBeers] = useState(false);
    const [about, setAbout] = useState(false);
    const [searchBeers, setSearchBeers] = useState(false);
    const [beerValueSearch, setBeerValueSearch] = useState("");

    const beerName = useFormInput('');

    const history = useHistory();

    const showFavorites = async () => {
        setRandomBeers(false);
        setAbout(false);
        setSearchBeers(false);
        setMyBeers(false);

        setTimeout(function(){ setMyBeers(true); }, 10);
    }

    const showRandom = async () => {
        setMyBeers(false);
        setAbout(false);
        setSearchBeers(false);
        setRandomBeers(false);

        setTimeout(function(){ setRandomBeers(true); }, 10);
    }

    const showAbout = async () => {
        setMyBeers(false);
        setRandomBeers(false);
        setSearchBeers(false);
        setAbout(false);

        setTimeout(function(){ setAbout(true); }, 10);
    }

    const showHome = async () => {
        setMyBeers(false);
        setRandomBeers(false);
        setAbout(false);
        setSearchBeers(false);
    }

    const showSearch = async () => {
        setMyBeers(false);
        setRandomBeers(false);
        setAbout(false);
        setSearchBeers(false);

        setTimeout(function(){ setSearchBeers(true); }, 10);
    }

    const findBeers = async () => {
        if(beerName.value != ""){
            setBeerValueSearch(beerName.value);
            showSearch();
        }
    }

    const logout = async () => {

        toast.success('Déconnexion réussie !');
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

                {searchBeers &&
                    <div id="bodyItem">
                        <SearchBeers value={beerValueSearch}/>
                    </div>
                }

                {!myBeers && !randomBeers && !about && !searchBeers &&
                    <div>
                        <div>
                            <div class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img id="carouPoivre" src="./banniere.jpg" alt="image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="bodyItem">
                            <div class="container">
                                <div class="row">
                                    <div class="card-deck" style={{marginTop: "2%"}}>
                                        <div class="card">
                                            <img src="./favoris.png" class="card-img-top" alt="image" />
                                            <div class="card-body">
                                                <h5 class="card-title">Mes bières</h5>
                                                <p class="card-text">Consultez vos favoris depuis notre interface. Cette fonctionnalité vous permet de consulter et supprimer voss bières favorites.</p>
                                            </div>
                                            <button type="button" class="btn btn-link" onClick={showFavorites}><i class="far fa-star"></i>&nbsp;Consulter</button>
                                        </div>
                                        <div class="card">
                                            <img src="./aleatoire.png" class="card-img-top" alt="image" />
                                            <div class="card-body">
                                                <h5 class="card-title">Bières aléatoires</h5>
                                                <p class="card-text">Trouvez la bière de vos rêves de manière aléatoire !</p>
                                            </div>
                                            <button type="button" class="btn btn-link" onClick={showRandom}><i class="fas fa-random"></i>&nbsp;Trouver</button>
                                        </div>
                                        <div class="card">
                                            <img src="./chercher.png" class="card-img-top" alt="image" />
                                            <div class="card-body">
                                                <h5 class="card-title">Chercher une bière</h5>
                                                <p class="card-text">Vous avez goûté une bonne bière hier soir ? Cherchez là depuis la barre de navigation de l'application.</p>
                                                <p class="card-text"><input class="form-control me-2" type="search" placeholder="Rechercher" aria-label="Rechercher" {...beerName}/></p>
                                            </div>
                                            <button type="button" class="btn btn-link" onClick={findBeers}><i class="fas fa-search"></i>&nbsp;Rechercher</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
