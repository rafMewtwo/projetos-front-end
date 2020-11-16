import React from 'react';
import * as api from '../services/api';
import { Link } from 'react-router-dom';
import { isElementOfType } from 'react-dom/test-utils';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: '',
      thumbnail: '',
      attributes: '',
      loading: true,
      id: props.id,
      quantity: 1,
      email: '',
      comment: '',
    }

    this.detailedProduct = this.detailedProduct.bind(this);
    this.lessProduct = this.lessProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.formProduct = this.formProduct.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.divReview = this.divReview.bind(this);
  }

  async componentDidMount() {
    const { productId, category, title } = this.props.match.params;
    const productFromId = await api.getProductsFromId(productId);
    const productList = await api.getProductsFromCategoryAndQuery(category, title);
    const productFilter = productList.results.filter(product => product.id === productId)[0];
    const product = productFilter ? productFilter : productFromId;
    const { price, thumbnail, attributes } = product;
    this.setState({
      title: product.title,
      price,
      thumbnail,
      attributes,
      loading: false,
    });
    if(!localStorage.getItem('cart')) {
      localStorage.setItem('cart', '');
    }
  }

  lessProduct() {
    const { quantity } = this.state;
    if(quantity > 1){
      const newQuantity = quantity - 1;
      this.setState({
        quantity: newQuantity,
      });
    } 
  }

  addProduct() {
    const { quantity } = this.state;
    const newQuantity = quantity + 1;
    this.setState({
      quantity: newQuantity,
    });
  }

  addToCart() {
    if (!localStorage.getItem('cart')) {
      const array = [];
      const obj = {
        title: this.state.title,
        quantity: this.state.quantity,
        price: this.state.price,
      };
      array.push(obj);
      // localStorage.clear();
      localStorage.setItem('cart', JSON.stringify(array));
    } else { 
      const save =  JSON.parse(localStorage.getItem('cart'));
      const obj = {
        title: this.state.title,
        quantity: this.state.quantity,
        price: this.state.price,
      };
      save.push(obj);
      // localStorage.clear();
      localStorage.setItem('cart', JSON.stringify(save));
   }
  }

  formProduct() {
    return(
      <form>
        <input type="text" onChange={this.handleChangeEmail} />
        <textarea data-testid="product-detail-evaluation" onChange={this.handleChangeText}></textarea>
        <button onClick={this.saveForm}>Avaliar</button>
      </form>
    );
  }

  divReview() {
    const { title } = this.state;
    if(localStorage.getItem(title)) {
      const reviewArray = JSON.parse(localStorage.getItem(title));
      return(
        <div>
        {
          reviewArray.map((review) => <div><h3>email {review.email}</h3><p>comentario : {review.comment}</p></div>)
        }
        </div>
      );
    } else {
      return (<div>
        <p>Produto sem comentarios.</p>
      </div>
      );
    }
  }

  saveForm() {
    const { title, email, comment } = this.state;
    if(!localStorage.getItem(title)) {
      const array = [];
      if(email) {
      const obj = {
        email,
        comment,
      };
      array.push(obj);
      localStorage.setItem(title, JSON.stringify(array));
        } else {
          
        } 
    } else {
      if(email) {
      const save =  JSON.parse(localStorage.getItem(title));
      const obj = {
        email,
        comment,
      };
      save.push(obj);
      localStorage.setItem(title, JSON.stringify(save));
      // event.preventDefault();
      } else {
        alert('Digite um email')
      } 
    }
  }
  
  handleChangeEmail(event) {
    const email = event.target.value;
    this.setState({
      email,
    });
  }

  handleChangeText(event) {
    const comment = event.target.value;
    this.setState({
      comment,
    });
  }

  detailedProduct() {
    const { title, price, thumbnail, attributes, quantity } = this.state;
    return (
      <div data-testid="product-detail-link">
        <div data-testid="product-detail-name">{title}</div>
        <div>{price}</div>
        <img src={thumbnail} alt={`${title}`} />
        {
          attributes.map(({ name, value_name, id }) => {
            return (<p key={`${id}`}>{`${name}: ${value_name}`}</p>);
          })
        }
        <div className="add-cart-button">
          <span>Quantidade</span>
          <button className="less-product" onClick={this.lessProduct}>-</button>
          <span>{quantity}</span>
          <button className="plus-product" onClick={this.addProduct}>+</button>
          <Link to={`/cart/`} data-testid="product-detail-add-to-cart" onClick={this.addToCart}>Add ao carrinho</Link>
        </div>
        <this.formProduct />
        <this.divReview />
      </div>
    )
  }

  render() {
    const { loading } = this.state
    return (
      loading
        ? <p>Carregando...</p>
        : <this.detailedProduct />
    )
  }
}
