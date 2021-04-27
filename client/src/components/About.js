import React, { useState, useEffect } from 'react';

class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            done: false
        };
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="jumbotron" id="jumbogosse">
                        <h1 class="display-4">A propos</h1>
                        <p class="lead">Bordeaux Ynov campus - Projet Ydays</p>
                        <hr class="my-4" />
                        <div class="accordion" id="accordionExample">
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Description du projet
                                        </button>
                                    </h2>
                                </div>

                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <p>Ce projet a été réalisé dans le cadre du cours Ydays du campus Bordeaux Ynov. C'est un projet réalisé avec React JS.</p>
                                        <p>Le but du projet est de créer une application permettant de rechercher des bières, de consulter leurs coordonnées et éventuellement d'ajouter une ou plusieurs bières au système de gestion des favoris.</p>
                                        <p>L'application se compose d'un serveur (expressJS) et du client (React JS). Le but du serveur est de gérer les utilisateurs ainsi que les bières préférées associées à ces utilisateurs.</p>
                                        <p><div class="media">
                                            <img id="githublol" src="https://logo-marque.com/wp-content/uploads/2020/12/GitHub-Logo-650x366.png" class="mr-3" alt="..." />
                                            <div class="media-body">
                                                <h5 class="mt-0">Github</h5>
                                                Le projet est disponnible sur <a href="https://github.com/HenriGourgue/reactjsproject" class="btn-link">github</a>. Il existe une branche <b>main</b> sur laquelle vous pouvez récupérer le code du client et du serveur.
                                            </div>
                                        </div></p>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Statistiques
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <p>
                                            <div class="card-columns">
                                                <div class="card bg-info text-white text-center p-3">
                                                    <blockquote class="blockquote mb-0">
                                                        <p><i class="fas fa-code"></i> &nbsp; 3000</p>
                                                        <footer class="blockquote-footer text-white">
                                                            <small>
                                                                <cite>Lignes de code</cite>
                                                            </small>
                                                        </footer>
                                                    </blockquote>
                                                </div>
                                                <div class="card bg-success text-white text-center p-3">
                                                    <blockquote class="blockquote mb-0">
                                                        <p><i class="fas fa-coffee"></i> &nbsp; 1000</p>
                                                        <footer class="blockquote-footer text-white">
                                                            <small>
                                                                <cite>Cafés bus</cite>
                                                            </small>
                                                        </footer>
                                                    </blockquote>
                                                </div>
                                                <div class="card bg-warning text-white text-center p-3">
                                                    <blockquote class="blockquote mb-0">
                                                        <p><i class="fas fa-beer"></i> &nbsp; 200</p>
                                                        <footer class="blockquote-footer text-white">
                                                            <small>
                                                                <cite>Bières bues</cite>
                                                            </small>
                                                        </footer>
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;