import React from 'react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import { screen, fireEvent } from '@testing-library/react';

describe('Testando o arquivo Pokedex.js', () => {
  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const { history } = renderWithRouter(<App />);
    // teste o nome do botão
    const button = screen.getByTestId(/next-pokemon/i);
    expect(button).toHaveTextContent(/Próximo pokémon/i);
    // teste se quando clica vai para o prox. pokemon
    const pikachu = screen.getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(button);
    const charmander = screen.getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
  })
})
