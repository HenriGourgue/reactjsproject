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

  refresh = () => {
    // re-renders the component
    this.setState({});
  };

  deleteBeer = async (beer) => {

    for(let i=0; i<this.state.favorites.length; i -= -1){
      if(beer.id == this.state.favorites[i].id){
        this.state.favorites.splice(i, 1);
        this.refresh();
        return;
      }
    }
  }

    render() {
      const listBeers = this.state.favorites.map((beer) => <div><BeerItemFavorite deleteBeer={this.deleteBeer} key={beer.name} beer={beer}/></div>);
      return (
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1>Bières favorites <span class="badge badge-pill badge-primary">{this.state.favorites.length}</span> :</h1><br/>
            </div>
          </div>
          {this.state.done == true && this.state.favorites.length > 0 &&
            listBeers
          }

          {this.state.done == false &&
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Chargement...</span>
            </div>
          }

          {this.state.done == true && this.state.favorites.length == 0 &&
            <div class="alert alert-info" id="infoNoBeer" role="alert">
              Vous n'avez pas encore de bières favorites !
            </div>
          }
        </div>
      );
    }
}

export default MyBeers;