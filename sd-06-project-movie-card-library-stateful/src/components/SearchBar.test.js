import React from 'react';
import { render } from '@testing-library/react';
import event from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SearchBar from './SearchBar';

let props;
const searchBar = () => (
  render(
    <SearchBar
      searchText={props.searchText}
      onSearchTextChange={props.onSearchTextChange}
      bookmarkedOnly={props.bookmarkedOnly}
      onBookmarkedChange={props.onBookmarkedChange}
      selectedGenre={props.selectedGenre}
      onSelectedGenreChange={props.onSelectedGenreChange}
    />,
  )
);

const beforeEachUnitTest = () => {
  props = {
    searchText: 'My Text',
    onSearchTextChange: jest.fn(),
    bookmarkedOnly: true,
    onBookmarkedChange: jest.fn(),
    selectedGenre: 'action',
    onSelectedGenreChange: jest.fn(),
  };
};

describe('Verifica o componente <SearchBar />', () => {
  beforeEach(() => beforeEachUnitTest());

  it('Será validado se o componente `SearchBar` renderiza com sucesso', () => {
    searchBar();
  });
});

describe('Verifica o Form dentro do componente <SearchBar />', () => {
  beforeEach(() => beforeEachUnitTest());


  it('Renderiza 1, e apenas 1, form dentro de `SearchBar` com sucesso', () => {
    const { getAllByTestId } = searchBar();
    const form = getAllByTestId('search-bar-form');
    expect(form).toHaveLength(1);
  });
});

describe('Verifica o input de texto do componente <SearchBar />', () => {
  beforeEach(() => beforeEachUnitTest());


  it('Será validado que 1, e apenas 1, input de texto é renderizado dentro do forms', () => {
    const { getAllByTestId } = searchBar();
    const textInput = getAllByTestId('text-input');
    expect(textInput).toHaveLength(1);
  });

  it('Será validado que o input de texto contém a label "Inclui o texto"', () => {
    const { getAllByTestId } = searchBar();
    const textInputLabel = getAllByTestId('text-input-label');
    expect(textInputLabel).toHaveLength(1);
    expect(textInputLabel[0]).toHaveTextContent('Inclui o texto');
  });

  it('Será validado se o input de texto tem o valor passado pela props `searchText`', () => {
    const { getByTestId } = searchBar();
    const textInput = getByTestId('text-input');
    expect(textInput).toHaveValue(props.searchText);
  });

  it('Será validado que a props `onSearchTextChange` é passada para o atributo `onChange` do input', () => {
    const { getByTestId } = searchBar();
    const textInput = getByTestId('text-input');
    event.type(textInput, 'change');
    expect(props.onSearchTextChange).toHaveBeenCalledTimes(6);
  });
});

describe('Verfica que o componente <SearchBar /> renderiza uma checkbox.', () => {
  beforeEach(() => beforeEachUnitTest());


  it('Será validado se uma checkbox é renderizada dentro do form', () => {
    const { getAllByTestId } = searchBar();
    const checkboxInput = getAllByTestId('checkbox-input');
    expect(checkboxInput).toHaveLength(1);
  });

  it('Será validado que o checkbox tem a label "Mostrar somente favoritos"', () => {
    const { getAllByTestId } = searchBar();
    const checkboxInputLabel = getAllByTestId('checkbox-input-label');
    expect(checkboxInputLabel).toHaveLength(1);
    expect(checkboxInputLabel[0]).toHaveTextContent('Mostrar somente favoritos');
  });

  it('Será validado que a prop `bookmarkedOnly` é passada para o atributo `checked` do input', () => {
    const { getByTestId } = searchBar();
    const checkboxInput = getByTestId('checkbox-input');

    expect(checkboxInput).toBeChecked();
  });
  
  it('Será validado que a prop `onBookmarkedChange` é passada para o atributo `onChange` do input', () => {
    const { getByTestId } = searchBar();
    const checkboxInput = getByTestId('checkbox-input');
    event.click(checkboxInput);
    expect(props.onBookmarkedChange).toHaveBeenCalledTimes(1);
  });
});

describe('Verifica se o componente <SearchBar /> renderiza um select de gênero', () => {
  beforeEach(() => beforeEachUnitTest());


  it('Será validado que um select é renderizado dentro do form', () => {
    const { getAllByTestId } = searchBar();
    const selectInput = getAllByTestId('select-input');
    expect(selectInput).toHaveLength(1);
  });

  it('Será validado se o componente tem uma label com o texto "Filtrar por gênero"', () => {
    const { getAllByTestId } = searchBar();
    const selectInputLabel = getAllByTestId('select-input-label');
    expect(selectInputLabel).toHaveLength(1);
    expect(selectInputLabel[0]).toHaveTextContent('Filtrar por gênero');
  });

  it('Será validado se a prop `selectedGenre` é passada como valor do select', () => {
    const { getByTestId } = searchBar();
    const selectInput = getByTestId('select-input');

    expect(selectInput).toHaveValue(props.selectedGenre);
  });

  it('Será validado se a prop `onSelectedGenreChange` é passada para o atributo `onChange` do select', () => {
    const { getByTestId } = searchBar();
    const selectInput = getByTestId('select-input');
    event.selectOptions(selectInput, 'comedy');

    expect(props.onSelectedGenreChange).toHaveBeenCalledTimes(1);
  });

  it("Será validado se são renderizadas 4 options dentro do select com os textos e valores, respectivamente: Todos e '', Ação e action, Comédia e comedy, Suspense e thriller", () => {
    const genreOptions = [
      { text: 'Todos', value: '' },
      { text: 'Ação', value: 'action' },
      { text: 'Comédia', value: 'comedy' },
      { text: 'Suspense', value: 'thriller' },
    ];
    const { getAllByTestId } = searchBar();
    const selectOptions = getAllByTestId('select-option');

    expect(selectOptions).toHaveLength(4);
    selectOptions.forEach((option, index) => {
      expect(option).toHaveTextContent(genreOptions[index].text);
      expect(option).toHaveValue(genreOptions[index].value);
    });
  });
});
