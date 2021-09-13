var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var url = 'mongodb://127.0.0.1:27017/';
var ObjectId = require('mongodb').ObjectID;

//insert new questions into DB 
exports.addQuestions = function (req, res) {
    verification.checkAccessToken(req.accessToken)
    .then(response => {
      if(response === false){
        responseMessage = {
          "status": "error",
          "errorMessage": "Unauthorized access!"
        }
        res.send(responseMessage)
      } else {
          let heatMapData = []
            try {
                let category = req.body.category;
                let question = req.body.question;
                console.log(category)
                // console.log(question)
                if(category == undefined || category == '' || question == undefined || question == '') throw 'invalid';
                if( category != "Signup" && category != "Healthy" && category != "Ill" && category != "Hazard"  && category != "Registration"){
                    throw 'invalid'
                }
                try {
                    MongoClient.connect(url, function (dberr, db) {
                        if (dberr) throw dberr;
                        var dbo = db.db("COVID-Home-Management");
                        let newQuestion = []
                        if(category == "Signup")
                        { 
                            dbo.collection("SignupQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    res11[0].questions.push(question);
                                    newQuestion = res11[0].questions;
                                    let update ={
                                        "questions":newQuestion
                                    }
                                    dbo.collection("SignupQuestionnaire").updateOne({_id:ObjectId(id)},{$set:update}, function(err, ress1) {
                                        if(err){
                                            res.status(500).send({data:"Error in adding new question",error:err});
                                            return;                         
                                        }
                                        // dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                        //     if(err){
                                        //         res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                        //         return;                         
                                        //     }
                                            
                                        // })
                                        res.send({status:"success",data:"new question is addded successfully for "+category});
                                            return;
                                    });
                                }
                                
                            })
                           
                        }else if(category == "Healthy")
                        {
                            dbo.collection("dailyHealthyQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    res11[0].questions.push(question);
                                    newQuestion = res11[0].questions;
                                    let update ={
                                        "questions":newQuestion
                                    }
                                    dbo.collection("dailyHealthyQuestionnaire").updateOne({_id:ObjectId(id)},{$set:update}, function(err, ress1) {
                                        if(err){
                                            res.status(500).send({data:"Error in adding new question",error:err});
                                            return;                         
                                        }
                                        dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                            if(err){
                                                res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                return;                         
                                            }
                                            res.send({status:"success",data:"new question is addded successfully for "+category});
                                            return;
                                        })
                                    });
                                }
                                
                            })
                        }else if(category == "Ill")
                        {
                            dbo.collection("dailyIllQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    res11[0].questions.push(question);
                                    newQuestion = res11[0].questions;
                                    let update ={
                                        "questions":newQuestion
                                    }
                                    dbo.collection("dailyIllQuestionnaire").updateOne({_id:ObjectId(id)},{$set:update}, function(err, ress1) {
                                        if(err){
                                            res.status(500).send({data:"Error in adding new question",error:err});
                                            return;                         
                                        }
                                        dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                            if(err){
                                                res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                return;                         
                                            }
                                            res.send({status:"success",data:"new question is addded successfully for "+category});
                                            return;
                                        })
                                    });
                                }
                                
                            })
                            
                        }else if(category == "Hazard")
                        {
                            dbo.collection("hazardQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    res11[0].questions.push(question);
                                    newQuestion = res11[0].questions;
                                    let update ={
                                        "questions":newQuestion
                                    }
                                    dbo.collection("hazardQuestionnaire").updateOne({_id:ObjectId(id)},{$set:update}, function(err, ress1) {
                                        if(err){
                                            res.status(500).send({data:"Error in adding new question",error:err});
                                            return;                         
                                        }
                                        dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                            if(err){
                                                res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                return;                         
                                            }
                                            res.send({status:"success",data:"new question is addded successfully for "+category});
                                            return;
                                        })
                                    });
                                }
                                
                            })
                        }else if(category == "Registration")
                        {
                            dbo.collection("registrationQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    res11[0].questions.push(question);
                                    newQuestion = res11[0].questions;
                                    let update ={
                                        "questions":newQuestion
                                    }
                                    dbo.collection("registrationQuestionnaire").updateOne({_id:ObjectId(id)},{$set:update}, function(err, ress1) {
                                        if(err){
                                            res.status(500).send({data:"Error in adding new question",error:err});
                                            return;                         
                                        }
                                        // dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                        //     if(err){
                                        //         res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                        //         return;                         
                                        //     }
                                            
                                        // })
                                        res.send({status:"success",data:"new question is addded successfully for "+category});
                                            return;
                                    });
                                }
                                
                            })
                        }
                    })
                }catch (error) {
                    responseMessage = {
                        "status": error,
                        "errorMessage": "Internal Server error"
                    }
                    res.send(responseMessage)
                    return
                }
            }catch (error) {
                res.send({
                    data: "invalid status",
                    status:"failed"
                })
                return
            }
        }
    })
}                                       
            
