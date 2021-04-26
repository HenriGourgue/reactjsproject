import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerItem from '../components/BeerItem';

class SearchBeers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          beers: [],
          done: false
        };
    }

    componentDidMount(){
        this.findBeers();
    }

    findBeers = async () => {

        let localBeerName = this.props.value;

        const response = await axios.get("https://api.punkapi.com/v2/beers?beer_name=" + localBeerName);

        let beersFound = response.data;

        for(let i = 0; i < beersFound.length; i -= -1){

            let beer = {id: beersFound[i].id, name: beersFound[i].name, abv: beersFound[i].abv, image: beersFound[i].image_url, description: beersFound[i].description, tag: beersFound[i].tagline};
            this.setState({ beers: [...this.state.beers, beer] })
        }

        this.setState({ done: true });
    }

    deleteBeer = async (beer) => {

        for(let i=0; i<this.state.beers.length; i -= -1){
          if(beer.id == this.state.beers[i].id){
            this.state.beers.splice(i, 1);
            this.refresh();
            return;
          }
        }
    }
    
    refresh = () => {
        // re-renders the component
        this.setState({});
    };

    render() {
        const listBeers = this.state.beers.map((beer) => <div><BeerItem deleteBeer={this.deleteBeer} key={beer.name} beer={beer}/></div>);
        return (
            <div>
                <h1>Bières trouvées :</h1>
                {this.state.done == true && this.state.beers.length > 0 &&
                    listBeers
                }

                {this.state.done == true && this.state.beers.length == 0 &&
                    <div class="alert alert-info" id="infoNoBeer" role="alert">
                        Aucune bière trouvée !
                    </div>
                }

                {this.state.done == false &&
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Chargement...</span>
                    </div>
                }
            </div>
        );
    }

}

export default SearchBeers;