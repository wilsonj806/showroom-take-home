import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  componentDidMount = () => {
    this.props.resetMsgFn();
  }

  render = () => {
    if (this.props.msg == null) return null;
    const { msg } = this.props;
    const { status, msg: message } = msg;
    const className = status === 404 ? 'alert alert-danger'
      : status === 200 ? 'alert alert-success'
      : 'alert alert-info'
    return (msg !== null) ? (
      <div
        className={`mx-auto my-2 ${className}`}
        style={style}
      >
        {message}
      </div>
    ) : null
  }
}

const style = {
  width: '50vw',
  textAlign: 'center'
}

Message.propTypes = {
  msg: PropTypes.shape({
    status: PropTypes.number,
    msg: PropTypes.string
  })
}

export { Message }