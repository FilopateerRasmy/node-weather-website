const request = require('postman-request');

const forecast = (longitude, latitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=664fc034fcacbd5c3fc76475d5eb9c4b&query=${latitude},${longitude}`;
    request({url:url, json:true}, (error, {body})=>{
        if(error){
          callback('Unable to connect to servers', undefined);
        }else if(body.success) {
              callback('Unable to find location try another location', undefined)
        }else{
          callback(undefined, `${body.current.weather_descriptions[0]} it curently ${body.current.temperature} degree out it feels like ${body.current.feelslike}
          and the humidity is ${body.current.humidity}`)
        }
        
        }) 
    }

    module.exports = forecast;