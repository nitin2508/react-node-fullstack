import {combineReducers} from 'redux';
import authReducer from './authReducer';
import {reducer as reduxForm} from 'redux-form';
import surveyReducer from './surveyReducers';

export default combineReducers({
    auth:authReducer,
    form:reduxForm,
    surveys:surveyReducer
})