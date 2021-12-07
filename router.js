
const admin = require("./APIs/admin")
const students = require("./APIs/students")
const faculty = require("./APIs/faculty")
const website = require("./APIs/website");
const {ObjectId} = require('mongodb');  
const  Razorpay = require('razorpay');
const  shortID = require('shortid');
const mongodb = require("./Utils/dao");

var razorpay = new Razorpay({
  key_id: 'rzp_test_QbsFmZSnoGXvpF',
  key_secret: 'D4OFV9dBmJitiNaNraoNoBbC',
});

module.exports = function(app) { 
  app.post("/v1/api/webapp/add", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.reqdata
    website.insertOne(collectionName,reqdata).then(async (result) => {
      res.send({
        status: 200,
        data:
          "new data is addded successfully for " + collectionName,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
  app.post("/v1/api/webapp/addfaulty", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.reqdata
    website.insertMany(collectionName,reqdata).then(async (result) => {
      res.send({
        status: 200,
        data:
          "new data is addded successfully for " + collectionName,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
  app.post("/v1/api/webapp/updateMiscellaneous", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.reqdata;
    
    website.update(collectionName, {name:'kuat'},reqdata).then(async (result) => {
      res.send({
        status: 200,
        data:
          "new data is updated successfully for " + collectionName,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
  app.post("/v1/api/webapp/fetchMiscellaneous", function (req, res){
    let collectionName = req.body.collectionName;
    let query = {name:'kuat'}
    if (
      collectionName == undefined ||
      collectionName == "" ||
      query == undefined ||
      query == ""
    ){
      res.send({
        data: "invalid status",
        status: "failed",
      });
      return;
    }
    website.query(collectionName,query).then(async (result) => {
      res.send({
        status: 200,
        data:result,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
  app.post("/v1/api/webapp/sendmsg", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.reqdata
    website.insertOne(collectionName,reqdata).then(async (result) => {
      res.send({
        status: 200,
        data:
          "new data is addded successfully for " + collectionName,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
   app.post("/v1/api/webapp/sendmail", function (req, res){
    let name = req.body.reqdata.name
    let email = req.body.reqdata.email
    console.log(name),
    console.log(email)
    website.sendmail(name, email);
  })
  app.post("/v1/api/webapp/fetchdata", function (req, res){
    let collectionName = req.body.collectionName;
    let query = req.body.query
    if (
      collectionName == undefined ||
      collectionName == "" ||
      query == undefined ||
      query == ""
    ){
      res.send({
        data: "invalid status",
        status: "failed",
      });
      return;
    }
    website.query(collectionName,query).then(async (result) => {
      res.send({
        status: 200,
        data:result,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
  app.post("/v1/api/webapp/fetchusers", function (req, res){
    let collectionName = req.body.collectionName;
    let query = req.body.query
    console.log(query)
    console.log(collectionName)

    if (
      collectionName == undefined ||
      collectionName == "" ||
      query == undefined ||
      query == ""
    ){
      res.send({
        data: "invalid status",
        status: "failed",
      });
      return;
    }
    website.query(collectionName,query).then(async (result) => {
      res.send({
        status: 200,
        data:result,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
  app.post("/v1/api/webapp/login", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.reqdata
    website.login(collectionName,reqdata).then(async (result) => {
      res.status(200).send(result);
      return;
    }, async (error) => {
      res
      .status(500)
      .send(error);
    });
  })
  app.post("/v1/api/webapp/resetPassword", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.reqdata
    let query = {username:req.body.username}

    website.update(collectionName,query,reqdata).then(async (result) => {
      res.send(result);
      return;
    }, async (error) => {
      res
      .status(500)
      .send(error);
      return;
    });
  })  
  app.post("/v1/api/webapp/updateuser", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.upateData
    delete reqdata._id
    let query = {username:req.body.username}
    website.update(collectionName,query,reqdata).then(async (result) => {
      res.send(result);
      return;
    }, async (error) => {
      res
      .status(500)
      .send(error);
      return;
    });
  })
  app.post("/v1/api/webapp/updateproject", function (req, res){
    console.log("--------------")
    console.log(req.body.collectionName)
    console.log(req.body.upateData)
    console.log(req.body.companyname)

    let collectionName = req.body.collectionName;
    let reqdata = req.body.upateData
    delete reqdata._id
    let query = {companyname:req.body.companyname}
    website.update(collectionName,query,reqdata).then(async (result) => {
      res.send(result);
      return;
    }, async (error) => {
      res
      .status(500)
      .send(error);
      return;
    });
  })
  app.post("/v1/api/webapp/delete", function (req, res){
    let collectionName = req.body.collectionName;
    let query = req.body.query
    // console.log(req.body.username)
    website.deleteItem(collectionName,query).then(async (result) => {
      res.send(result);
      return;
    }, async (error) => {
      res
      .status(500)
      .send(error);
      return;
    });
  })
  app.post("/v1/api/webapp/addUser", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.reqdata
    website.insertOne(collectionName,reqdata).then(async (result) => {
      res.send({
        status: 200,
        data:
          "new data is addded successfully for " + collectionName,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
  app.post("/v1/api/webapp/addsyllabus", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.reqdata
    let coursename = req.body.courseName
    website.addSyllabus(collectionName,reqdata, coursename).then(async (result) => {
      res.send({
        status: 200,
        data:
          "new data is addded successfully for " + collectionName,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
  app.post("/v1/api/webapp/updatecourse", function (req, res){
    let collectionName = req.body.collectionName;
    let reqdata = req.body.upateData
    delete reqdata._id
    console.log(req.body._id)
    let query = {_id:ObjectId(req.body._id)}
    website.update(collectionName,query,reqdata).then(async (result) => {
      res.send(result);
      return;
    }, async (error) => {
      res 
      .status(500)
      .send(error);
      return;
    });
  })
  app.post("/v1/api/webapp/deletecourse", function (req, res){
    let collectionName = req.body.collectionName;
    let query = {_id:new ObjectId(req.body._id)}
    console.log(req.body.username)
    console.log(req.body.collectionName)

    website.deleteItem(collectionName,query).then(async (result) => {
      res.send(result);
      return;
    }, async (error) => {
      res
      .status(500)
      .send(error);
      return;
    });
  })


  app.post("/v1/api/webapp/razorpay", async function (req, res){
    const amount =  '5000';
    const currency =  'INR';
    const receipt =  shortID.generate();

    const options = {amount, currency, receipt}
    const response = await razorpay.orders.create(options)
    console.log(response)
    var result = {
      status:200,
      data:response
    }
    res.send(result);
  })

  app.post("/v1/api/webapp/incrementinvoice", function (req, res){
    let collectionName = req.body.collectionName;
    console.log(collectionName)
    mongodb.query(collectionName,{}).then(async (result) => {
      if(result.length > 0)
      {
        let invoiceNo = {
          invoiceno:Number(result[0].no)+1
        };
        mongodb.incrementinvoice(collectionName, result[0]._id, invoiceNo).then(async (result1) => {
          res.send({
            status: 200,
            invoiceNumber:Number(result[0].no)+1,
            data:
              "Invoice Number incremented successfully",
          });
          return;
        }, async (error) => {
          res
          .status(500)
          .send({
            data: error.msg,
            error: error.err,
          });
        });
      }
    }, async (error) => {
      res
      .status(500)
      .send(error);
    });
  }),
  app.post("/v1/api/webapp/resetinvoice", function (req, res){
    let collectionName = req.body.collectionName;
    let data = {invoiceno:req.body.data};
    console.log(collectionName)
    console.log(data)
    mongodb.updateInvoice(collectionName,data).then(async (result) => {
      res.status(200).send(result);
      return;
    }, async (error) => {
      res
      .status(500)
      .send(error);
    });
  })

  app.post("/v1/api/webapp/checkpassword", function (req, res){
    let collectionName = req.body.collectionName;
    let query = {username:req.body.username};
    let password = req.body.password;
    mongodb.query(collectionName,query).then(async (result) => {
      let status_code = 0
      if(result[0].amount_password == password)
      {
        status_code = 200
      }else{
        status_code = 404
      }
      res.send({
        status: 200,
        code:status_code,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })

  app.post("/v1/api/webapp/totalAmountEarned", function (req, res){
    let collectionName = req.body.collectionName;
    let query = {username:req.body.username};
    mongodb.query(collectionName,query).then(async (result) => {
     let totalAmount = 0
      if(result[0])
      {
        totalAmount = Number(result[0].totalAmountEarned)
      }
      res.send({
        status: 200,
        data:totalAmount,
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })

  app.post("/v1/api/webapp/updateTotalAmount", function (req, res){
    let collectionName = req.body.collectionName;
    let query = {username:req.body.username};
    let amount = req.body.amount;
    let action = req.body.action;
    mongodb.query(collectionName,query).then(async (result) => {
     let totalAmount = 0
      if(result[0])
      {
        if(action == 'add')
        {
          totalAmount = Number(result[0].totalAmountEarned) + Number(amount);
        }else{
          totalAmount = Number(result[0].totalAmountEarned) - Number(amount);
        }
        result[0].totalAmountEarned = totalAmount;
        website.update(collectionName,query,result[0]).then(async (result11) => {
          res.send(result11);
          return;
        }, async (error11) => {
          res
          .status(500)
          .send(error11);
          return;
        });
      }
      res.send({
        status: 500,
        data:'updation failed',
      });
      return;
    }, async (error) => {
      res
      .status(500)
      .send({
        data: error.msg,
        error: error.err,
      });
    });
  })
}




