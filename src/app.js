const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
// define path for express config
const viewPath = path.join(__dirname, '../templates/views');
const publicDirectory = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath)
// setup static directory to serve
app.use(express.static(publicDirectory))
app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather',
        name:'Filopateer Sobhy'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title:'About me',
        name: 'Filopateer Sobhy'
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        helptext: 'this is help text',
        title:'Help',
        name:'Filopateer Sobhy'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
       return res.json({error: 'you must provide an address'})
    }else{
        geocode(req.query.address, (error, {longitude , latitude, location} = {})=>{
            if(error){
                return res.send(error)
            }
        
        
        forecast(longitude,latitude,(error, forecastData)=>{
            if(error){
                res.send(error)
            }
            
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
        } )
        
        })
    }
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return   res.send({error: 'you must provide search code'})
    }else{
        return  res.send({products:[]})
    }

})



app.get('/help/*', (req,res)=>{
    res.render('404', {
        errorMessage:'Help Article Not Found',
        title:'404',
        name:'Filopateer Sobhy'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        errorMessage:'Page Not Found...',
        title:'404',
        name:'Filopateer Sobhy'
    })
})

app.listen(port, ()=>{
    console.log('server is runing on localhost:'+port)
})