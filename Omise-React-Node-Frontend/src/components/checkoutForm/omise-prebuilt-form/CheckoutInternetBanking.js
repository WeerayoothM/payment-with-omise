import React, { Component } from "react";

import Script from 'react-load-script'
import { publicKey } from "../../../confidential/keys"

import "./Checkout.css";

let OmiseCard;
export class CheckoutInternetBanking extends Component {

  handleLoadScript = () => {
    OmiseCard = window.OmiseCard
    OmiseCard.configure({
      publicKey: publicKey,
      currency: 'thb',
      frameLabel: 'CodeCamp Shop',
      submitLabel: 'PAY NOW',
    })
  }

  internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'internet_banking',
      otherPaymentMethods: ['bill_payment_tesco_lotus', 'alipay', 'pay_easy', 'net_banking', 'convenience_store']
    });
    OmiseCard.configureButton('#internet-banking');
    OmiseCard.attach()
  }

  omiseCardHandler = () => {
    const { cart, createInternetBankingCharge } = this.props
    OmiseCard.open({
      amount: cart.amount,
      submitFormTarget: '#checkout-form',
      onCreateTokenSuccess: (token) => {
        console.log(token)
        createInternetBankingCharge(cart.email, cart.name, cart.amount, token)
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    })
  }
  handleClick = (e) => {
    e.preventDefault();
    this.internetBankingConfigure()
    this.omiseCardHandler()
  }

  render() {
    return (
      <div className="own-form">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleLoadScript}
        />
        <form >

          <button disabled={this.props.cart.amount === 0} id='internet-banking' className="btn internet-banking" type="button" onClick={this.handleClick}>
            Pay with Internet Banking / Others
            </button>

        </form>

      </div>
    );
  }
}

export default CheckoutInternetBanking;