//fetch questions from DB 
exports.fetchQuestions = function (req, res) {
    verification.checkAccessToken(req.accessToken)
    .then(response => {
      if(response === false){
        responseMessage = {
          "status": "error",
          "errorMessage": "Unauthorized access!"
        }
        res.send(responseMessage)
      } else {
          let heatMapData = []
            try {
                let category = req.body.category;
                console.log(category)
                if(category == undefined || category == '') throw 'invalid';
                if( category != "Signup" && category != "Healthy" && category != "Ill" && category != "Hazard"  && category != "Registration"){
                    throw 'invalid'
                }
                try {
                    MongoClient.connect(url, function (dberr, db) {
                        if (dberr) throw dberr;
                        var dbo = db.db("COVID-Home-Management");
                        if(category == "Signup")
                        {
                            dbo.collection("SignupQuestionnaire").find({}).toArray(function(err, result) {
                                if (err) throw err;
                                // console.log(result)
                                res.send({
                                    data:result,
                                    status:"success"
                                })
                            })
                        }else if(category == "Healthy")
                        {
                            dbo.collection("dailyHealthyQuestionnaire").find({}).toArray(function(err, result) {
                                if (err) throw err;
                                // console.log(result)
                                res.send({
                                    data:result,
                                    status:"success"
                                })
                            })
                        }else if(category == "Ill")
                        {
                            dbo.collection("dailyIllQuestionnaire").find({}).toArray(function(err, result) {
                                if (err) throw err;
                                // console.log(result)
                                res.send({
                                    data:result,
                                    status:"success"
                                })
                            })
                        }else if(category == "Hazard")
                        {
                            dbo.collection("hazardQuestionnaire").find({}).toArray(function(err, result) {
                                if (err) throw err;
                                // console.log(result)
                                res.send({
                                    data:result,
                                    status:"success"
                                })
                            })
                        }else if(category == "Registration")
                        {
                            dbo.collection("registrationQuestionnaire").find({}).toArray(function(err, result) {
                                if (err) throw err;
                                // console.log(result)
                                res.send({
                                    data:result,
                                    status:"success"
                                })
                            })
                        }
                    })
                }catch (error) {
                    responseMessage = {
                        "status": error,
                        "errorMessage": "Internal Server error"
                    }
                    res.send(responseMessage)
                    return
                }
            }catch (error) {
                res.send({
                    data: "invalid configuration category",
                    status:"failed"
                })
                return
            }
        }
    })
} 

//update existing questions in DB 
exports.updateQuestions = function (req, res) {
    verification.checkAccessToken(req.accessToken)
    .then(response => {
      if(response === false){
        responseMessage = {
          "status": "error",
          "errorMessage": "Unauthorized access!"
        }
        res.send(responseMessage)
      } else {
          let heatMapData = []
            try {
                let index = req.body.position;
                let category = req.body.category;
                let question = req.body.question;
                console.log(index)
                console.log(question)
                if(index == undefined || index == '' || category == undefined || category == '' || question == undefined || question == '') throw 'empty';
                if( category != "Signup" && category != "Healthy" && category != "Ill" && category != "Hazard"  && category != "Registration"){
                    throw 'invalid'
                }
                try {
                    MongoClient.connect(url, function (dberr, db) {
                        if (dberr) throw dberr;
                        var dbo = db.db("COVID-Home-Management");
                        
                        if(category == "Signup")
                        {
                            dbo.collection("SignupQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass[index] = question;
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("SignupQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in updating question"});
                                            return;
                                        }else{ 
                                            // dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                            //     if(err){
                                            //         res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                            //         return;                         
                                            //     }
                                                
                                            // })
                                            res.send({
                                                data:"Given question is successfully updated",
                                                status:"success"
                                            })
                                            return
                                        }
                                    })
                                }
                            })             
                        }else if(category == "Healthy")
                        {
                            dbo.collection("dailyHealthyQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass[index] = question;
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("dailyHealthyQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in updating question"});
                                            return;
                                        }else{
                                            dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                                if(err){
                                                    res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                    return;                         
                                                }
                                                res.send({
                                                    data:"Given question is successfully updated",
                                                    status:"success"
                                                })
                                                return
                                            })
                                        }
                                    })
                                }
                            })
                        }else if(category == "Ill")
                        {
                            dbo.collection("dailyIllQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass[index] = question;
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("dailyIllQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in updating question"});
                                            return;
                                        }else{
                                            dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                                if(err){
                                                    res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                    return;                         
                                                }
                                                res.send({
                                                    data:"Given question is successfully updated",
                                                    status:"success"
                                                })
                                                return
                                            }) 
                                        }
                                    })
                                }
                            })
                        }else if(category == "Hazard")
                        {
                            dbo.collection("hazardQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass[index] = question;
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("hazardQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in updating question"});
                                            return;
                                        }else{
                                            dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                                if(err){
                                                    res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                    return;                         
                                                }
                                                res.send({
                                                    data:"Given question is successfully updated",
                                                    status:"success"
                                                })
                                                return
                                            }) 
                                        }
                                    })
                                }
                            })
                        }else if(category == "Registration")
                        {
                            dbo.collection("registrationQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass[index] = question;
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("registrationQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in updating question"});
                                            return;
                                        }else{
                                            // dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                            //     if(err){
                                            //         res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                            //         return;                         
                                            //     }
                                                
                                            // }) 
                                            res.send({
                                                data:"Given question is successfully updated",
                                                status:"success"
                                            })
                                            return
                                        }
                                    })
                                }
                            })
                        }
                    })
                }catch (error) {
                    responseMessage = {
                        "status": error,
                        "errorMessage": "Internal Server error"
                    }
                    res.send(responseMessage)
                    return
                }
            }catch (error) {
                if(error == "invalid")
                {
                    res.send({
                        data: "wrong category",
                        status:"failed"
                    })
                    return
                }else if(error == "empty")
                {
                    res.send({
                        data: "invalid category (or) question (or) ID",
                        status:"failed"
                    })
                }
                
            }
        }
    })
} 

