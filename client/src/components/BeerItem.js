import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

class BeerItem extends React.Component {

    constructor(props) {
        super(props);
    }

    addToFavorite = async () => {

        let beer = this.props.beer;

        const response = await axios.post("http://localhost:3001/beers/favorites/add", {beer: beer, userEmail: localStorage.getItem("userEmail")});

        if(response.data.error != "no"){
            toast.error(response.data.error);
            if(response.data.error == "La bière est déjà dans vos favoris."){
                this.props.deleteBeer(beer);
            }
        } else {
            toast.success('Bière ajoutée aux favoris !');
            this.props.deleteBeer(beer);
        }
    }

    render() {
        return (
            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-md-3">
                                <div class="text-center">
                                    <div class="favorite">
                                        <img src={this.props.beer.image} class="img-fluid img-fix-height" alt="Image non disponible"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="card-body">
                                    <h2 class="card-title">{this.props.beer.name}</h2>
                                    <h6 class="card-subtitle mb-2 text-muted">
                                        <i class="fas fa-tag"></i>{this.props.beer.tag} &nbsp; 
                                        <i class="fas fa-calendar-day"></i> {this.props.beer.date} &nbsp; 
                                        <i class="fas fa-percentage"></i> {this.props.beer.abv}
                                    </h6><br/>
                                    <p class="card-text">{this.props.beer.description}</p>
                                    <button type="button" class="btn btn-primary" onClick={this.addToFavorite}>Ajouter aux favoris</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default BeerItem;