import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from './Header';

describe('Verifica o componente <Header />', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('Será validado se existe o texto "Movie Cards Library" dentro do heading ', () => {
    const { getByRole } = render(<Header />);
    const header = getByRole('heading');

    expect(header).toHaveTextContent('Movie Cards Library');
  });
});
