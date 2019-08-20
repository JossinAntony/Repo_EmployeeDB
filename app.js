const Express = require('express');
const Mongoose = require('mongoose');
const bodyParser =require('body-parser');
var request = require('request');


var app = new Express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


//Mongoose.connect('mongodb://localhost:27017/EmployeeDB');
Mongoose.connect('mongodb+srv://jossin:jossin@cluster0-arjkd.mongodb.net/test?retryWrites=true&w=majority'); //mongodb cloudatlas add, remener to change password

////////////////////////////////////////////////
//define dataschema
const employeeModel = Mongoose.model('employees',
{
    uname:String,
    udesig:String,
    usal:String
}
);
////
//define save API upon save button
app.post('/saveInfo',(req,res)=>{
    var details = req.body;
    var employee = new employeeModel(details);
    var result = employee.save((error, data)=>{
        if (error){
            throw error;
        }else{
            //res.send('employee record created @' + data);
            res.send("<script>alert('New employee record created!')</script>");
            
        }
    });
});

////define retrievel API
app.get('/retrieveInfo',(req,res)=>{
    var retrieve = employeeModel.find((error,data)=>{
        if (error){
            throw error;
        }else{
            res.send(data);
        }
    });

});

///get link to the retrievel API
const retrieveDataApi = "http://localhost:3046/retrieveInfo"

///call the API in a function to retieve the data
app.get('/viewemployees',(req,res)=>{
    request(retrieveDataApi,(error, response, body)=>{
        if (error){
            throw error;
        }else{
            var data= JSON.parse(body);
            res.render('viewemployees',{'data':data});
        }
    });
});
/////////////////////////////////////////////////////



app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/index',(req,res)=>{
    res.render('index');
});

app.get('/searchemployee',(req, res)=>{
    res.render('searchemployee');
});


app.listen(process.env.PORT || 3046,()=>{
    console.log('Server running at http://localhost:3046')
})