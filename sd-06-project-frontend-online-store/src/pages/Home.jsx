import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import '../styles/Home.css';
import cart from '../img/cart.png';
import ProductList from '../components/ProductList';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      products: [],
      cartProducts: [],
      emptyList: true,
    };

    this.onSearchTextSubmit = this.onSearchTextSubmit.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.categoryApi = this.categoryApi.bind(this);
  }

  async componentDidMount() {
    const categoriesObjects = await api.getCategories();
    const categories = categoriesObjects.map(category => category);
    this.setState({ categories });
  }

  async onSearchTextSubmit(event) {
    event.preventDefault();
    const { value } = document.querySelector('#search-input');
    const resp = await api.getProductsFromCategoryAndQuery('', value);
    this.setState(() => (
      (resp)
        ? { products: resp.results, emptyList: false }
        : { products: [], emptyList: true }
    ));
  }

  getCategory(event) {
    const categoryId = event.target.value;
    this.categoryApi(categoryId);
  }

  async categoryApi(categoryId) {
    const products = await api.getProductsFromCategoryAndQuery(categoryId, '');
    this.setState({ products: products.results, emptyList: false });
  }

  render() {
    const { categories, products, emptyList } = this.state;

    return (
      <>
        <section>
          {
            categories.map(category => {
              return (
                <label htmlFor="category" key={category.name}>
                  <input
                    data-testid="category"
                    type="radio"
                    name="category"
                    value={category.id}
                    onClick={this.getCategory} />
                  { category.name}
                </label>
              );
            })
          }
        </section>
        <main>
          <div className="contain-main">
            <label htmlFor="search-input" data-testid="home-initial-message">
              <input
                id="search-input"
                type="text"
                name="search-text-field"
                data-testid="query-input"
              />
              Digite algum termo de pesquisa ou escolha uma categoria.
            </label>
            <button
              name="search"
              type="submit"
              data-testid="query-button"
              onClick={this.onSearchTextSubmit}
            >
              Search
            </button>
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
            >
              <img src={cart} alt="icone do carrinho" className="icon" />
            </Link>
            <ProductList
              products={products}
              emptyList={emptyList}
            />
          </div>
        </main>
      </>
    );
  }
}
