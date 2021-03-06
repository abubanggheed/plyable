const messagesReducer = (state = {
    addNewOrganizationSnackBar: false,
    surveyCompletedSnackBar: false,
    confirmDeactivateSnackBar: false,
    registrationCompletedSnackBar: false,
    loginError: false,
    loginMistype: false,
    loginInputError: false,
    deactivedOrganization: false,
    addedEmployees: false,
    addedManagers: false,
    surveySubmitted: false,
    sendingEmail: false,
    emailSuccess: false,
    emailError: false,
    emailRedundant: false,
    registerError: false,
}, action) => {
    //each component of state corresponds to a dialog that lives on app.js
    //on actions that trigger this reducer open or close one of these dialogs
    switch (action.type) {
        case 'ADD_NEW_ORGANIZATION_SNACKBAR':
            return {
                ...state,
                addNewOrganizationSnackBar: true,
            }
        case 'SURVEY_COMPLETED_SNACKBAR':
            return {
                ...state,
                surveyCompletedSnackBar: true,
            }
        case 'CONFIRM_DEACTIVATE_SNACKBAR':
            return {
                ...state,
                confirmDeactivateSnackBar: true,
            }
        case 'REGISTRATION_COMPLETED_SNACKBAR':
            return {
                ...state,
                registrationCompletedSnackBar: true,
            }
        case 'FINISH_EMAILS':
            return {
                ...state,
                sendingEmail: false,
                emailSuccess: true,
            }
        case 'LOGIN_MISTYPE':
            return {
                ...state,
                loginMistype: true,
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: true,
            }
        case 'LOGIN_INPUT_ERROR':
            return {
                ...state,
                loginInputError: true
            }
        case 'CLOSE_SNACKBAR':
            return {
                ...state,
                addNewOrganizationSnackBar: false,
                surveyCompletedSnackBar: false,
                confirmDeactivateSnackBar: false,
                registrationCompletedSnackBar: false,
                emailSuccess: false,
                loginError: false,
                loginMistype: false,
                loginInputError: false,
            }//this one action handles closing all snackbars

        case 'SENDING_EMAILS':
            return {
                ...state,
                sendingEmail: true,
            }

        case 'EMAIL_ERROR':
            return {
                ...state,
                sendingEmail: false,
                emailError: true,
            }

        case 'EMAIL_REDUNDANT':
            return {
                ...state,
                sendingEmail: false,
                emailRedundant: true,
            }
        case 'CONFIRM_EMAIL_ERROR':
            return {
                ...state,
                emailRedundant: false,
                emailError: false,
            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                registerError: true,
            }
        case 'CONFIRM_REGISTER_ERROR':
            return {
                ...state,
                registerError: false,
            }

        default:
            return state;
    }
};

export default messagesReducer;