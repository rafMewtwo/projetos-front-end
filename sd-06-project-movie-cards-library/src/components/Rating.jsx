// implement Rating component here
import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    return (
      <div className="movie-card-rating">
        <p className="rating">{this.props.rating}</p>
      </div>
    );
  }
}

Rating.propTypes = { rating: PropTypes.number.isRequired };

export default Rating;
