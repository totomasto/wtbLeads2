const express = require('express');
const path = require('path');
const Excel = require('exceljs');
const fs = require('fs');
var bodyParser = require('body-parser')

let app = express();
app.use(express.static(__dirname + '/'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit : '50mb' }));

// parse application/json
app.use(bodyParser.json({limit : '50mb'}))
let port = 5000;
app.listen(port, ()=>{ console.log('WTB Leads Admin running on localhost port : ' + port) });

app.get('/', (req,res)=>{res.sendFile(path.join(__dirname + '/index.html')); });
app.get('/dashboard', (req,res)=>{ res.sendFile(path.join(__dirname + '/dashboard.html'));  });
app.get('/charts', (req, res)=>{ res.sendFile(path.join(__dirname + '/charts.html')); });
app.get('/reminders', (req, res)=>{ res.sendFile(path.join(__dirname + '/reminders.html')); });









// EXPORT EXCEL //

app.post('/export/general', async (req, res)=>{



await exportExcelGeneral(req.body ,(err, filename)=>{

});


});




let exportExcelGeneral = async (data, callback)=>{

    

    const tempPath = `${__dirname}/reports`;
    let template = `${__dirname}/reports/templates/report_general.xlsx`;
    let filename = 'Raport general Lead-uri.xlsx';

    let workbook = new Excel.Workbook();

    workbook.xlsx.readFile(template).then(()=>{

            let worksheet = workbook.getWorksheet('sheet1');

    })

    console.log(tempPath);

}