import React, { Component, forwardRef } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import Popup from "reactjs-popup";

import api from '../../services/api';
import logo from '../../assets/logo.png';
import { Container, Cart, Links, LinksContainer, Routes } from './styles';
import BurgerIcon from '../../components/BurgerIcon';
import MobileMenu from '../../components/MobileMenu';

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};

const PopUpContainer = forwardRef((props, ref) => {
  return (
    <Popup
      modal
      overlayStyle={{ background: "#fce4ec" }}
      contentStyle={contentStyle}
      closeOnDocumentClick={false}
      trigger={open => <BurgerIcon open={open} />}
    >
      {close => <MobileMenu close={close} />}
    </Popup>
  )
});

class Header extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
    }));

    this.setState({ products: data })
  }

  render() {
    const { amount } = this.props;

    return (
      <Container>
        <PopUpContainer />

        <LinksContainer>
          <NavLink to="/">
            <img src={logo} alt="knots-4-you" />
          </NavLink>
          <Links>
            <Routes to="/shop">Shop</Routes>
            <Routes to="/about" >About</Routes>
            <Routes to="/contact" >Contact</Routes>
          </Links>
        </LinksContainer>

        <Cart to="/cart">
          <div>
            <strong>My cart</strong>
            <span>items</span>
          </div>
          <div className="cart">
            <MdShoppingBasket size={36} color="#474547" />
            <p>{amount || 0}</p>
          </div>
        </Cart>
      </Container>
    )
  }
};

// Convert 'state' into props.
// To show the quantity of products the user has. It will show in the small cart in 'home'.
const mapStateToProps = state => ({
  // amount = id of the product and the quantity.
  amount: state.cart.length,
});

export default connect(mapStateToProps, null)(Header);
