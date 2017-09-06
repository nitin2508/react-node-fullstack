import axios from 'axios';
import { FETCH_USER } from './types.js';

// export const fetchUser = () => 
//      function (dispatch) {
//         axios.get('/api/current_user')
//         .then((res)=>{
//             return dispatch({type:FETCH_USER,payload:res})
//         })
//     }
//"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

    export const fetchUser = () => async dispatch => {
       const res = await axios.get('/api/current_user')
           dispatch({type:FETCH_USER,payload:res.data});
   }

   export const handleToken = (token)=> async dispatch=>{
        const res = await axios.post('/api/stripe',token);
        dispatch({type:FETCH_USER,payload:res.data});
   }

   export const submitSurvey = (values,history)=>async dispatch=>{
    console.log(values)
          const res = await axios.post('/api/surveys',values);
          history.push('/surveys');
         dispatch({type:FETCH_USER,payload:res.data});  
   }

//    export const submitSurvey = (values)=> {
//        console.log(values)
//      const res = await axios.post('/api/surveys',values);
//      dispatch({type:FETCH_USER,payload:res.data});  
//    }
