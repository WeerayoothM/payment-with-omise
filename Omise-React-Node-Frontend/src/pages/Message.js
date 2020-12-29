import React, { Component } from "react";
import axios from 'axios'
import MessageDetails from "../components/modal/MessageDetails";
import Spinner from "../components/spinner/Spinner";

export class Message extends Component {
  state = {
    loading: false,
    openModal: false,
    charge: undefined
  };

  async componentDidMount() {
    this.setState({ loading: true })
    setTimeout(async () => {
      const response = await axios.get('http://ab903acad63c.ngrok.io/bank-charges')
      console.log(response)
      if (response.data) {
        this.setState({ loading: false, charge: response.data, openModal: true })
      }
    }, 4000)
  }

  handleCloseModal = () => {
    this.setState({ openModal: false });
    this.props.history.push("/");
  };

  render() {
    const { loading, openModal, charge } = this.state;
    return (
      <React.Fragment>
        {loading && <Spinner />}
        {openModal && (
          <MessageDetails charge={charge} closeModal={this.handleCloseModal} />
        )}
      </React.Fragment>
    );
  }
}

export default Message;
