import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import api from '../../services/api';
import { Container, Products, Item } from './styles';
import Footer from '../../components/Footer'

class Shop extends Component {
    state ={
        products: []
    };
    async componentDidMount(){
        const response = await api.get('products');
        const data = response.data.map(product => ({
            ...product
        }))
        this.setState({ products: data });
    }

    render() {
        
        const { products } = this.state;

        return (
            <>
            <Container>
                <Products>
                    {products.map(product => (
                    <NavLink key={product.id} to={`product/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                        <Item>
                            <img src={product.image} alt={product.title} />
                            <p>{product.title}</p>
                            <small>€ {product.price}</small>
                        </Item>
                    </NavLink>
                    ))}
                    </Products>
                </Container> 
            <Footer />
            </>
        )
    }
}
export default Shop ;
