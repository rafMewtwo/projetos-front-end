import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: false,
      productId: props.product.id,
      title: props.product.title,
      price: props.product.price,
      thumbnail: props.product.thumbnail,
      quantity: 1,
    }

    this.openDetails = this.openDetails.bind(this);
    this.plainProduct = this.plainProduct.bind(this);
    this.detailedProduct = this.detailedProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  
  addToCart() {
    const obj = {
      title: this.state.title,
      price: this.state.price,
      thumbnail: this.state.thumbnail,
      quantity: this.state.quantity,
    };

    if (!localStorage.getItem('cart')) {
      const array = [];
      array.push(obj);
      localStorage.clear();
      localStorage.setItem('cart', JSON.stringify(array));
    } else { 
      const save = JSON.parse(localStorage.getItem('cart'));
      save.push(obj);
      localStorage.clear();
      localStorage.setItem('cart', JSON.stringify(save));
    }
  }

  detailedProduct() {
    const { title, price, thumbnail, attributes, id } = this.props.product;
    const { quantity } = this.state;
    
    return (
      <div data-testid="product">
        <div data-testid="shopping-cart-product-name">{title}</div>
        <div>{price}</div>
        <img src={thumbnail} alt={title} />
        <div data-testid="shopping-cart-product-quantity">{quantity}</div>
        <Link to={`/productDetails/${id}`} data-testid="product-detail-link">DETALHES</Link>
        {
          attributes.map(({ name, value_name, id }) => {
            return (<p key={id}>{`${name}: ${value_name}`}</p>);
          })
        }
      </div >
    )
  }

  openDetails() {
    this.setState({ details: true });
  }

  plainProduct() {
    const { title, price, thumbnail, id, } = this.props.product;
    return (
      <div data-testid="product" onClick={this.openDetails}>
        <div>{title}</div>
        <div>{price}</div>
        <img src={thumbnail} alt={title} />
        <Link to={`/productDetails/${id}`} data-testid="product-detail-link" >DETALHES</Link>
      </div>
    )
  }

  render() {
    const { details } = this.state;
    
    return (
      details
        ? <>
            <this.detailedProduct />
            <button
              type="submit"
              data-testid="product-add-to-cart"
              onClick={ this.addToCart }
            >
              Adicionar ao Carrinho
            </button>
          </>
        : <>
            <this.plainProduct />
            <button
              type="submit"
              data-testid="product-add-to-cart"
              onClick={ this.addToCart }
            >
              Adicionar ao Carrinho
            </button>
          </>
    )
  }
}
