import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        {this.props.data.map((messageData, index) => {
          return <Message
            key={index}
            body={messageData}/>
        })
        }
    </div>
    );
  }
}
export default MessageList;
