


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
            

            if(currentMonth === leadMonth){ // if they re equal we can make the difference between the days 
            currentDate = currentDate.getDate(); // getting the current day of the month 
            let difference = lead.sent_date.split("-",3)[2].substring(0,2) - currentDate; // making the difference between lead day and current day  
            // console.log(difference);
            if(difference*(-1) >= 7 && lead.status === 'In lucru'){ // if difference <= 7 days we have the possibility to remind 

                // we re getting all the leads id to populate table
                leadIDs.push(lead.id);

            }
           
            }
        });


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

            console.log(leadID, clientName);



}







populateRemindersTable();