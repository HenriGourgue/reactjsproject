import React, { useState, useEffect } from 'react';
import axios from 'axios';

class BeerItem extends React.Component {

    constructor(props) {
        super(props);
    }

    addToFavorite = async () => {

        let beer = this.props.beer;

        console.log('heere', beer.abv)

        const response = await axios.post("http://localhost:3001/beers/favorites/add", {beer: beer, userEmail: localStorage.getItem("userEmail")});

        if(response.data.error != "no"){
            alert(response.data.error);
        } else {
            alert("Bière ajoutée !")
        }
    }

    render() {
        return (
            <div class="card" id="cardFavorite">
                <img id="imgFavorite" class="mx-auto img-thumbnail" src={this.props.beer.image} alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.beer.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a class="btn btn-success" onClick={this.addToFavorite}>Ajouter aux favoris</a>
                    </div>
            </div>
        );
    }

}

export default BeerItem;