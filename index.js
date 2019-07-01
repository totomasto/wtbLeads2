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
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({filename : filename}));
            });

});




let exportExcelGeneral = async (data, callback)=>{

    // console.log(data);

    const tempPath = `${__dirname}/reports`;
    let template = `${__dirname}/reports/templates/report_general.xlsx`;
    let filename = 'Raport general Lead-uri.xlsx';

    let workbook = new Excel.Workbook();

    workbook.xlsx.readFile(template).then(()=>{

            let worksheet = workbook.getWorksheet('Sheet1');
            let count = 1;
            data.forEach((lead) => {
                
                let id          = worksheet.getCell(`A${count}`);
                let name        = worksheet.getCell(`B${count}`);
                let email       = worksheet.getCell(`C${count}`);
                let phone       = worksheet.getCell(`D${count}`);
                let region      = worksheet.getCell(`E${count}`);
                let city        = worksheet.getCell(`F${count}`);
                let tip         = worksheet.getCell(`G${count}`);
                let source      = worksheet.getCell(`H${count}`);
                let status      = worksheet.getCell(`I${count}`);
                let client      = worksheet.getCell(`J${count}`);
                let obs         = worksheet.getCell(`K${count}`);
                let date        = worksheet.getCell(`L${count}`);
                let sent_date   = worksheet.getCell(`M${count}`);
                let reason      = worksheet.getCell(`N${count}`);


                    id       .value = lead.id       ;
                    name     .value = lead.name     ;
                    email    .value = lead.email    ;
                    phone    .value = lead.phone    ;
                    region   .value = lead.region   ;
                    city     .value = lead.city     ;
                    tip      .value = lead.tip      ;
                    source   .value = lead.source   ;
                    status   .value = lead.status   ;
                    client   .value = lead.client   ;
                    obs      .value = lead.obs      ;
                    date     .value = lead.date     ;
                    sent_date.value = lead.sent_date;
                    reason   .value = lead.reason   ;



                count ++ ;


            });
            workbook.xlsx.writeFile(`${__dirname}/reports/${filename}`);
    }).then(()=>{
        console.log('Export was successfull');
        callback(null, filename);
    }).catch((err)=> console.log(err));

    

    console.log(tempPath);

}