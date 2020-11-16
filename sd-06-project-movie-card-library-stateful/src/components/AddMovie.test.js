import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import event from '@testing-library/user-event';
import AddMovie from './AddMovie';

const initialState = {
  subtitle: '',
  title: '',
  imagePath: '',
  storyline: '',
  rating: 0,
  genre: 'action',
};

const onClick = jest.fn();
let form;
let titleInput;
let titleInputLabel;
let subtitleInput;
let subtitleInputLabel;
let imageInput;
let imageInputLabel;
let storylineInput;
let storylineInputLabel;
let ratingInput;
let ratingInputLabel;
let genreInput;
let genreInputLabel;
let genreOptions;
let sendButton;


beforeEach(() => {
  const { queryAllByTestId, queryByTestId } = render(<AddMovie onClick={onClick} />);
  form = queryAllByTestId('add-movie-form');
  titleInput = queryByTestId('title-input');
  titleInputLabel = queryByTestId('title-input-label');
  subtitleInput = queryByTestId('subtitle-input');
  subtitleInputLabel = queryByTestId('subtitle-input-label');
  imageInput = queryByTestId('image-input');
  imageInputLabel = queryByTestId('image-input-label');
  storylineInput = queryByTestId('storyline-input');
  storylineInputLabel = queryByTestId('storyline-input-label');
  ratingInput = queryByTestId('rating-input');
  ratingInputLabel = queryByTestId('rating-input-label');
  genreInput = queryByTestId('genre-input');
  genreInputLabel = queryByTestId('genre-input-label');
  genreOptions = queryAllByTestId('genre-option');
  sendButton = queryByTestId('send-button');
});


describe('Verifica o componente <AddMovie />', () => {
  it('Será validado se o componente renderiza', () => {
    render(<AddMovie onClick={() => jest.fn()} />);
  });

  it('Será validado se o componente renderiza 1, e apenas 1, form', () => {
    expect(form).toHaveLength(1);
  });
});

describe('Verifica o input de título do componente <AddMovie />', () => {
  it('Será validado se o component renderiza um input de texto para quem usa escrever o titulo do filme', () => {
    expect(titleInput).toBeInTheDocument();
  });

  it('Será validado se o componente renderiza a label "Título" para o input de titulo', () => {
    expect(titleInputLabel).toBeInTheDocument();
    expect(titleInputLabel).toHaveTextContent('Título');
  });

  it('Será validado se o estado inicial do titulo é "", ou seja, uma string vazia', () => {
    expect(titleInput).toHaveValue(initialState.title);
  });

  it('Será validado se o valor do input de título muda quando algo é digitado por quem usa', () => {
    event.type(titleInput, 'my awesome movie title');

    expect(titleInput).toHaveValue('my awesome movie title');
  });
});

describe('Verifica o input de subtítulo do componente <AddMovie />', () => {
  it('Será validado se o componentee renderiza um input de texto para quem usa escrever o subtítulo do filme', () => {
    expect(subtitleInput).toBeInTheDocument();
  });

  it('Será validado se o component renderiza a label "Subtítulo" para o input de subtitulo', () => {
    expect(subtitleInputLabel).toBeInTheDocument();
    expect(subtitleInputLabel).toHaveTextContent('Subtítulo');
  });

  it('Será validado se o estado inicial do subtitulo é "", ou seja, uma string vazia', () => {
    expect(subtitleInput).toHaveValue(initialState.subtitle);
  });

  it('Será validado se o valor do input de subtitulo muda quando algo é digitado pelo usuário', () => {
    event.type(subtitleInput, 'my awesome movie subtitle');

    expect(subtitleInput).toHaveValue('my awesome movie subtitle');
  });
});

describe('Verifica o input de imagem do componente <AddMovie />', () => {
  it('Será validado se o componente renderiza um input de texto para quem usa inserir a url da imagem do filme', () => {
    expect(imageInput).toBeInTheDocument();
  });

  it('Será validado se o componente renderiza a label "Imagem" para o input de imagem', () => {
    expect(imageInputLabel).toBeInTheDocument();
    expect(imageInputLabel).toHaveTextContent('Imagem');
  });

  it('Será validado se o estado inicial do input de imagem é "", ou seja, uma string vazia', () => {
    expect(imageInput).toHaveValue(initialState.imagePath);
  });

  it('Será validado se o valor do input de imagem muda quando algo é digitado por quem usa', () => {
    event.type(imageInput, 'http://localhost:3000/images/Appleseed_Alpha.jpg');
    expect(imageInput).toHaveValue('http://localhost:3000/images/Appleseed_Alpha.jpg');
  });
});

