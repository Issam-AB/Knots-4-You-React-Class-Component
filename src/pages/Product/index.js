import React, { Component } from 'react'
import { connect } from 'react-redux';
import {  compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import * as CartAction from '../../store/modules/cart/actions';
import {
    Container,
    ColumnContainer,
    ProductInfo,
    Image,
    AddToCart
} from './styles'
import Footer from '../../components/Footer';


class Product extends Component {
    state = {
        product: []
    };
    componentDidMount() {
        const { id } = this.props.match.params 

        api.get(`products/${id}`)
        .then((product) => {
            this.setState({ product: product.data })
            //console.log(product.data)
        })
    };
    handleAddProduct = id => {
        const { addToCartRequest } = this.props;

        addToCartRequest(id);
    }
    render() {
        const { product } = this.state;
        const { amount } = this.props;

        return (
            <>
              <Container>
                <ColumnContainer>
                  <ProductInfo>
                    <div>
                       <h2>About the {product.title}</h2>
                       <p>{product.description}</p>
                    </div>

                    <div>
                        <strong>Fiber Content: </strong><p>{product.content}</p>
                        <strong>Approx. Length: </strong><p>{product.length}</p>
                        <strong>Diameter: </strong><p>{product.diameter}</p>
                        <strong>Ply: </strong><p>{product.ply}</p>
                        <strong>Dimensions: </strong><p>{product.dimension}</p>
                        <strong>Weight: </strong><p>{product.weight}</p>
                        <strong>Origin: </strong><p>{product.origin}</p>
                    </div>

                    <div>
                        <strong>Recommended Skill Level</strong>
                        <p>{product.level}</p>
                        <p>{product.commentlevel}</p>
                    </div>
                  </ProductInfo>
                  <Image src={product.image} alt={product.title} />

                  <AddToCart>
                    <h2>{product.title}</h2>
                    <p>€ {product.price}</p>

                    <button className="btn" type="button" onClick={()=> this.handleAddProduct(product.id)}>
                        <div>
                            <MdShoppingCart size={16} color="#FFF" />
                            {amount[product.id] || 0} 
                        </div>
                    </button>
                  </AddToCart>
                </ColumnContainer>
              </Container>
              <Footer />
            </>
        )
    }
}
//Convert 'State' onto props.
// To show the quantity of products the user. It will show in the small cart in 'home'.
const mapStateToProps = state => ({
    // amount = id of the product and quantity.
    amount: state.cart.reduce((amount,product) => {
        (amount[product.id] = product.amont);
        return amount;
    }, {}) // To initialize the amount as 'zero'.
});

// Convert 'action' into props.
const mapDispatchToProps = dispatch => 
    bindActionCreators(CartAction, dispatch);
// If you don't have 'StateToProps' or 'DispatchToProps', you have to pass 'null'.
// export default connect(null, mapDispatchToProps)(Home);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Product) ; 