import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import {
  Container,
  ProductTable,
  Total,
  EmptyCart
} from './styles';
import * as CartActions from '../../store/modules/cart/actions';
import Footer from '../../components/Footer';

function Cart({ cart, removeFromCart, updateAmountRequest, total }) {

  // Adds more items from the selected product.
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  // Remove items from the selected product.
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <>
      <Container>

        {cart.length <= 0 &&
          <EmptyCart>
            <p>It appears that your cart is empty!</p>
            <button className="btn" type="button">
              <NavLink to="/shop">Continue Shopping</NavLink>
            </button>
          </EmptyCart>
        }

        {cart.map(product => (
          <>
            <ProductTable>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>QTD</th>
                  <th></th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>

                <tr key={product.id}>
                  <td className="image">
                    <img
                      src={product.image}
                      alt={product.title}
                    />
                  </td>
                  <td className="name-price">
                    <strong>{product.title}</strong>
                    <span>€ {product.price}</span>
                  </td>
                  <td className="add-remove">
                    <div>
                      <button type="button" onClick={() => decrement(product)} >
                        <MdRemoveCircleOutline size={20} color="#474547" />
                      </button>
                      <input type="number" readOnly value={product.amount} />
                      <button type="button" onClick={() => increment(product)} >
                        <MdAddCircleOutline size={20} color="#474547" />
                      </button>
                    </div>
                  </td>
                  <td className="subtotal">
                    <strong>€ {product.subtotal}</strong>
                  </td>
                  <td className="remove-from-cart">
                    <button type="button" onClick={() => removeFromCart(product.id)} >
                      <MdDelete size={20} color="#474547" />
                    </button>
                  </td>
                </tr>

              </tbody>
            </ProductTable>

            <footer>
              <button type="button">Finish your order</button>
              <Total>
                <span>TOTAL</span>
                <strong>€ {total}</strong>
              </Total>
            </footer>
          </>
        ))}

      </Container>
      <Footer />
    </>
  )
};

// Convert 'state' into props.
const mapStateToProps = state => ({
  // property "cart" will receive all the info from reducer "cart".
  // Perfect place to do the Subtotal and Total calculation.
  cart: state.cart.map(product => ({
    ...product,
    subtotal: (product.price * product.amount)
  })),
  total:
    // 'reduce' is used when you want to get an array and reduce into just one value.
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0), // Initialize as 'zero'.
});

// Convert 'actions' into props.
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(Cart);
