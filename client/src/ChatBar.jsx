import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
      let usernameValue = this.refs.usernameInputBox.value;
      let newMessageValue = this.refs.newMessageInputBox.value;

      if (usernameValue.length === 0) {
        usernameValue = "Anonymouse"
      }
      if (newMessageValue.length > 0) {
        this.props.newMessage(usernameValue, newMessageValue);
        this.refs.newMessageInputBox.value = "";
      }
      if (event.target.id == "new-message") {

      }
    }
  }

  render() {
    return (
      <div>
      <footer>
        <input
          id="username" ref="usernameInputBox"
          type="text"
          placeholder={this.props.currentUser.name}
        />
        <input
          id="new-message" ref="newMessageInputBox"
          type="text"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.handleSubmit}
          onClick={this.handleSubmit}
        />
      </footer>
      </div>
    );
  }
}
export default ChatBar;
