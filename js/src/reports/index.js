

let exportReportGeneral = async () => {

 
        
    await fetch(`/export/general`,{
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }, 
        body : JSON.stringify(JSON.parse(localStorage.getItem('leadsData')))
        
    }).then(response => response.json()).then(async (data) => {
    
            console.log(data);
    
      }).catch((err) => {
        console.log(err);
      });




}