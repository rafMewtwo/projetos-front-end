export async function getCategories() {
  const api = 'https://api.mercadolibre.com/';
  const endpoint = 'sites/MLB/categories';
  const requestURL = `${api}${endpoint}`;

  const categoriesPromise = await fetch(requestURL);
  return categoriesPromise.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const api = 'https://api.mercadolibre.com/';
  const endpoint = `sites/MLB/search?category=${categoryId}&q=${query}`;
  const requestURL = `${api}${endpoint}`;

  const queryPromise = await fetch(requestURL);
  return queryPromise.json();
}

export async function getProductsFromId(productId) {
  const api = 'https://api.mercadolibre.com/';
  const endpoint = `items/${productId}`;

  const fromIdPromise = await fetch(`${api}${endpoint}`);
  return fromIdPromise.json();
}
