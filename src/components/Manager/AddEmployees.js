// Add Employees input box

import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddEmployees extends Component {
  state = {
    emailList: []
  }

  // Button Click
  sendInvitationEmails = async () => {

    // If box has content, send
    if (this.state.emailList.length > 0) {
      let splitList = this.state.emailList.split('\n'); // creates comma separate array  

      await this.props.dispatch({ type: 'ADD_EMPLOYEES', payload: { emailList: splitList } });  // Adds Employee Emails to the DB

      // alert, sent
      alert('Invitations sent');

    } else { // else alert need content
      alert('Please add emails. 1 Per line. No Commas.');
    }

  }

  // Collect the data entered into the box
  handleChange = (event) => {
    this.setState({ emailList: event.target.value })
  }

  componentDidMount = () => {
    if (this.props.reduxState.user.security_level === 2) {
      this.props.history.push('/main');
    }
  }

  render() {

    return (
      <div>
        <h2>Add Employees</h2>
        <h3>1 email per line</h3>
        {/* Large Input Box */}
        <textarea
          value={this.state.emailList}
          onChange={this.handleChange}
          placeholder='No Commas'
        >
        </textarea>

        {/* OnClick rather than submit, to allow enter for new line */}
        <button onClick={this.sendInvitationEmails}>Send Invitations</button>

      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { reduxState };
}

export default connect(mapStateToProps)(AddEmployees);