import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.body.type === 'postMessage') {
      return (
        <div className="message">
          <span className="username">{this.props.body.username}</span>
          <span className="content">{this.props.body.content}</span>
        </div>
      );
    } else if (this.props.body.type === 'postNotification') {
      return (
        <div className="message system">
          {this.props.body.oldUsername} changed their name to {this.props.body.newUsername}
        </div>
      )
    }
  }
}
export default Message;



// <div className="message system">
//   Anonymous1 changed their name to nomnom.
// </div>
