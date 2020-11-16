import * as api from '../services/api';
import mockedCategoriesResult from '../__mocks__/categories';

describe('Implementar módulo de acesso à API do Mercado Livre', () => {
  it('Implementa a função `getCategories`', () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(mockedCategoriesResult),
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.getCategories().then((categories) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.mercadolibre.com/sites/MLB/categories',
      );
      expect(categories).toEqual(mockedCategoriesResult);
    });
  });

  it('Implementa a função `getProductsFromCategoryAndQuery`', () => {
    const categoryId = 'category1';
    const query = 'my-query';
    const successResponseBody = {};

    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(successResponseBody),
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.getProductsFromCategoryAndQuery(categoryId, query).then((products) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(products).toEqual(successResponseBody);
    });
  });
});
