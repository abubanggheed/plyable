// Scope: Organization Page (for user)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import securityLevel from '../../constants/securityLevel';

const styles = theme => ({
    title: {
        marginLeft: '15px',
        color: 'rgba(82, 132, 196, 1)'
    },
    // WIP
    info: {
        marginLeft: '15px',
        color: 'black'
    },

    chartFrame: {
        width: '100vw',
        textAlign: 'center'
    },
    selectBox: {
        width: '80%',
        height: '50px',
        fontSize: '20px',
        backgroundColor: 'rgba(82, 132, 196, 0.6)',
        color: 'white',
        textAlign: 'center',
        textAlignLast: 'center',
    },
});


class UserMain extends Component {
    componentDidMount = () => {
        if (this.props.user.security_level === securityLevel.ADMIN_ROLE) {
            this.props.history.push('/adminmain');
        } else {
            if (this.props.user.survey_week < 0) {
                this.props.history.push('/survey');
            } else {
                this.props.dispatch({ type: 'FETCH_BEHAVIORS' });
                this.props.dispatch({ type: 'USER_ORG_CHART', payload: { behaviorId: 0 } });
            }
        }
    }

    handleChangeBehavior = event => {
        this.props.dispatch({ type: 'USER_ORG_CHART', payload: { behaviorId: event.target.value } });
    }

    // Messages to user based on 1) completed survey for the week 2) won't see data until next week
    renderMessage = () => {
        if (this.props.user.survey_week == 0) {
            return <h4>You will not see data in the graphs until next week.</h4>
        }
        else if (this.props.user.survey_week >= 0) {
            return <h4>You have completed your survey for this week.</h4>
        }

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h2 className={classes.title}>User Main</h2>

    
                <div className={classes.info}>
                    {this.renderMessage()}
                    <h4>Note: Organization data will only be shown if 60% or more employees have responded.</h4>
                </div>

                <div className={classes.chartFrame}>
                    <select
                        onChange={this.handleChangeBehavior}
                        className={classes.selectBox}
                    >
                        {this.props.behaviors.map(behavior => <option key={behavior.id} value={behavior.id}>{behavior.value}</option>)}
                    </select>
                    <canvas id="userViewChart"></canvas>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user, behaviorReducer }) => ({
    user,
    behaviors: behaviorReducer.behaviors,
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(UserMain)));