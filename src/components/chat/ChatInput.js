import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SendIcon from '@material-ui/icons/Send';
import { InputGroup, Form } from 'react-bootstrap';

class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
  state = {
    message: '',
  }

  render() {
    return (
      <form
        action="."
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
        }}
      >

        <InputGroup className="mr-md-5 mr-sm-2 mr-xl-5">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">  {this.props.name}</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            className="py-2  border-0"
            type="text"
            placeholder="Enter message..."
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })} />
          <span className="input-group-append">
            <button type="submit" className="btn btn-outline-secondary border-left-0 border"><SendIcon /></button>
          </span>
        </InputGroup>
      </form>
    )
  }
}

export default ChatInput