import React,{Component} from 'react';
import {BrowserRouter,Link, Route} from 'react-router-dom';
import Header from './Header';
import {connect} from 'react-redux';
import * as actions from '../action'
import Landing from './Landing'
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// const SurveyNew = ()=><h2>SurveyNew</h2>;
//const Landing = ()=><h2>Landing</h2>;

class App extends Component{

componentDidMount(){
    console.log(this.props);
    this.props.fetchUser();
}


render(){
    return (<div>

        <BrowserRouter>
          <div className="container">
          <Header/>
            <Route exact={true} path="/surveys" component={Dashboard}/>
            <Route exact={true} path="/" component={Landing}/>
            <Route exact path="/surveys/new" component={SurveyNew}/>
         </div>    
    </BrowserRouter>
    </div>)
    
}

}

function mapDispatchToProps(){

}

function mapStateToProps(){

}

export default connect(null,actions) (App);