import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    // recupera os elementos que vamos testar
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const { pathname } = history.location;
    const aboutInfo = screen.getByText(/This application simulates a Pokédex/i);
    // interage com eles
    // faz os testes
    expect(pathname).toBe('/about');
    expect(aboutInfo).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    // recupera os elementos
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    // const headerh2 = screen.getAllByRole('heading', { level: 2 });
    const headerh2 = container.querySelector('h2');
    expect(headerh2[1]).toHaveTextContent(/About Pokédex/i);
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // seleciona
    const { history, container } = renderWithRouter(<App />);
    history.push('/about');
    const paragraph = container.querySelectorAll('p');
    // testa
    const magicnumber = 2;
    expect(paragraph.length).toBe(magicnumber);
    expect(paragraph[0]).toHaveTextContent(/This application simulates a Pokédex/);
    expect(paragraph[1]).toHaveTextContent(/One can filter Pokémons by type/);
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
