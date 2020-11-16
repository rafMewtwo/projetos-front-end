import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShoppingCart.css';
import cart from '../img/cart.png';
import goHome from '../img/back.png';
import empytCart from '../img/empty-cart.png';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      productList: [],
    }

    this.buildCartFromStorage = this.buildCartFromStorage.bind(this);
    this.lessProduct = this.lessProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  buildCartFromStorage() {
    if (localStorage.getItem('cart')) {
      const save = JSON.parse(localStorage.getItem('cart'));
      this.setState({ products: save });
    }
  }

  componentDidMount() {
    this.buildCartFromStorage()
    if (localStorage.getItem('cart')) {
      const productList = JSON.parse(localStorage.getItem('cart'));
      this.setState({
        productList,
      })
    }
  }

  addProduct(productTitle, addQuantity) {
    const productListOnAdd = JSON.parse(localStorage.getItem('cart'));
    const indexProduct = productListOnAdd.findIndex(item => item.title === productTitle);
    productListOnAdd[indexProduct].quantity = addQuantity + 1;
    this.setState(() => ({ productList: productListOnAdd }));
    this.updateLocalStorage(productListOnAdd);
  }


  lessProduct(productTitle, decreaseQuantity) {
    const value = decreaseQuantity < 1
      ? 1
      : decreaseQuantity;
    const productListOnAdd = JSON.parse(localStorage.getItem('cart'));
    const indexProduct = productListOnAdd.findIndex(item => item.title === productTitle);
    productListOnAdd[indexProduct].quantity = value - 1;
    this.setState(() => ({ productList: productListOnAdd }));
    this.updateLocalStorage(productListOnAdd);
  }

  updateLocalStorage(productList) {
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(productList));
  }

  headerMount() {
    return (
      <div>
        <div className="icon-box">
          <Link to="/"><img src={goHome} alt="imagem voltar para home" /></Link>
          <Link to="/cart"><img src={cart} alt="imagem do carrinho" data-testid="shopping-cart-button" /><span>Carrinho de Compras</span></Link>
        </div>
      </div>
    );
  }

  render() {
    if (!localStorage.getItem('cart')) {
      return (
        <Fragment>
          <this.headerMount />
          <div className="empty-cart">
            <img src={empytCart} alt="carrinho vazio" />
            <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
          </div>
        </Fragment>
      );
    } else {
      return (
        <div className="product-on-cart">
          <this.headerMount />
          {
            this.state.productList.map((product, index) =>
              <div key={index}>
                <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
                <h5 data-testid="shopping-cart-product-quantity">{product.quantity}</h5>
                <div className="add-cart-button">
                  <span>Quantidade</span>
                  <button data-testid="product-decrease-quantity" className="less-product" onClick={() => this.lessProduct(product.title, product.quantity)}>-</button>
                  <span>{product.quantity}</span>
                  <button data-testid="product-increase-quantity" className="plus-product" onClick={() => this.addProduct(product.title, product.quantity)}>+</button>
                </div>
              </div>
            )
          }
        </div>
      );
    }
  }
}

export default ShoppingCart;
