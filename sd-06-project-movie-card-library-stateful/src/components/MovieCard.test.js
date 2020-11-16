import React from 'react';
import { render } from '@testing-library/react';
import MovieCard from './MovieCard';
import '@testing-library/jest-dom';

describe('Verifica o componente <MovieCard />', () => {
  const movie = {
    title: 'Movie Title 1',
    subtitle: 'Movie Subtitle 1',
    storyline: 'Movie Storyline 1',
    rating: 4.5,
    imagePath: 'images/movie_1',
  };


  it('Será validadado se o componente é renderizado com sucesso', () => {
    render(<MovieCard movie={movie} />);
  });
  
  it('Será validado se o a imagem do filme é renderizada dentro de uma tag "img"', () => {
    const { getByRole } = render(<MovieCard movie={movie} />);
    const image = getByRole('img');

    expect(image).toHaveAttribute('src', 'images/movie_1');
  });

  it('Será validado se o título do filme é renderizado com sucesso', () => {
    const { getByText } = render(<MovieCard movie={movie} />);

    const title = getByText('Movie Title 1');
    expect(title).toBeInTheDocument();
  });

  it('Será validado se o subtítulo do filme é renderizado com sucesso', () => {
    const { getByText } = render(<MovieCard movie={movie} />);

    const subtitle = getByText('Movie Subtitle 1');
    expect(subtitle).toBeInTheDocument();
  });


  it('Será validado se a sinopse do filme é renderizada com sucesso', () => {
    const { getByText } = render(<MovieCard movie={movie} />);
    const storyline = getByText('Movie Storyline 1');
    expect(storyline).toBeInTheDocument();
  });

  it('Será validado se a avaliação do filme é renderizada com sucesso', () => {
    const { getAllByTestId } = render(<MovieCard movie={movie} />);
    const rating = getAllByTestId('rating');

    expect(rating).toHaveLength(1);
  });

  it('Será validado se a avaliação do filme é renderizada com o valor correto', () => {
    const { getByTestId } = render(<MovieCard movie={movie} />);
    const startRating = getByTestId('rating');

    expect(startRating).toContainHTML('<span class="rating">4.5</span>');
  });
});
