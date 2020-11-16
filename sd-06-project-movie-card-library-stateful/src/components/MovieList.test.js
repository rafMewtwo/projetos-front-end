import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import MovieList from './MovieList';

describe('Verifica o componente <MovieList />', () => {
  const movies = [
    {
      title: 'An awesome title',
      subtitle: 'Movie Subtitle 1',
      storyline: 'Movie Storyline 1',
      rating: 4.5,
      imagePath: 'images/movie_1',
      bookmarked: true,
      genre: 'action',
    },
    {
      title: 'Movie Title 2',
      subtitle: 'An incredible subtitle',
      storyline: 'Movie Storyline 2',
      rating: 4.5,
      imagePath: 'images/movie_2',
      bookmarked: false,
      genre: 'comedy',
    },
    {
      title: 'Movie Title 3',
      subtitle: 'Movie Subtitle 3',
      storyline: 'An great storyline',
      rating: 3,
      imagePath: 'images/movie_3',
      bookmarked: false,
      genre: 'thriller',
    },
  ];

  it('Será validado se o componente `MovieList` é renderizado com sucesso', () => {
    render(<MovieList movies={movies} />);
  });

  it('Será validado que um componente `MovieCard` é renderizado para cada filme passado como `props`', () => {
    const { getAllByTestId } = render(<MovieList movies={movies} />);
    const movieCards = getAllByTestId('movie-card');

    expect(movieCards).toHaveLength(3);
  });
});
