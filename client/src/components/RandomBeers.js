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

  deleteBeer = async (beer) => {

    for(let i=0; i<this.state.randoms.length; i -= -1){
      if(beer.id == this.state.randoms[i].id){
        this.state.randoms.splice(i, 1);
        this.refresh();
        return;
      }
    }
  }

  refresh = () => {
    // re-renders the component
    this.setState({});
  };

  findRandomBeers = async () => {

    for(let i = 0; i < this.nbItemsWanted; i -= -1){

        const response = await axios.get("https://api.punkapi.com/v2/beers/random");

        const fetchedBeer = response.data[0];

        let beer = {id: fetchedBeer.id, name: fetchedBeer.name, abv: fetchedBeer.abv, image: fetchedBeer.image_url, description: fetchedBeer.description, tag: fetchedBeer.tagline, date: fetchedBeer.first_brewed};

        this.setState({ randoms: [...this.state.randoms, beer] })
    }

    this.setState({ done: true });
  }

  render() {
    const listBeers = this.state.randoms.map((beer) => <div><BeerItem deleteBeer={this.deleteBeer} key={beer.name} beer={beer}/></div>);
    return (
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <h1>Bières aléatoires :</h1><br/>
              </div>
            </div>
            {this.state.done == true && this.state.randoms.length > 0 &&
                listBeers
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

export default RandomBeers;