//delete questions from DB 
exports.deleteQuestions = function (req, res) {
    verification.checkAccessToken(req.accessToken)
    .then(response => {
      if(response === false){
        responseMessage = {
          "status": "error",
          "errorMessage": "Unauthorized access!"
        }
        res.send(responseMessage)
      } else {
          let heatMapData = []
            try {
                console.log("delete")
                let index = req.body.position;
                let category = req.body.category;
                console.log(index)
                if(index == undefined || index == '' || category == undefined || category == '') throw 'empty';
                if( category != "Signup" && category != "Healthy" && category != "Ill" && category != "Hazard"  && category != "Registration"){
                    throw 'invalid'
                }
                try {
                    MongoClient.connect(url, function (dberr, db) {
                        if (dberr) throw dberr;
                        var dbo = db.db("COVID-Home-Management");
                        if(category == "Signup")
                        {
                            dbo.collection("SignupQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass.splice(index,1)
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("SignupQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in deleting question"});
                                            return;
                                        }else{
                                            // dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                            //     if(err){
                                            //         res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                            //         return;                         
                                            //     }
                                                
                                            // }) 
                                            res.send({
                                                data:"Given question is successfully deleted",
                                                status:"success"
                                            })
                                            return
                                        }
                                    })
                                }
                            })             
                        }else if(category == "Healthy")
                        {
                            dbo.collection("dailyHealthyQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass.splice(index,1)
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("dailyHealthyQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in deleting question"});
                                            return;
                                        }else{
                                            dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                                if(err){
                                                    res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                    return;                         
                                                }
                                                res.send({
                                                    data:"Given question is successfully deleted",
                                                    status:"success"
                                                })
                                                return
                                            }) 
                                        }
                                    })
                                }
                            })
                        }else if(category == "Ill")
                        {
                            dbo.collection("dailyIllQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass.splice(index,1)
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("dailyIllQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in deleting question"});
                                            return;
                                        }else{
                                            dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                                if(err){
                                                    res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                    return;                         
                                                }
                                                res.send({
                                                    data:"Given question is successfully deleted",
                                                    status:"success"
                                                })
                                                return
                                            })
                                        }
                                    })
                                }
                            })
                        }else if(category == "Hazard")
                        {
                            dbo.collection("hazardQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass.splice(index,1)
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("hazardQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in deleting question"});
                                            return;
                                        }else{
                                            dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                                if(err){
                                                    res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                                    return;                         
                                                }
                                                res.send({
                                                    data:"Given question is successfully deleted",
                                                    status:"success"
                                                })
                                                return
                                            }) 
                                        }
                                    })
                                }
                            })
                        }else if(category == "Registration")
                        {
                            dbo.collection("registrationQuestionnaire").find({}).toArray((err,res11)=>{
                                if(err){
                                    res.status(500).send({data:"Error in adding new question",error:err});
                                    return;                         
                                }
                                if(res11)
                                {
                                    let id = res11[0]._id;
                                    let datass = res11[0].questions;
                                    datass.splice(index,1)
                                    let updateQuestion = {
                                        "questions":datass
                                    }
                                    dbo.collection("registrationQuestionnaire").updateOne({_id:ObjectId(id)},{$set:updateQuestion}, function(error, result) {
                                        if(error){
                                            res.status(500).send({data:"Error in deleting question"});
                                            return;
                                        }else{
                                            // dbo.collection("Users").updateMany({}, { $set: { isConfigurationChanged: true }}, (err, ress)=>{
                                            //     if(err){
                                            //         res.status(500).send({data:"Error in updating isConfigurationChanged flag"});
                                            //         return;                         
                                            //     }
                                                
                                            // }) 
                                            res.send({
                                                data:"Given question is successfully deleted",
                                                status:"success"
                                            })
                                            return
                                        }
                                    })
                                }
                            })
                        }
                    })
                }catch (error) {
                    responseMessage = {
                        "status": error,
                        "errorMessage": "Internal Server error"
                    }
                    res.send(responseMessage)
                    return
                }
            }catch (error) {
                if(error == "invalid")
                {
                    res.send({
                        data: "wrong category",
                        status:"failed"
                    })
                    return
                }else if(error == "empty")
                {
                    res.send({
                        data: "invalid category (or) question (or) ID",
                        status:"failed"
                    })
                }
                
            }
        }
    })
} 