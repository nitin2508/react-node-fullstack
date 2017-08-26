import React,{Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../action/index';

class Payments extends Component{
    render(){
        return(<StripeCheckout amount={50000} 
        name="Emaily"
        description="500 for 5 email credits"
        token={(token)=>this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        currency={'INR'}
        >
        <button className="btn">Add Credits</button>
        </StripeCheckout>)
    }
}

export default connect (null, actions)(Payments);