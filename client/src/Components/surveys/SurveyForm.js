import React,{Component} from 'react';
import {reduxForm,Field} from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash'; 
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
export const formFields = [{label:'Survey Title',name:'title'},{label:'Email Subject',name:'subject'},{label:'Email Body',name:'body'},{label:'Recipient List',name:'recipients'}]
 
class SurveyForm extends Component{
    // constructor(props){
    //     super(props)
    // }
   

    renderFields(){
      
    
           return _.map(formFields,({label,name})=>{
               return <Field type="text" key={name} label={label} name={name} component={SurveyField}/>
           })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.changeState)}>
                {this.renderFields()}
              <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                <button className="btn waves-effect waves-light right" type="submit" name="action">Next
                 <i className="material-icons right">done</i>
                </button>
                </form>
            </div>    
        )
    }
}

function validate(values){
    const errors = {};
    errors.recipients = validateEmails(values.recipients||'');
    _.each(formFields,({name})=>{
        if(!values[name]){
            errors[name]=`You must provide a ${name}`
        }
    })
    return errors;
}

export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount :false
})(SurveyForm);   