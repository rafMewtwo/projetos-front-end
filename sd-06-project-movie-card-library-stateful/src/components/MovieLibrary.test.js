import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import event from '@testing-library/user-event';

import MovieLibrary from './MovieLibrary';

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


describe('Verifica o componente <MovieLibrary />', () => {
  it('Será validado se o componente é renderizado com sucesso', () => {
    render(<MovieLibrary movies={movies} />);
  });
});

describe('Verifica o estado inicial do component <MovieLibrary />', () => {

  
  it('Será validado se o `searchText` é inicializado com uma string vazia', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const searchText = getByTestId('text-input');
    expect(searchText).toHaveValue('');
  });
  
  it('Será validado se o `bookmarkedOnly` é inicializado com o boleano `falso`', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const bookmarkedOnly = getByTestId('checkbox-input');
    expect(bookmarkedOnly).not.toBeChecked();
  });
  
  it('Será validado se o `selectedGenre` é inicializado com uma string vazia', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const selectInput = getByTestId('select-input');
    expect(selectInput).toHaveValue('');
  });
  
  it('Será validado se o todos os `movies` são renderezidados.', () => {
    const { getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const movieCards = getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(movies.length);
  });
});

describe('Verifica se o componente <MovieLibrary /> renderiza o componente <SearchBar />', () => {
  it('Será validado se um componente `SearchBar` é renderizado', () => {
    const { getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const searchBar = getAllByTestId('search-bar-form');
    expect(searchBar).toHaveLength(1);
  });

  it('Será validado se o estado da `SearchBar` muda quando quem usa digita algo', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const searchText = getByTestId('text-input');
    event.type(searchText, 'My Search Text');


    expect(searchText).toHaveValue('My Search Text');
  });


  it('Será validado que é possivel selecionar a opção de filtrar por favoritos`', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const bookmarkedOnly = getByTestId('checkbox-input');
    event.click(bookmarkedOnly);
    expect(bookmarkedOnly).toBeChecked();
  });

  it('Será validado que é possivel escolher uma categoria uma categoria de filme para filtrar', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const selectInput = getByTestId('select-input');
    expect(selectInput).toHaveValue('');

    event.selectOptions(selectInput, 'thriller');

    expect(selectInput).toHaveValue('thriller');
  });
});

describe('Verifica se o componente <MovieLibrary /> renderiza o componente <MovieList />', () => {
  it('Será validado que o componente `MovieList` é renderizado com sucesso', () => {
    const { getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const movieList = getAllByTestId('movie-list');
    expect(movieList).toHaveLength(1);
  });

  it('Será validado se a barra de buscas filtra os filmes por titulo', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const textInput = getByTestId('text-input');

    event.type(textInput, 'awesome');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);

    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[0].title);
  });

  it('Será validado se a barra de buscas filtra os filmes por subtítulo', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const textInput = getByTestId('text-input');

    event.type(textInput, 'incredible');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);

    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[1].title);
  });

  it('Será validado se a barra de buscas filtra os filmes por sinopse', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const textInput = getByTestId('text-input');

    event.type(textInput, 'great');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);

    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[2].title);
  });

  it('Será validado se a lista de filmes é renderizada sem filtragens se a barra de buscar estiver vazia', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const textInput = getByTestId('text-input');

    event.type(textInput, '');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(3);
  });

  it('Será validado que é possivel filtrar por favoritos', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const bookmarkedOnly = getByTestId('checkbox-input');

    event.click(bookmarkedOnly);

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);
    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[0].title);
  });


  it('Será validado que é possivel filtrar por categoria', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const select = getByTestId('select-input');

    event.selectOptions(select, 'comedy');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);
    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[1].title);
  });
});

describe('Verifica se o componente <MovieLibrary /> renderiza o componente <AddMovie />', () => {
  it('Será validado se o componente `AddMovie` é renderizado com sucesso', () => {
    const { getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const addMovieForm = getAllByTestId('add-movie-form');
    expect(addMovieForm).toHaveLength(1);
  });

  it('Será validado se é possível adicionar um novo filme a lista de filmes', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);

    const newMovie = {
      subtitle: 'Harry Potter magical subtitle',
      title: 'Harry Potter VII',
      storyline: 'Harry dies',
      rating: '4.9',
      genre: 'action',
    };

    let movieCards = getAllByTestId('movie-card');


    expect(movieCards).toHaveLength(movies.length);

    const titleInput = getByTestId('title-input');
    const subtitleInput = getByTestId('subtitle-input');
    const imageInput = getByTestId('image-input');
    const storylineInput = getByTestId('storyline-input');
    const ratingInput = getByTestId('rating-input');
    const genreInput = getByTestId('genre-input');
    const sendButton = getByTestId('send-button');

    event.type(titleInput, newMovie.title);
    event.type(subtitleInput, newMovie.subtitle);
    event.type(imageInput, newMovie.imagePath);
    fireEvent.change(storylineInput, { target: { value: newMovie.storyline } });
    event.type(ratingInput, newMovie.rating);
    event.selectOptions(genreInput, newMovie.genre);


    event.click(sendButton);

    movieCards = getAllByTestId('movie-card');

    expect(movieCards).toHaveLength(movies.length + 1);
    const newMovieTitle = getAllByTestId('movie-card-title');
    expect(newMovieTitle[movieCards.length - 1]).toHaveTextContent(newMovie.title);
  });
});
