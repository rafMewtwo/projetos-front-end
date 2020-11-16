import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class ProductList extends Component {
  noProducts() {
    return <div>Nenhum produto foi encontrado</div>;
  }

  render() {
    const { products, emptyList } = this.props;

    return (
      <div>
        { 
          emptyList
            ? this.noProducts()
            : products.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })
        }
      </div>
    );
  }
}
