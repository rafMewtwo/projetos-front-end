import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      estado: false,
      movie: {},
    };
    this.deleteCard = this.deleteCard.bind(this);
    this.startApp = this.startApp.bind(this);
  }

  componentDidMount() {
    this.startApp();
  }

  async startApp() {
    const movie = await movieAPI.getMovie(this.props.match.params.id);
    this.setState({
      estado: true,
      movie,
    });
  }

  async deleteCard() {
    await movieAPI.deleteMovie(this.props.match.params.id);
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    if (this.state.estado === false) {
      return (
        <Loading />
      );
    }

    const { title, storyline, imagePath, genre, rating, subtitle, id } = this.state.movie;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={`../${imagePath}`} />
        <p>{`Title: ${title}`}</p>
        <p>{`Subtitle: ${subtitle}`}</p>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating: ${rating}`}</p>
        <span><Link to="/">VOLTAR</Link></span>
        <span><Link to={`/movies/${id}/edit`} >EDITAR</Link></span>
        <button onClick={this.deleteCard}><Link to="/">DELETAR</Link></button>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: {
    params: {
      id: PropTypes.number.isRequired,
    },
  }.isRequired,
};

export default MovieDetails;
