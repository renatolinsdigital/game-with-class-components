import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { messagesUpdate } from "../store/actions";
import { NO_MESSAGES } from "../store/actionTypes";

class GameMessages extends Component {
  componentDidMount() {
    this.props.messagesUpdate(NO_MESSAGES);
  }

  render() {
    const { messages } = this.props.messages;
    return (
      <>
        {messages?.map((message, index) => <p key={index} className='message-entry'>{message}</p>)}
      </>
    );
  }
}

GameMessages.prototypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps, { messagesUpdate })(GameMessages);
