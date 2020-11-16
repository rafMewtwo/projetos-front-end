import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testando o arquivo NotFound.js', () => {
  it('Teste se tem h2 com o texto Page requested not found', () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('/notfound');
    const title = container.querySelector('h2');
    expect(title).toHaveTextContent(/Page requested not found/i);
  });
  it('Teste se página mostra uma imagem', () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('/notfound');
    const imagemNotFound = container.querySelector('img');
    expect(imagemNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
