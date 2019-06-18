

let displayStats = async () => {

        let leads = JSON.parse(localStorage.getItem('leadsData'));
        let leadsWon = 0, leadsLost = 0, leadsWait = 0, leadsTotal = 0;
        leads.forEach(element => {

            leadsTotal++;
            if(element.status === 'In lucru') leadsWait++;
            if(element.status === 'Pierdut') leadsLost++;
            if(element.status === 'Finalizat') leadsWon++;

        });


        document.getElementById('totalLeads').innerHTML = leadsTotal;
        document.getElementById('totalWon').innerHTML = leadsWon;
        document.getElementById('totalLost').innerHTML = leadsLost;
        document.getElementById('totalWait').innerHTML = leadsWait;

}


window.setInterval(async ()=>{

    try{ 
        displayStats();
    }
    

    catch (error){
        console.error(error);
    }



}, 5000);


let displayLeadDataByMonth = async () => {

let leads = JSON.parse(localStorage.getItem('leadsData'));

leads.forEach(lead => {
    
  // Split timestamp into [ Y, M, D, h, m, s ] and retrieving t[1] thats the month to map the chart
  //t is the month in 01 format so it needs conversion to jan, feb etc. and also counting the leads from each date 
  
  let t = lead.date.split(/[- :]/);
  console.log(t[1]);

  

});


new Chart(document.getElementById("chart2"),
{"type":"bar",
"data":{"labels":["January","February","March","April","May","June","July"]
,"datasets":[{"label":"My First Dataset","data":[65,59,80,81,56,55,40],"fill":false,"backgroundColor":["rgba(236, 94, 105, 0.2)","rgba(255, 159, 64, 0.2)","rgba(241, 194, 5, 0.2)","rgba(99, 203, 137, 0.2)","rgba(0, 112, 224, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],"borderColor":["rgb(236, 94, 105)","rgb(255, 159, 64)","rgb(241, 194, 5)","rgb(99, 203, 137)","rgb(0, 112, 224)","rgb(153, 102, 255)","rgb(201, 203, 207)"],"borderWidth":1}]}
,"options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}});



}


displayLeadDataByMonth();



new Chart(document.getElementById("chart4"),
{"type":"doughnut","data":{"labels":["Red","Blue","Yellow"],
"datasets":[{"label":"My First Dataset","data":[300,50,100]
,"backgroundColor":["rgb(236, 94, 105)","rgb(0, 112, 224)","rgb(241, 194, 5)"]}]}});





