import React from 'react';
import {connect} from 'react-redux';
import {formFields} from './SurveyForm';
import * as actions from '../../action';
import { withRouter} from 'react-router-dom';

const SurveyFormReview = ({changeState,formValues,submitSurvey,history})=>{
    return(
        <div>
            <h5>Please confirm your entries</h5>
            {fieldPreviewHtml(formValues)}
            <button className="yellow darken-3 white-text btn-flat" onClick={()=>changeState()}>Back</button>
            <button className="green white-text right btn-flat" onClick={()=>submitSurvey(formValues,history)}>Send Survey <i className="material-icons right">email</i></button>
        </div>
    );

}

const fieldPreviewHtml = (formValues)=>{
    
    return formFields.map((field)=>{
        return(<div key={field.name}><label>{field.label}</label><p>{formValues[field.name]}</p></div>)
    })
}

function mapStateToProps(state){
       return{ formValues:state.form.surveyForm.values}

}


export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));