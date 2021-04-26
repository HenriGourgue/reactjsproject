import React, { useState, useEffect } from 'react';
import axios from 'axios';

class BeerItem extends React.Component {

    constructor(props) {
        super(props);
    }

    deleteFromFavorite = async () => {

        let beer = this.props.beer;

        const response = await axios.post("http://localhost:3001/beers/favorites/delete", {beer: beer, userEmail: localStorage.getItem("userEmail")});

        if(response.data.error != "no"){
            alert(response.data.error);
        } else {
            alert("Bière reetirée !");
            this.props.deleteBeer(beer);
        }
    }

    render() {
        return (
            <div class="card" id="cardFavorite">
                <img id="imgFavorite" class="mx-auto img-thumbnail" src={this.props.beer.image} alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.beer.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a class="btn btn-danger" onClick={this.deleteFromFavorite}>Supprimer des favoris</a>
                    </div>
            </div>
        );
    }

}

export default BeerItem;