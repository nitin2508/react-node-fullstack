const express = require('express');
const app = express();

app.get('/',(req,res)=>{
  res.send({hi:'Buddy'})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log('Magic happen on 3000');
})
