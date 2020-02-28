//Todo list for errors
//Check initial isn't empty
//check final isn't empty
//no reactions in initial state
//no reaction in final state
//no more than 5 connections
//no less than 2 connections (outside initial or final)
//check each vertex is valid
//check quantum numbers like charge/etc






function findInitial() {
    const verticesInInitial = [];
    for (let i = 0; i < Object.keys(state.Vertices).length; i++) {
        if (state.Vertices[Object.keys(state.Vertices)[i]].x < 125) {
            verticesInInitial.push(state.Vertices[Object.keys(state.Vertices)[i]].id);
        }
    }
    return verticesInInitial
}

function findFinal() {
    const verticesInFinal = [];
    for (let i = 0; i < Object.keys(state.Vertices).length; i++) {
        if (state.Vertices[Object.keys(state.Vertices)[i]].x > 575) {
            verticesInFinal.push(state.Vertices[Object.keys(state.Vertices)[i]].id);
        }
    }
    return verticesInFinal
}


function checker() {
    floatingErrors = [];
    numberedErrors = [];
    /*Initial and final state checks*/
    initialVertices = findInitial();


    if (initialVertices.length === 0) {
        floatingErrors.push("No Particles In the initial State");
    }

      
    for (let i = 0; i < initialVertices.length; i++) {
        

        if (state.Vertices[initialVertices[i]].connections.length === 1) {
            if (particleInfo[state.Particles[state.Vertices[initialVertices[i]].connections[0]].name].lepton){
                if (state.Particles[state.Vertices[initialVertices[i]].connections[0]].anti){
                    state.initial["Lepton number"] -= 1;
                }else{
                    state.initial["Lepton number"] += 1;
                }
            }

            //finds the charge of the particles in initial state
            charge = particleInfo[state.Particles[state.Vertices[initialVertices[i]].connections[0]].name].charge;
            if (state.Particles[state.Vertices[initialVertices[i]].connections[0]].anti){
                charge = -charge;
            }
            state.initial["Charge"] += charge;

        } else {
            state.Vertices[initialVertices[i]].drawLabel(numberedErrors.length + 1);
            numberedErrors.push("Vertices in the initial state must only have 1 Connection");
        }

    }
    finalVertices = findFinal();
    if (finalVertices.length === 0) {
        floatingErrors.push("No Particles In the final State");
    }

    for (let i = 0; i < finalVertices.length; i++) {

        if (state.Vertices[finalVertices[i]].connections.length === 1) {
            //finds the charge of the particles in initial state
            if (particleInfo[state.Particles[state.Vertices[finalVertices[i]].connections[0]].name].lepton){
                if (state.Particles[state.Vertices[finalVertices[i]].connections[0]].anti){
                    state.final["Lepton number"] -= 1;
                }else{
                    state.final["Lepton number"] += 1;
                }
            }


            charge = particleInfo[state.Particles[state.Vertices[finalVertices[i]].connections[0]].name].charge;
            if (state.Particles[state.Vertices[finalVertices[i]].connections[0]].anti){
                charge = -charge;
            }
            state.final["Charge"] += charge;

        } else {
            state.Vertices[finalVertices[i]].drawLabel(numberedErrors.length + 1);
            numberedErrors.push("Vertices in the Final state must only have 1 Connection");
        }
    }

    for (let i=0; i< Object.keys(state.final).length;i++){
        if(parseFloat(state.final[Object.keys(state.final)[i]].toFixed(3)) !== parseFloat(state.initial[Object.keys(state.initial)[i]].toFixed(3))){

            floatingErrors.push(Object.keys(state.final)[i] +" not conserved");
        }
    }

    const initialAndFinalVertices = initialVertices.concat(finalVertices);

    //resets so it can be rechecked without clearing
    resetConservation();
    initialVertices =[];
    finalVertices = [];

    /*Rest of the Vertices*/

    for (let i = 0; i < Object.keys(state.Vertices).length; i++) {
        if (!(initialAndFinalVertices.includes(Number(Object.keys(state.Vertices)[i])))) {
            connections = state.Vertices[Object.keys(state.Vertices)[i]].connections;


            nameList = [];
            for(let k = 0; k<connections.length;k++){
                nameList.push(state.Particles[connections[k]].name);
            }
            nameSet = new Set(nameList);


            

            if (connections.length >= 5) {
                state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
                numberedErrors.push("No vertex should have more than 4 connections");
            }
            if (state.Vertices[Object.keys(state.Vertices)[i]].connections.length === 4) {

                purelyBosonic = true;
                for(let index = 0; index<nameList.length;index++){
                    if (particleInfo[nameList[index]].fermion === true){
                        purelyBosonic = false;
                    }
                }

                if (purelyBosonic === false){
                    state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
                    numberedErrors.push("Vertices connected to four particles cannot include fermions");
                }
                else{
                    //4 gluons
                    if (nameList[0] === 'g' &&
                        nameList[1]=== 'g' &&
                        nameList[2]=== 'g' &&
                        nameList[3]=== 'g')
                    {
                        console.log("Valid Vertex");
                    }

                    if (nameSet.has("w+") && nameSet.has("w-")){
                        nameList.splice(nameList.indexOf("w-"),1);
                        nameList.splice(nameList.indexOf("w+"),1);
                        
                        if((nameList[0] === "z" && nameList[1] === "z") ||
                           (nameList[0] === "γ" && nameList[1] === "γ") ||
                           (nameList[0] === "w+" && nameList[1] === "w-") ||
                           (nameList[0] === "w-" && nameList[1] === "w+") ||
                           (nameList[0] === "γ" && nameList[1] === "z") ||
                           (nameList[0] === "z" && nameList[1] === "γ")


                          ){
                        console.log("Valid Vertex");
                        }else{
							state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
							numberedErrors.push("Not a valid form of w+ w- vertex");
                        }

                    }

               }
            
            }
            if (state.Vertices[Object.keys(state.Vertices)[i]].connections.length === 3) {
                validVertex = false;
				if (nameSet.has("w+") && nameSet.has("w-") &&(nameSet.has("z")||nameSet.has("γ"))){
					console.log("Valid Vertex");
                    validVertex = true;
				}
                




                
                
                //3 gluons
                if (state.Particles[connections[0]].name === 'g' &&
                    state.Particles[connections[1]].name === 'g' &&
                    state.Particles[connections[2]].name === 'g'){
                            
                    console.log("Valid Vertex");
                    validVertex = true;

                }


                //Checks if it is on the from, 2 fermions and a boson 
                bosons = 0;
                outgoingFermions = 0;
                incomingFermions = 0;
                bosonName = null;
                
                for (let index =0; index<state.Vertices[Object.keys(state.Vertices)[i]].connections.length; index++)
                {   
                    if(particleInfo[state.Particles[state.Vertices[Object.keys(state.Vertices)[i]].connections[index]].name].fermion ===false){
                        bosons +=1;
                        bosonName = state.Particles[state.Vertices[Object.keys(state.Vertices)[i]].connections[index]].name;

                    }else{
                        if (state.Particles[state.Vertices[Object.keys(state.Vertices)[i]].connections[index]].backConnection === parseInt(Object.keys(state.Vertices)[i],10)){
                            outgoingFermions +=1;
                        }else{
                            incomingFermions +=1;
                        }
                    }
                }

                if (bosons ===1 && incomingFermions ===1 && outgoingFermions ===1){
                    nameList.splice(nameList.indexOf(bosonName),1);
					minusBoson = nameList;
                    if (bosonName === "w+" || bosonName === "w-"){
                        outgoing = 0;
                        incoming = 0;
                        
                        for (let index =0; index<state.Vertices[Object.keys(state.Vertices)[i]].connections.length; index++)
                        {   

                                if (state.Particles[state.Vertices[Object.keys(state.Vertices)[i]].connections[index]].backConnection === parseInt(Object.keys(state.Vertices)[i],10)){
                                    //outgoing += particleInfo
                                    outgoing += particleInfo[state.Particles[state.Vertices[Object.keys(state.Vertices)[i]].connections[index]].name].charge;
                                }else{
                                    incoming += particleInfo[state.Particles[state.Vertices[Object.keys(state.Vertices)[i]].connections[index]].name].charge;

                                }
                        }
                        //checks charges are flowing correctly
                        if(parseFloat(outgoing.toFixed(3)) !== parseFloat(incoming.toFixed(3))){
							state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
							numberedErrors.push("charges are wrong for w+");
                        }else{
                            if((particleInfo[nameList[0]].quark && particleInfo[nameList[1]].quark)){
                                if((particleInfo[nameList[0]].type != particleInfo[nameList[1]].type)){
                                    validVertex = true;
                                }else{
                                    state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
                                    numberedErrors.push("One must be up type and down type for quarks");
                                }


                                
                            }

                            else if((particleInfo[nameList[0]].lepton && particleInfo[nameList[1]].lepton)){

                                if((particleInfo[nameList[0]].flavour != particleInfo[nameList[1]].flavour)){
                                    state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
                                    numberedErrors.push("Neutrino and lepton must be of the same flavour, electron/ electron, muon/muon etc");
                                }else{
                                    validVertex = true;
                                }

                            
                            
                            }

                            else{
                                state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
                                numberedErrors.push("W<sup>+</sup> must use either 2 quarks or a neutrino and its partner lepton");
                            }
                            


                            
                        }

                        

                    }
                    if (bosonName === "z"){
						if (minusBoson[0] === minusBoson[1]){
							console.log("Valid Vertex");
                            validVertex = true;

						}else{
							state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
							numberedErrors.push("A Vertex with a Z boson should have 2 of the same fermions joined to it");
						}
                    }

                    if (bosonName === "γ"){
						if (minusBoson[0] === minusBoson[1]){
							if(particleInfo[minusBoson[0]].charge !=0){
								console.log("Valid Vertex");
                                validVertex = true;

							}else{
								state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
								numberedErrors.push("To interact with a photon the particles must be charged");
							}
						}else{
							state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
							numberedErrors.push("A Vertex with a photon should have 2 of the same charged fermions joined to it");
						}
                    }
                    if (bosonName === "g"){
						if (minusBoson[0] === minusBoson[1]){
							if(particleInfo[minusBoson[0]].quark){
								console.log("Valid Vertex");
                                validVertex = true;

							}else{
								state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
								numberedErrors.push("To interact with a gluon the particles must be quarks");
							}
						}else{
							state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
							numberedErrors.push("A Vertex with a gluon should have 2 of the same quarks joined to it");
						}

                    }

                }


                if (!validVertex){
                    state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
                    numberedErrors.push("Vertices with three connections should be formed of three bosons or an incoming and outgoing fermion and a boson ");
                }


                //w+ w- and photon or z-boson
                //else push error
            
            }
            if (state.Vertices[Object.keys(state.Vertices)[i]].connections.length === 2) {
                state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
                numberedErrors.push("No vertex should have just 2 connections");
            }
            if (state.Vertices[Object.keys(state.Vertices)[i]].connections.length === 1) {
                state.Vertices[Object.keys(state.Vertices)[i]].drawLabel(numberedErrors.length + 1);
                numberedErrors.push("No vertex outside final or initial states should have just 1 connection");
            }
        }
    }

    if (floatingErrors.length >0 || numberedErrors.length > 0){
        errorGenerator("floatingErrorContainer",floatingErrors);
        errorGenerator("numberedErrorContainer", numberedErrors);
    }else{
		const heading = document.getElementById("errorHeading");
		heading.innerText = "No Errors";
		const container = document.getElementById("floatingErrors");
		container.innerHTML = '';
		const container2 = document.getElementById("numberedErrors");
		container2.innerHTML = '';

    }
}

function errorGenerator(targetContainer, errors) {
		const heading = document.getElementById("errorHeading");
		heading.innerText = "Errors:"
		const container = document.getElementById(targetContainer);
		container.innerHTML = '';
		errors.forEach(err => {
			const row = document.createElement("li");
			row.innerText = err;
			container.appendChild(row);
		});

}
