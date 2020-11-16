import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testando o arquivo App.js', () => {
  it('Teste se home é renderizada ao carregar a app no caminho de /', () => {
    // pega o que precisa
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    // faz o teste
    expect(pathname).toBe('/');
  });
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { history } = renderWithRouter(<App />);
    // testar se estou na home
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    // testar se contem o que preciso
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
    const fav = screen.getByText(/Favorite Pokémons/i);
    expect(fav).toBeInTheDocument();
  });
  it('Teste se Home vai para About, ao clicar no link About', () => {
    // pega o que precisa
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    // interage com eles
    fireEvent.click(about);
    const { pathname } = history.location;
    // testa
    expect(pathname).toBe('/about');
  });
  it('Teste se Home vai para Favoritados, ao clicar no link favoritos', () => {
    // pega o que precisa
    const { history } = renderWithRouter(<App />);
    const fav = screen.getByText(/Favorite Pokémons/i);
    // interage com eles
    fireEvent.click(fav);
    const { pathname } = history.location;
    // testa
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a Home vai para a página Not Found', () => {
    // pega o que precisa
    const { history } = renderWithRouter(<App />);
    history.push('/qualquercoisa');
    const { pathname } = history.location;
    // testa
    expect(pathname).toBe('/qualquercoisa');
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('Teste se Home vai para Home ao clicar em Home', () => {
    // pega o que precisa
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    // interage com eles
    fireEvent.click(home);
    const { pathname } = history.location;
    // testa
    expect(pathname).toBe('/');
  });
});
