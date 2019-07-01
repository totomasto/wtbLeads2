

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
    
           await setTimeout(function(){downloadFile(data.filename)}, 2000);
      }).catch((err) => {
        console.log(err);
      });




}



let downloadFile = async (filename)=>{
  // let path = `http://localhost:5000/reports`;
  // console.log(`${path}/${filename}`);
  let path = `http://192.168.1.252/reports`;
  let link = document.createElement('a');
  link.setAttribute('href',`${path}/${filename}`); 
  link.setAttribute('type','application/octet-stream');
  
  link.click();
  // stop loading screen 
  // loadingModal(false);
  
  }