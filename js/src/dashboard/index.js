

let displayStats = async () => {

        let leads = JSON.parse(localStorage.getItem('leadsData'));
        let leadsWon = 0, leadsLost = 0, leadsWait = 0, leadsTotal = 0;
        leads.forEach(element => {

            leadsTotal++;
            if(element.status === 'In asteptare') leadsWait++;
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
let dates = [];
let regions = [];
leads.forEach(lead => {
    
  // Split timestamp into [ Y, M, D, h, m, s ] and retrieving t[1] thats the month to map the chart
  //t is the month in 01 format so it needs conversion to jan, feb etc. and also counting the leads from each date 
  let t = lead.date.split(/[- :]/);
  dates.push(t[1]);
    //this is getting the regions but we have to convert to viewable data
  let region = lead.region.replace(/ /g,'').toUpperCase().replace('Ș', 'S').replace('Ş', 'S').replace('Ț', 'T').replace('Ă','A');
  if(lead.region.length > 2)   regions.push(region);

 
});
// dates
let count = {};
dates.forEach(function(i) { count[i] = (count[i]||0) + 1;});

// regions 
let countRegions = {};
regions.forEach(function(i) { countRegions[i] = (countRegions[i]||0) + 1;});
countRegions.ALTELE = 0; 
for( const [key, value] of Object.entries(countRegions)){
    if(value <= 15 && key !== 'ALTELE'){
        countRegions.ALTELE += value;
        delete countRegions[key];
    }
}


new Chart(document.getElementById("chart2"),
{"type":"bar",
"data":{"labels":Object.keys(count)
,"datasets":[{"label":"Lead-uri in luna","data":Object.values(count),"fill":false,"backgroundColor":["rgba(236, 94, 105, 0.2)","rgba(255, 159, 64, 0.2)","rgba(241, 194, 5, 0.2)","rgba(99, 203, 137, 0.2)","rgba(0, 112, 224, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],"borderColor":["rgb(236, 94, 105)","rgb(255, 159, 64)","rgb(241, 194, 5)","rgb(99, 203, 137)","rgb(0, 112, 224)","rgb(153, 102, 255)","rgb(201, 203, 207)"],"borderWidth":1}]}
,"options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}});


new Chart(document.getElementById("chart4"),
{"type":"doughnut","data":{"labels":Object.keys(countRegions),
"datasets":[{"label":"My First Dataset","data":Object.values(countRegions)
,"backgroundColor":['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6',  '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']}]}});


}


displayLeadDataByMonth();









