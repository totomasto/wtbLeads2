let BASE_URL = 'http://192.168.1.69:8080';
// urls used to access the API 
let url = `${BASE_URL}/leads/select`;
let clientsUrl = `${BASE_URL}/nav/leads/clients`;
let paramUrl = `${BASE_URL}/nav/leads/clients/selection`;
let dataEmailUrl = `${BASE_URL}/leads/email`;
let dataSMSUrl = `${BASE_URL}/leads/sms`;
let webImportUrl = `${BASE_URL}/wp/get`;
let deleteLeadUrl = `${BASE_URL}/leads/delete`;



//making import from wp every 20 seconds 
setTimeout(webImport, 20000);








let removeLocalData = async () => {

    if(localStorage.getItem('lead')){ localStorage.removeItem('lead'); }
    if(localStorage.getItem('client')){ localStorage.removeItem('client');}

}


let loadingTables = async (state) => {
                // console.log(state);
                if(state === true) { 
                    
                    document.getElementById('loadingRow').style.display= 'block'; 
                    document.getElementById('tablesRow').style.visibility = 'hidden'; 
                } else { 
                    document.getElementById('loadingRow').style.display= 'none'; 
                    document.getElementById('tablesRow').style.visibility = 'visible';
                    
                }
}

// gets data from the API for leads and clients 
let fetchDataFromAPI = async () => {

    
                loadingTables(true);

                // we query for leads
                await queryAPI(url, 'GET', '',(err, data)=>{
                    if(err) console.log(err);
                    
                   
                        let convertedData = JSON.stringify(data);
                        localStorage.setItem('leadsData', convertedData);
                    

                });

                // then we query for clients 
                await queryAPI(clientsUrl, 'GET', '', (err, data)=>{

                    if(err) console.log(err);

               
                        let convertedData = JSON.stringify(data);
                        localStorage.setItem('clientsData', convertedData);
               


                });

            await renderTables();
            loadingTables(false);
}







let renderTables = async () => {

                    // using jQuery for the Datatable
                    const leadsTable = $('#leadsTable').DataTable({
                        "lengthChange": false,
                        "pageLength" : 20,
                        "scrollY": "600px",
                        "responsive" : true,
                        "deferRender" : true,
                        
                        
                    }).clear().draw();
                    leadsTable.order([0,'desc']).draw();
                   
                    const clientsTable =  $('#clientsTable').DataTable({
                        "lengthChange": false,
                        "pageLength" : 50,
                        "scrollY": "600px",
                        "deferRender" : true,
                        "columnDefs"  : [ {'targets': 0, 'searchable': false} ]
                    
                    }).clear().draw();



                    // extracting data from localstorage leads and adding rows inside datatable
                    
                    JSON.parse(localStorage.getItem('leadsData')).forEach(async (element)=>{
                        // if(element.status === 'Neprocesat'){
                        //filtering for today + yesterday
                        let today = new Date().toISOString().slice(0, 10);
                        let yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
                        let applyBtn = (element.status === 'Neprocesat') ? `<button type="button" class="btn btn-success btn-sm" onclick="changeBtn(this.id);" id="${element.id}">Aplica</button>` : '';


                    // adding the rows to the table
                    // if(element.date.slice(0,10) === today || element.date.slice(0,10) === yesterday){ 
                    leadsTable.row.add([
                        element.id,
                        element.name,
                        `${element.email}<br>${element.phone}`,
                        `${element.region}<br>${element.city}`,
                        element.status,
                        `<button class="btn btn-primary btn-sm" onclick="displayObsModal('${element.id}');" >Obs</button>`,
                        element.client,
                        element.reason,
                        element.date,
                        `${applyBtn} -
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteLeadFromDB('${element.id}');">Sterge</button>`,
                        element.obs,     // hidden column
                        element.phone    // hidden column
                        // also needs unfilter , thats for later :D 
                    ]);
                    // }
                // }
                    });
               
                    leadsTable.draw();


                    // extracting data from localstorage clients and adding rows inside datatable
                    
                    JSON.parse(localStorage.getItem('clientsData')).forEach(async (element)=>{
                        
                        let count = 1;
                    
                            clientsTable.row.add([
                            `<button type="button" class="btn btn-success btn-sm" onclick="changeBtn(this.id);" id="${element.No}">Aplica</button>`,
                            element.Name,
                            element._x003C_Judet_x003E_,
                            element.Post_Code,

                        ]);

                    count++;
                

                    });

                    clientsTable.draw();



      

}


removeLocalData();
fetchDataFromAPI();
displayCurrentConnections();
