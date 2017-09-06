//it show survey form and surm form previewm

import React,{Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurvewFormReview';
import {reduxForm} from 'redux-form';

class SurveyNew extends Component{
    constructor(props){
        super(props);
        this.state= {showFormReview:false};
        this.changeState = this.changeState.bind(this);
    }

    changeState(){
        this.setState({showFormReview:!this.state.showFormReview});
    }

    render(){
        return(
            <div>
           {this.state.showFormReview? <SurveyReview changeState={this.changeState} /> :<SurveyForm changeState={this.changeState}/> }   
            
            </div>    
        )
    }
}

export default reduxForm({
    form:'surveyForm'
}) (SurveyNew);   