const express = require('express');
const res = require('express/lib/response');
const request = require('request');
const https = require('https');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))


app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/signup.html');
})

app.post('/',(req, res)=>{
    let firstName = req.body.fn;
    let lastName = req.body.ln;
    let email = req.body.em;

    let data = {
        members: [
            {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
     ]
    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us14.api.mailchimp.com/3.0/lists/43bb16a00a';
   
    const options = {
        method:'POST',
        auth: 'kevin:64dab8d12bf55d3f6b5e41a8cde9b12c-us14'
    }

    const request = https.request(url, options, function(response){
    response.on("data", function(data) {

        if(response.statusCode === 200 ) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }


        console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();
})

app.post('/failure',(req,res)=>{
    res.redirect('/');
})


app.listen(process.env.PORT||3000, ()=>{
    console.log("server started boo");
});


//API key
//64dab8d12bf55d3f6b5e41a8cde9b12c-us14

//list id
//43bb16a00a
