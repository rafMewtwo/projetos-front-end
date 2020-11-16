import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('Teste mensagem `No favorite pokemon found`, se for negativo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    const checkFavorite = screen.getByRole('checkbox');
    fireEvent.click(checkFavorite);
    // teste se clicou certo
    expect(checkFavorite.checked).toEqual(true);
    history.push('/favorites');
    const mewTest = screen.getByText(/Mew/i);
    expect(mewTest).toBeInTheDocument();
  });
  it('Teste se Não é exibido nenhum card de pokémon não favoritado.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    const checkFavorite = screen.getByRole('checkbox');
    const noPokemon = screen.getByTestId(/pokemon-name/i);
    // teste se n clicou
    expect(checkFavorite.checked).toEqual(false);
    history.push('/favorites');
    expect(noPokemon).not.toBeInTheDocument();
  });
});
