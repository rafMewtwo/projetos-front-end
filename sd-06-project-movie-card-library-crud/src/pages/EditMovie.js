import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { MovieForm, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      movie: {},
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startApp = this.startApp.bind(this);
  }

  componentDidMount() {
    this.startApp();
  }

  async startApp() {
    const movie = await movieAPI.getMovie(this.props.match.params.id);
    this.setState({
      status: true,
      movie,
    });
  }

  async handleSubmit(updatedMovie) {
    const movie = await movieAPI.updateMovie(updatedMovie);
    this.setState({
      movie,
      shouldRedirect: true,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect === true) {
      return (
        <Redirect to="/" />
      );
    }

    if (status === false) {
      // render Loading
      return (
        <Loading />
      );
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default EditMovie;
