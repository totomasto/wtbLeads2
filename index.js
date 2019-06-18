const express = require('express');
const path = require('path');
let app = express();
app.use(express.static(__dirname + '/'));
let port = 5000;
app.listen(port, ()=>{ console.log('WTB Leads Admin running on localhost port : ' + port) });

app.get('/', (req,res)=>{res.sendFile(path.join(__dirname + '/index.html')); });
app.get('/dashboard', (req,res)=>{ res.sendFile(path.join(__dirname + '/dashboard.html'));  });
app.get('/charts', (req, res)=>{ res.sendFile(path.join(__dirname + '/charts.html')); });