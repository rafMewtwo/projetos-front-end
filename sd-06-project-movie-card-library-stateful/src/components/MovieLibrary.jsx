// implement MovieLibrary component here
import React, { Component } from 'react';
import PropTypes from 'prop-types';


import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);

    this.onClick = this.onClick.bind(this);

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: this.props.movies,
    };
  }

  onClick(state) {
    this.setState({ movies: this.state.movies.concat(state) });
  }

  onSearchTextChange(event) {
    this.setState({ searchText: event.target.value }, () => {
      this.filterSearchText(this.state.searchText);
    });
  }

  onBookmarkedChange(event) {
    this.setState({ bookmarkedOnly: event.target.checked }, () => {
      this.filterBookmarked(this.state.bookmarkedOnly);
    });
  }

  onSelectedGenreChange(event) {
    this.setState({ selectedGenre: event.target.value }, () => {
      this.filterSelect(this.state.selectedGenre);
    });
  }

  filterSearchText(state) {
    const array = this.props.movies
    .filter((element) => element.title.includes(state) ||
    element.subtitle.includes(state) ||
    element.storyline.includes(state));
    this.setState({ movies: array });
  }

  filterBookmarked(state) {
    const array = this.props.movies.filter((element) => element.bookmarked === state);
    this.setState({ movies: array });
  }

  filterSelect(state) {
    const array = this.props.movies.filter((element) => element.genre === state);
    this.setState({ movies: array });
  }

  render() {
    return (
      <div>
        <h2> My awesome movie library </h2>

        <SearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.onSearchTextChange}
          bookmarkedOnly={this.state.bookmarkedOnly}
          onBookmarkedChange={this.onBookmarkedChange}
          selectedGenre={this.state.selectedGenre}
          onSelectedGenreChange={this.onSelectedGenreChange}
        />

        <MovieList movies={this.state.movies} />
        <AddMovie onClick={this.onClick} />
      </div>
    );
  }
}

MovieLibrary.propTypes = { movies: PropTypes.arrayOf(PropTypes.object).isRequired };

export default MovieLibrary;
