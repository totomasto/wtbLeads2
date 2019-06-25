


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
            
            if(difference <= 7 && lead.status === 'In lucru'){ // if difference <= 7 days we have the possibility to remind 

                // we re getting all the leads id to populate table
                leadIDs.push(lead.id);

            }
           
            }
        });


        await populateTheActualTable(leadIDs);


}


populateRemindersTable();