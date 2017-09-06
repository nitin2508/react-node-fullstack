const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin.js');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const Path = require('path-parser');
const {
    URL
} = require('url');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/:surveyId/:choice',(req, res) => {
        res.send('Thanks for voting');
    })

    app.get('/api/surveys',requireLogin,async (req,res)=>{
       const surveys = await Survey.find({_user:req.user.id}).select({recipients:false});
       res.send(surveys);   
    })
    // app.post('/api/surveys/webhooks',(req,res)=>{
    //     const p = new Path('/api/surveys/:surveyId/:choice');
    //    const events = _.map(req.body,({email,url })=>{ 
    //        const match = p.test(new URL(url).pathname);
    //        if(match){
    //            return {email,surveyId:match.surveyId,choice:match.choice};
    //        }
    //    });
    //    const compactEvents = _.compact(events);
    //    const uniqueEvents = _.uniqBy(compactEvents,'email','surveyId');
    //    console.log(uniqueEvents);
    //    res.send({})
    // })

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log(req.body);
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map(req.body, ({ email,url}) => {
                console.log("NITIN")
                const match = p.test(new URL(url).pathname);
                console.log(match);
                if (match) {
                    return {
                        email, surveyId: match.surveyId,choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({surveyId,email,choice})=>{
                console.log(surveyId);
                console.log(email);
                Survey.findOne({
                    _id:surveyId,
                    recipients:{
                        $elemMatch:{email:email,responded:false}
                    }
                },{
                    $inc:{[choice]:1},
                    $set:{'recipients.$.responded':true},
                    lastResponded:new Date()

                }).exec()
            })
            .value();
        res.send({})
    })

    app.post('/api/surveys', requireLogin, requireCredits, async(req, res) => {

        const {
            title,
            subject,
            body,
            recipients
        } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map((email) => ({
                email
            })),
            _user: req.user.id,
            dateSent: Date.now()
        });


        try {
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    });

}