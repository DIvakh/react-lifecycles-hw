import React, { PureComponent } from 'react';
import '../message.css';

class Message extends PureComponent {
  render() {
    return (
      <div className='message'>
        <div className='message-container'>
          <p>{this.props.messageText}</p>
          <button onClick={this.props.hideMessage}>OK</button>
        </div>
      </div>
    );
  }
}

export default Message;
