import React, {Component} from 'react';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';
import App from './App.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="message-system">
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
