import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerItemFavorite from '../components/BeerItemFavorite';

class MyBeers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      done: false
    };
  }

  componentDidMount(){
    this.findFavoriteBeers();
  }

  findFavoriteBeers = async () => {

    const response = await axios.post("http://localhost:3001/beers/favorites", {email: localStorage.getItem("userEmail")});

    let beersFound = response.data;

    this.setState({ favorites: beersFound.favorites, done: true })
  }

    render() {
      const listBeers = this.state.favorites.map((beer) => <div><BeerItemFavorite key={beer.name} beer={beer}/></div>);
      return (
        <div>
          {this.state.done == true &&

          <div>

            <h1>Mes bières favorites <span class="badge badge-pill badge-primary">{this.state.favorites.length}</span> :</h1>
            { listBeers }
            {this.state.favorites.length == 0 &&
            <div class="alert alert-info" id="infoNoBeer" role="alert">
              Vous n'avez pas encore de bières favorites !
            </div>
            }

          </div>
          }
        </div>
      );
    }
}

export default MyBeers;