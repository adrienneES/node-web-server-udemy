const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {return new Date().getFullYear()})
hbs.registerHelper('screamIt', (str)=> {return str.toUpperCase();})

app.set('view-engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=> {
    const log = `time: ${new Date().toString()}; :::${req.method}::: ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err)=> {if (err) {console.log("unable to write to logger");}});
    console.log(log); 
    next();
});
// app.use((req,res, next)=> {
//     res.render('maintenance.hbs')
// })
app.get('/', (req, res)=> {
//    res.send('<h1>hi there</h1>');
//    res.send({name:'adri', likes: ['kittens', 'bunnies']})
    res.render('home.hbs', {
        pageTitle: 'home page',
        welcomeMessage: 'i welcome you'
    });
});
app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'about page',
    });
});
app.get('/bad', (req, res) => {
    res.send({errorMessage: 'oh no there was an error!!!'})
});
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'projects page',
    });
});
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`);
});
