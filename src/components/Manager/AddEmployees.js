import React, { Component } from 'react';
import { connect } from 'react-redux';
import securityLevel from '../../constants/securityLevel';
import FullList from './FullList';
import { Button, withStyles, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#00868b',
    },
  }
});

const styles = () => ({
  outFrame: {
    margin: '10px 5px',
  },
  cardFrame: {
    border: '1px solid #00868b',
    borderRadius: '20px',
    margin: '0 auto',
    maxWidth: '710px',
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '20px',
    margin: '10px 0 10px 0',
  },
  subBackground: {
    backgroundColor: 'white',
    borderRadius: '19px',
    padding: '10px',
  },
  textField: {
    width: '100%',
    borderRadius: '10px',
    padding: '10px',
    height: '100px',
    boxSizing: 'border-box',
    outline: '0',
    border: '1px solid #00868b',
    resize: 'none',
  },
  subTitle: {
    color: 'grey',
    marginLeft: '10px',
    fontSize: '13px',
  },
  buttonDiv: {
    textAlign: 'right',
    marginTop: '5px',
  },
  button: {
    borderRadius: '13px',
  },
});

class AddEmployees extends Component {
  state = {
    emailList: [],
    dialogOpen: false,
  }

  // Button Click
  sendInvitationEmails = async () => {
    // If box has content, send
    if (this.state.emailList.length > 0) {
      let splitList = this.state.emailList.split('\n'); // creates comma separate array  

      await this.props.dispatch({ type: 'ADD_EMPLOYEES', payload: { emailList: splitList } });  // Adds Employee Emails to the DB
      this.setState({ emailList: [] });
    } else { // alert that content is needed
      this.setState({ dialogOpen: true });
    }
  }

  // Collect the data entered into the box
  handleChange = (event) => {
    this.setState({ emailList: event.target.value });
  }

  handleCancel = () => {
    this.setState({ dialogOpen: false });
  }

  componentDidMount = () => {
    if (this.props.user.security_level === securityLevel.EMPLOYEE_ROLE) {
      this.props.history.push('/main');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.outFrame}>
          <div className={classes.cardFrame}>
            <p className={classes.title}>Invite Members</p>
            <div className={classes.subBackground}>
              <p className={classes.subTitle}>Enter of paste email addresses here</p>
              <textarea
                value={this.state.emailList}
                onChange={this.handleChange}
                className={classes.textField}
                placeholder='No Commas'
              ></textarea>
              {/* OnClick rather than submit, to allow enter for new line */}
              <div className={classes.buttonDiv}>
                <Button
                  onClick={this.sendInvitationEmails}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
        <FullList />
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <Typography component="p">Please add emails. 1 Per line. No Commas.</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleCancel}>Okay</Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(withStyles(styles)(AddEmployees));