describe('Verifica o input de sinopse do componente <AddMovie />', () => {
  it('Será validado se o componente renderiza um input de texto para quem usa escrever a sinopse do filme', () => {
    expect(storylineInput).toBeInTheDocument();
  });

  it('Será validado se o componente renderiza a label "Sinopse" para o input de sinopse', () => {
    expect(storylineInputLabel).toBeInTheDocument();
    expect(storylineInputLabel).toHaveTextContent('Sinopse');
  });

  it('Será validado se o estado inicial do input de sinopse é "", ou seja, uma string vazia', () => {
    expect(storylineInput).toHaveValue(initialState.storyline);
  });

  it('Será validado se o valor do input de sinopse muda quando algo é digitado por quem usa', () => {
    const message = 'In the following movie, everyone dies.';
    fireEvent.change(storylineInput, { target: { value: message } });
    expect(storylineInput).toHaveValue(message);
  });
});

describe('Verifica o input de avaliação do componente <AddMovie />', () => {
  it('Será validado se o componente renderiza um input de texto para quem usa escrever a avaliação do filme', () => {
    expect(ratingInput).toBeInTheDocument();
  });

  it('Será validado se o componente renderiza a label "Avaliação" para o input de avaliação', () => {
    expect(ratingInputLabel).toBeInTheDocument();
    expect(ratingInputLabel).toHaveTextContent('Avaliação');
  });

  it('Será validado se o estado inicial do input de avaliação é 0', () => {
    expect(ratingInput).toHaveValue(initialState.rating);
  });

  it('Será validado se o valor do input de avaliação muda quando algo é digitado por quem usa', () => {
    event.type(ratingInput, '1.5');

    expect(ratingInput).toHaveValue(1.5);
  });
});

describe('Verifica o select de gênero do componente <AddMovie />', () => {
  const options = [
    { value: 'action', text: 'Ação' },
    { value: 'comedy', text: 'Comédia' },
    { value: 'thriller', text: 'Suspense' },
  ];


  it('Será validado se o componente renderiza um select com 3 opções de genero de filme', () => {
    expect(genreInput).toBeInTheDocument();
    expect(genreOptions).toHaveLength(options.length);
  });

  it('Será validado se o component renderiza a label "Gênero" para o select de gênero', () => {
    expect(genreInputLabel).toBeInTheDocument();
    expect(genreInputLabel).toHaveTextContent('Gênero');
  });


  it('Será validado se todas as opções no select tem o texto e o valor esperados, que são, respectivamente: Ação e action, Comédia e comedy, Suspense e thriller', () => {
    genreOptions.forEach((option, index) => {
      expect(option).toHaveTextContent(options[index].text);
      expect(option).toHaveValue(options[index].value);
    });
  });

  it('Será validado se o gênero selecionado inicialmente é o "action"', () => {
    expect(genreInput).toHaveValue(initialState.genre);
  });

  it('Será validado se o valor do gênero muda quando um gênero diferente é escolhido no select', () => {
    event.selectOptions(genreInput, options[1].value);
    expect(genreInput).toHaveValue(genreOptions[1].value);
  });
});

describe('Verifica botão de criar filme do componente <AddMovie />', () => {
  it('Será validado se o texto do botão é "Adicionar filme"', () => {
    expect(sendButton).toHaveTextContent('Adicionar filme');
  });

  it('Será validado se o evento onClick é chamado ao se clicar no botão.', () => {
    event.type(titleInput, 'Harry Potter I');
    event.type(subtitleInput, 'Magical subtitle');
    fireEvent.change(storylineInput, { target: { value: 'The boy who lived.' } });
    event.type(storylineInput, 'The boy who lived.');
    event.type(ratingInput, '3.5');

    event.click(sendButton);

    expect(onClick).toHaveBeenCalled();
  });

  it('Será validado se o estado dos inputs volta ao inicial depois que o botão de adicionar é clicado.', () => {
    event.type(titleInput, 'Harry Potter I');
    event.type(subtitleInput, 'Magical subtitle');
    fireEvent.change(storylineInput, { target: { value: 'The boy who lived.' } });
    event.type(ratingInput, '3.5');
    event.selectOptions(genreInput, 'comedy');

    expect(titleInput).toHaveValue('Harry Potter I');
    expect(subtitleInput).toHaveValue('Magical subtitle');
    expect(storylineInput).toHaveValue('The boy who lived.');
    expect(ratingInput).toHaveValue(3.5);
    expect(genreInput).toHaveValue('comedy');

    event.click(sendButton);

    expect(titleInput).toHaveValue('');
    expect(subtitleInput).toHaveValue('');
    expect(storylineInput).toHaveValue('');
    expect(ratingInput).toHaveValue(0);
    expect(genreInput).toHaveValue('action');
  });
});
