import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.postNewMessage = this.postNewMessage.bind(this)

    this.state = {
      currentUser: {name: ""},
      messages: []
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = (event) => {
      console.log('Connected to server')
      this.socket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data)
        const post = this.state.messages.concat(newMessage)
        this.setState({messages: post})
      }
    };
  }
  sendMessageToServer(messageObject) {
    this.socket.send(JSON.stringify(messageObject))
  }

  postNewMessage(name, content){
    const newMessage = {username: name, content: content}
    if (this.state.currentUser.name !== name) {
      this.state.currentUser.name = name
    }
    this.setState(this.state)
    // long form version of the above:
    // this.setState({currentUser: this.state.currentUser})

    this.sendMessageToServer(newMessage)
  }
  render() {
    console.log(this.state)
    console.log(this.state.messages)
    return (
      <div className="wrapper">
        <nav>
          <h1>A/S/L?</h1>
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
