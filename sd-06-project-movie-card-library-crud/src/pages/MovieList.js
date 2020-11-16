import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    }
    this.startApp = this.startApp.bind(this);
  }

  componentDidMount() {
    this.startApp();
  }

  async startApp() {
    const movie = await movieAPI.getMovies()
    this.setState({
      movies: movie,
    })
  }

  render() {
    const { movies } = this.state;
    // Render Loading here if the request is still happening
    if (this.state.movies.length === 0) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
        <span><Link to="/movies/new" >ADICIONAR CARTÃO</Link></span>
      </div>
    );
  }
}

export default MovieList;
