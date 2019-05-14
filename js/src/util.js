let queryAPI = async (url, method, body, callback) => {

   await fetch(url,{
        method : method, 
        headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
    }).then(response => response.json()).then((data)=>{

        
            callback(null, data);


    }).catch((err)=>{
        console.log(err);
    })


}


let changeBtn = async (id) => {
      await checkIfOtherBtnIsPressed(id);
    let button = document.getElementById(id);

 
    if(button.innerHTML === 'Aplicat'){
        button.innerHTML = 'Aplica';
        button.className = 'btn btn-success btn-sm';
    } else {
        
        button.innerHTML = 'Aplicat';
        button.className = 'btn btn-warning btn-sm ';
        (id.includes('_')) ? localStorage.setItem('client', id) : localStorage.setItem('lead', id);   
        
    }

    checkForConnection();

}





let checkIfOtherBtnIsPressed = async(id)=>{

    if(id.includes('_')){

        if(localStorage.getItem('client')){
            try{
            let button = document.getElementById(localStorage.getItem('client'));
            button.innerHTML = 'Aplica';
            button.className = 'btn btn-success btn-sm';
            } catch(error){
                console.log('The button was not on the same page at client press');
            }
        } 

    } else {

        if(localStorage.getItem('lead')){
                try { 
            let button = document.getElementById(localStorage.getItem('lead'));
            button.innerHTML = 'Aplica';
            button.className = 'btn btn-success btn-sm';
                } catch(error){
                    console.log('The button was not on the same page at lead press');
                }
        }

    }


}


let discardPressedButtons = async () => {

   let leadBtn =  document.getElementById(localStorage.getItem('lead'))
   let clientBtn =  document.getElementById(localStorage.getItem('client'))

leadBtn.innerHTML= 'Aplica';
leadBtn.className = 'btn btn-success btn-sm';
clientBtn.innerHTML= 'Aplica';
clientBtn.className = 'btn btn-success btn-sm';

}




let deleteLead = async (id) =>{

    Object.keys(localStorage).forEach(function(key){

        if(key.includes(id)){
            localStorage.removeItem(key);
        }


    });


        displayCurrentConnections();
}