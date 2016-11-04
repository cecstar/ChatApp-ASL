import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.postNewMessage = this.postNewMessage.bind(this)

    this.state = {
      userCount: 0,
      currentUser: {name: 'Anonymouse'},
      messages: []
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = (event) => {
      console.log('Connected to server')
      this.socket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data)
        switch (newMessage.type) {
          case "postMessage":
          case "postNotification":
            const post = this.state.messages.concat(newMessage)
            this.setState({messages: post})
            break;
          case "userCount":
            this.setState({userCount: newMessage.usersOnline})
            break;
        }
      }
    };
  }
  sendMessageToServer(messageObject) {
    this.socket.send(JSON.stringify(messageObject))
  }

  postNewMessage(name, content) {
    if (this.state.currentUser.name !== name) {
      this.postNewNotification(name)
      this.state.currentUser.name = name
      this.setState({currentUser: this.state.currentUser})
    }
    const newMessage = {
      type: 'postMessage',
      username: name,
      content: content
    }
    this.sendMessageToServer(newMessage)
  }

  postNewNotification(newUsername) {
    const newMessage = {
      type: 'postNotification',
      oldUsername: this.state.currentUser.name,
      newUsername: newUsername
    }
    this.sendMessageToServer(newMessage)
  }

  render() {
    console.log(this.state)
    console.log(this.state.messages)
    return (
      <div className="wrapper">
        <nav>
          <h1>A/S/L?</h1>
          <h6>Users Online {this.state.userCount}</h6>
        </nav>
        <div id="message-list">
          <MessageList data={this.state.messages}/>
        </div>
      <ChatBar currentUser={this.state.currentUser} newMessage={this.postNewMessage}/>
    </div>
    );
  }
}

export default App;
