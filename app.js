const Express = require('express');

var app = new Express();

app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/index',(req,res)=>{
    res.render('index');
});


app.listen(process.env.PORT || 3046,()=>{
    console.log('Server running at http://localhost:3046')
})