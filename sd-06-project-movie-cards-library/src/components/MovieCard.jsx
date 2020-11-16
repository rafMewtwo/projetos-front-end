// implement MovieCard component here
import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

class MovieCard extends React.Component {
  render() {
    return (
      <div className="movie-card">
        <img className="movie-card-image" src={this.props.movie.imagePath} alt="imagem_filme" />
        <div className="movie-card-body">
          <h4 className="movie-card-title">{this.props.movie.title}</h4>
          <h5 className="movie-card-subtitle">{this.props.movie.subtitle}</h5>
          <p className="movie-card-storyline">{this.props.movie.storyline}</p>
        </div>
        <Rating rating={this.props.movie.rating} />
      </div>
    );
  }
}
MovieCard.propTypes = {
  movie:PropTypes.shape({
    // Todos os seus tipos aqui dentro
    title: PropTypes.string,
    imagePath: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    ratting: PropTypes.number,
  }).isRequired
}

export default MovieCard;
