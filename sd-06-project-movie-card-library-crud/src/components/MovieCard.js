import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    // console.log(this.props.movie)
    return (
      <div data-testid="movie-card">
        <img src={this.props.movie.imagePath} alt="imagem do filme" />
        <h4>{this.props.movie.title}</h4>
        <h5>{this.props.movie.storyline}</h5>
        <span><Link to={`/movies/${this.props.movie.id}`} >VER DETALHES</Link></span>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    storyline: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
