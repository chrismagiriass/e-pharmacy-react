import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import './chat.css';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { InputGroup, Form } from 'react-bootstrap';




const URL = 'ws://localhost:3030'

class Chat extends Component {
  state = {
    name: this.props.username || '',
    messages: [],
    isOpen: false,
    ws: null,
    letsChat: this.props.username ? true : false,
    newMessage:0,
  }





  componentDidMount() {
    // let ws = new WebSocket(URL)

    // this.setState({
    //   ws: ws,
    // })
    this.props.ws.onopen = () => {
      console.log('connected')
    }

    this.props.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.props.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages],
      newMessage:this.state.newMessage++
     }))

  submitMessage = messageString => {
    const message = { name: this.state.name, message: messageString }
    this.props.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (

      <div class="container-fluid">

        <div class="row pt-3">
          <div className={this.state.isOpen ?'chat-main-shadow':'chat-main'} >
            {!this.state.isOpen ? <button className="btn btn-primary float-right" onClick={() => this.setState({ isOpen: !this.state.isOpen,
            newMessage:0 })} ><ModeCommentIcon></ModeCommentIcon>{this.state.newMessage>0?<span class="badge badge-light">{this.state.newMessage}</span>:''}</button> :

              <p className="chat-header" onClick={() => this.setState({ isOpen: !this.state.isOpen })} >
                <strong>Customer Support</strong> <em>{'How can we help you?'}</em>
              </p>
            }
            {this.state.isOpen ?
              <div>
                {this.state.messages.slice(0).reverse().map((message, index) => {
                  return <ChatMessage
                    key={index}
                    message={message.message}
                    name={message.name}
                  />
                })}

                {this.state.letsChat ? <ChatInput name={this.state.name}
                  ws={this.ws}
                  onSubmitMessage={messageString => this.submitMessage(messageString)}
                /> :
                  <>
                    <InputGroup className="mr-md-5 mr-sm-2 mr-xl-5">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend"> Name: </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        className="py-2  border-0"
                        type="text"
                        id={'name'}
                        placeholder={'Enter your name...'}
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })} />
                      <span className="input-group-append">
                        <button className="btn btn-secondary" onClick={() => this.setState({
                          letsChat: true,
                          name: this.state.name || 'Guest'
                        })}>Chat</button>
                      </span>
                    </InputGroup>
                  </>
                }

              </div> : ''}

          </div>
        </div>
      </div>
    )
  }
}

export default Chat