const Express = require('express');
const Mongoose = require('mongoose');
const bodyParser =require('body-parser');


var app = new Express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


Mongoose.connect('mongodb://localhost:27017/EmployeeDB');

const employeeModel = Mongoose.model('employees',
{
    uname:String,
    udesig:String,
    usal:String
}
);

app.post('/saveInfo',(req,res)=>{
    var details = req.body;
    var employee = new employeeModel(details);
    var result = employee.save((error, data)=>{
        if (error){
            throw error;
        }else{
            res.send('employee record created @' + data);
        }
    });
});

//define retrievel API
app.get('/retrieveInfo',(req,res)=>{
    var retrieve = employeeModel.find((error,data)=>{
        if (error){
            throw error;
        }else{
            res.send(data);
        }
    });

});



app.get('/viewemployees',(req,res)=>{

});

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/index',(req,res)=>{
    res.render('index');
});


app.listen(process.env.PORT || 3046,()=>{
    console.log('Server running at http://localhost:3046')
})