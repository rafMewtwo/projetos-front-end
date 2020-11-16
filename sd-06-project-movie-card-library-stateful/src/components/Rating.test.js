import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Rating from './Rating';

describe('Verifica o componente <Rating />', () => {
  it('Será validado se o componente <Rating /> é renderizado com sucesso', () => {
    render(<Rating />);
  });

  it('Será validado se o componente renderiza o <Rating /> com o valor passado para ele via props `rating`', () => {
    const { getByTestId } = render(<Rating rating={3} />);
    const rating = getByTestId('rating');

    expect(rating).toHaveTextContent(3);
  });
});
