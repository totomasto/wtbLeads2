let calculateLeaderboard = async () => {

    let leads = JSON.parse(localStorage.getItem('leadsData'));
    let clients = JSON.parse(localStorage.getItem('clientsData'));

    let leaderBoard = [];

    clients.forEach((client)=>{

        let actualClient = client.Name;
        let s = 0;
        let l = 0;
        let w = 0;


        leads.forEach((lead)=>{

            if(lead.client == actualClient){

            if(lead.status === 'Finalizat') s++;
            if(lead.status === 'Pierdut') l++;
            if(lead.status === 'In astepare') w++;

            }

        });

        leaderBoard.push({
            clientName : actualClient,
            slead:  s,
            llead:  l,
            wlead:  w
        });

    })
    
    



          leaderBoard =   leaderBoard.sort(function(a,b){
                return b.slead - a.slead;
            })


            console.log(leaderBoard);


}














calculateLeaderboard();