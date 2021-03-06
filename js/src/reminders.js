



// prelucram data -lead its all in house nu cred ca se va lega la API momentan 
// 25.06 ROM-FRA ---- remember

let populateRemindersTable = async () => { 
        // extracting leads 
        let leads = JSON.parse(localStorage.getItem('leadsData'));
        let leadIDs = [];
        leads.forEach(lead => {

            let currentDate = new Date(); // getting the current date
            let month = currentDate.getMonth() ; // getting the current month
            let currentMonth = month < 9 ? "0" + (month+1) : month+1; // we want the month in "00" format
            let leadMonth = lead.sent_date.split("-",3)[1] // we re getting the lead month in "00" format
            

            if('06' === leadMonth){ // if they re equal we can make the difference between the days 
            // currentDate = currentDate.getDate(); // getting the current day of the month 
            currentDate = '30';
            let difference = lead.sent_date.split("-",3)[2].substring(0,2) - currentDate; // making the difference between lead day and current day  
            // console.log(difference);
            if(difference*(-1) >= 7 && lead.status === 'In lucru'){ // if difference <= 7 days we have the possibility to remind 

                // we re getting all the leads id to populate table
                leadIDs.push(lead.id);

            }
           
            }
        });

        // console.log(leadIDs);
        await populateTheActualTable(leadIDs);


}


let populateTheActualTable = async (leads)=>{

      // using jQuery for the Datatable
      const remindersTable = $('#remindersTable').DataTable({
        "lengthChange": false,
        "pageLength" : 20,
        "scrollY": "600px",
        "responsive" : true,
        "deferRender" : true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]


}).clear().draw();


leads.forEach((id)=>{

        JSON.parse(localStorage.getItem('leadsData')).forEach((lead)=>{

            if(lead.id === id){
                
                remindersTable.row.add([

                    lead.id, 
                    lead.name,
                    lead.sent_date, 
                    lead.client,
                    `<button class='btn btn-success btn-sm' onclick='remindClient("${lead.id}","${lead.client}")'>Remind</button>`

                ]);

            }


        });


})

remindersTable.draw();

}



let remindClient = async(leadID, clientName) => { 

            // console.log(leadID, clientName);
            
    let lead={}, clientEmail, agentEmail;

    JSON.parse(localStorage.getItem('leadsData')).forEach((element)=>{
        // console.log(element.id);
        if(element.id == leadID){
            lead = element;
            lead.sent_date = lead.sent_date.slice(0,10);
            // console.log('Test');
        }

    });


    JSON.parse(localStorage.getItem('clientsData')).forEach((element)=>{
        if(element.Name === clientName){
            clientEmail = element.E_Mail;
            agentEmail = element.email_agent;
        }
    })


    // console.log(lead, clientEmail, agentEmail);

               
    await fetch(reminderDataEmailUrl,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }, 
        body:JSON.stringify({
            lead : lead , 
            clientEmail : clientEmail,
            agentEmail : agentEmail
        })
    }).then(async (response) => {

        console.log(response.status);
           await updateLeadDate(leadID)
           .then(async ()=>{
            $('#remindersTable').DataTable().destroy();
            await removeLocalData();
            await fetchDataFromAPI();
            displayCurrentConnections();
            populateRemindersTable();
        })
           .catch((err)=>console.log(err));
    
      }).catch((err) => {
        console.log(err);
      });



}


let updateLeadDate = (leadID) => { return new Promise (async (resolve, reject)=>{
    console.log('Test');
        await fetch(`${updateLeadDateUrl}/${leadID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            }
        }).then((response)=>{

            resolve(response.status);

        }).catch((err)=>{
            reject(err);
        });


});
}




let populateLogsTable = async () => { 

    $('#remindersLogsTable').DataTable().destroy();
         // using jQuery for the Datatable
      const remindersLogsTable = $('#remindersLogsTable').DataTable({
        "lengthChange": false,
        "pageLength" : 20,
        "scrollY": "600px",
        "responsive" : true,
        "deferRender" : true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]



        }).clear().draw();



        // we query for leads
        await queryAPI(logsRemindersUrl, 'GET', '',(err, data)=>{
            if(err) console.log(err);
            
           
           
            
                JSON.parse(localStorage.getItem('leadsData')).forEach((lead)=>{

                    data.forEach((element)=>{
                    if(element.lead_id == lead.id){
                                           
                        remindersLogsTable.row.add([

                            lead.id, 
                            lead.name,
                            lead.date,
                            lead.sent_date, 
                            lead.client,
                            'No data for now '        
                        ]);
                    
                    }
                  })
                });
            
                remindersLogsTable.draw();

        });




}











populateRemindersTable();