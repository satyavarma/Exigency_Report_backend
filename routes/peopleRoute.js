var express = require('express');
var peopleRoute = express.Router();
var people = require('../models/people');

const bodyParser = require('body-parser');
peopleRoute.use(bodyParser.json());

const cors = require('./cors');


peopleRoute.route('/add')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req,res,next) => {
    console.log('/add');
    console.log(req.body.adharno);
    people.findOne({adharno:req.body.adharno})
    .then((person) => {
        console.log(person);
        if(person != null){
            console.log('!=null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'already added', success: false, error:null});
        }
        else{
            console.log('=null')
            people.create({
                name : req.body.name,
                adharno: req.body.adharno,
                mobileno: req.body.mobileno,
                emgcntno: req.body.emgcntno,
                born: req.body.born,
                gender: req.body.gender,
                height: req.body.height,
                weight: req.body.weight,
                physicallychallenged: req.body.physicallychallenged,
                bloodgroup: req.body.bloodgroup,
                skindiseases: req.body.skindiseases,
                bp: req.body.bp,
                sugar: req.body.sugar,
                asthma: req.body.asthma,
                heartproblems: req.body.heartproblems,
                surgeries: req.body.surgeries,
                hereditaryproblems: req.body.hereditaryproblems,
                cancers: req.body.cancers,
                aids: req.body.aids,
                senseorgansproblems: req.body.senseorgansproblems
            })
            .then((user) => {
                console.log('entering then ');
                res.statusCode = 200;
                res.setHeader('content-Type', 'apllication/json');
                res.json({info:'successfully added', success:true, user: user});
            })
        }
    }) 
    .catch((err) => {
        console.log('catch add');
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({status:'something went wrong, Review the data entered once', success: false, error:err});
    })
});

peopleRoute.route('/search')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req,res,next) => {
    console.log('/search');
    console.log(req.body.adharno);
    people.findOne({adharno:req.body.adharno})
    .then((person) =>{
        if(person != null){
            console.log('!=null');
            console.log(person);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'searched', success: true, error:null, person: person});
        }
        else{
            console.log('==null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var err = new Error('No Record Found');
            res.json({info:'No record found', success: false, error:err});
        }
    })
    .catch((err) => {
        console.log('catch search');
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'cannot search', success: false, error:err});
    })
});

peopleRoute.route('/update')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.put(cors.corsWithOptions, (req,res,next) => {
    console.log('/update');
    people.findOne({adharno:req.body.adharno})
    .then((person) =>{
        if(person != null){
            console.log('!=null');
            if(req.body.mobileno !== ""){
                person.mobileno = req.body.mobileno;
            }
            if(req.body.emgcntno !== ""){
                person.emgcntno = req.body.emgcntno;
            }
            if(req.body.height !== ""){
                person.height = req.body.height;
            }
            if(req.body.weight !== ""){
                person.weight = req.body.weight;
            }
            if(req.body.physicallychallenged !== ""){
                person.physicallychallenged = person.physicallychallenged+".  "+req.body.physicallychallenged;
            }
            if(req.body.skindiseases !== ""){
                person.skindiseases = person.skindiseases+".  "+req.body.skindiseases;
            }
            if(req.body.bp !== ""){
                person.bp = req.body.bp;
            }
            if(req.body.sugar !== ""){
                person.sugar = req.body.sugar;
            }
            if(req.body.asthma !== ""){
                person.asthma = req.body.asthma;
            }
            if(req.body.heartproblems !== ""){
                person.heartproblems = person.heartproblems+".  "+req.body.heartproblems;
            }
            if(req.body.surgeries !== ""){
                person.surgeries =  person.surgeries+".  "+req.body.surgeries;
            }
            if(req.body.hereditaryproblems !== ""){
                person.hereditaryproblems = person.hereditaryproblems + ".  " + req.body.hereditaryproblems;
            }
            if(req.body.cancers !== ""){
                person.cancers = person.cancers + ".  "+ req.body.person;
            }
            if(req.body.aids !== ""){
                person.aids = req.body.aids;
            }
            if(req.body.senseorgansproblems !== ""){
                person.senseorgansproblems = person.senseorgansproblems+".  "+req.body.senseorgansproblems;
            }
            person.save()
            .then((person) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({info:'successfully updated', success: true, error:null, person: person});
            })
            
        }
        else{
            console.log('==null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var err = new Error('No Record Found');
            res.json({info:'No record found on given adhar no', success: false, error:err});
        }
    })
    .catch((err) => {
        console.log('catch search');
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'cannot update', success: false, error:err});
    })
});

module.exports = peopleRoute;