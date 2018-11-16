import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import adminMainSaga from './adminMainSaga';

import addEmployeeSaga from './addEmployeeSaga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so the app can use them.
// This is imported in index.js as rootSaga

// manny start
import adminOrgSaga from './adminOrgSaga';
import userMainSaga from './userMainSaga';
// manny end
//daniel start
import addNewOrgSaga from './addNewOrgSaga';
import surveySaga from './surveySaga';
import participationSaga from './participationSaga';
import behaviorSaga from './behaviorSaga';
//daniel end

export default function* rootSaga() {
    yield all([
        adminOrgSaga(),
        loginSaga(),
        registrationSaga(),
        userSaga(),
        adminMainSaga(),
        userMainSaga(),
        addEmployeeSaga(),
        addNewOrgSaga(),
        surveySaga(),
        participationSaga(),
        behaviorSaga(),
    ]);
}
