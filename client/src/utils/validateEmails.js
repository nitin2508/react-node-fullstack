const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default (emails)=>{

    var invalidEmails = emails
    .split(',')
    .map(email=>email.trim())
    .filter(email=>{
       return  !re.test(email);
    })

    if(invalidEmails.length){
        return `This email are invalid ${invalidEmails}`;
    }

    return ;


};