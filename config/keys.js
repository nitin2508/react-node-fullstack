
if(process.env.NODE_ENV ==='production'){
  //return production key
  module.exports = require('./prod');

}else{
  ///return dev key
  module.exports = require('./dev');
}
