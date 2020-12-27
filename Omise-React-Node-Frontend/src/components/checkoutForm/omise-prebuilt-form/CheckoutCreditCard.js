import React, { Component } from "react";
import Script from 'react-load-script'

import "./Checkout.css";

let OmiseCard;
export class Checkout extends Component {

  handleLoadScript = () => {
    OmiseCard = window.OmiseCard
    OmiseCard.configure({
      publicKey: 'pkey_test_5mcb184lc0u717vewg9',
      currency: 'thb',
      frameLabel: 'CodeCamp Shop',
      submitLabel: 'PAY NOW',
    })
  }

  creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: []
    });
    OmiseCard.configureButton('#credit-card');
    OmiseCard.attach()
  }

  omiseCardHandler = () => {
    const { cart, createCreditCardCharge } = this.props
    OmiseCard.open({
      amount: cart.amount,
      submitFormTarget: '#checkout-form',
      onCreateTokenSuccess: (token) => {
        createCreditCardCharge(cart.email, cart.name, cart.amount, token)
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    })
  }
  handleClick = (e) => {
    e.preventDefault();
    this.creditCardConfigure()
    this.omiseCardHandler()
  }


  render() {
    return (
      <>
        <div className="own-form">
          <Script
            url="https://cdn.omise.co/omise.js"
            onLoad={this.handleLoadScript}
          />
          <form >

            <button disabled={this.props.cart.amount === 0} id='credit-card' className="btn" type="button" onClick={this.handleClick}>
              Pay with Credit Card
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Checkout;
