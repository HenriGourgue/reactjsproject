import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerItem from '../components/BeerItem';

class RandomBeers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      randoms: [],
      done: false
    };
  }

  nbItemsWanted = 10;

  componentDidMount(){
    this.findRandomBeers();
  }

  findRandomBeers = async () => {

    for(let i = 0; i < this.nbItemsWanted; i -= -1){

        const response = await axios.get("https://api.punkapi.com/v2/beers/random");

        const fetchedBeer = response.data[0];

        let beer = {id: fetchedBeer.id, name: fetchedBeer.name, abv: fetchedBeer.abv, image: fetchedBeer.image_url, description: fetchedBeer.description, tag: fetchedBeer.tagline}

        this.setState({ randoms: [...this.state.randoms, beer] })
    }

    this.setState({ done: true });
  }

  render() {
    const listBeers = this.state.randoms.map((beer) => <div><BeerItem key={beer.name} beer={beer}/></div>);
    return (
        <div>
            <h1>Bières aléatoires :</h1>
            {this.state.done == true && this.state.randoms.length > 0 &&
                listBeers
            }

            {this.state.done == false &&
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            }
        </div>
    );
  }

}

export default RandomBeers;