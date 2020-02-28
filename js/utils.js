function interpolate(points,insertNumber,amp){
    var xDiff = points[2]-points[0]
    var xStep = Math.round(xDiff/insertNumber);
    console.log(xStep)
    var yDiff = points[3]-points[1]
    var yStep = Math.round(yDiff/insertNumber);
  
    var newPoints = [points[0],points[1]];
    for(var i=1;i<insertNumber-1;i++){
        newPoints.push(points[0]+xStep*i);
        newPoints.push(points[1]+yStep*i);
    }
    newPoints.push(points[2]);
    newPoints.push(points[3]);
    console.log(newPoints);
      
    return newPoints
}

var setDrawFlavour = function(value){
    state.drawFlavour = value;
    document.getElementById('currentSelected').innerHTML = value;
}

function intersects(shape1,shape2,radius){
    if (Math.hypot(shape1.getX()-shape2.getX(),shape1.getY()-shape2.getY()) < 2*radius){
        return true;
    }else{
        return false;
    }
}

function resetConservation(){
        state.initial = {"Charge":0,"Lepton number":0},
        state.final =  {"Charge":0, "Lepton number":0}
}


function isFermion(flavour) {
    //rewrite to use particle info
    if (flavour === "w+" || flavour === "g" || flavour === "γ" || flavour === "z" || flavour ==="w-"){
      return false
    }else{
      return true
    }
  }


  function resetStage() {
    console.log("reset");
    const heading = document.getElementById("errorHeading");
    heading.innerText = "";
    const container = document.getElementById("floatingErrorContainer");
    container.innerHTML = '';
    const container2 = document.getElementById("numberedErrorContainer");
    container2.innerHTML = '';




    for(var i=0;i<Object.keys(state.Vertices).length;i++){
        state.Vertices[Object.keys(state.Vertices)[i]].destroy();
    }
    for(var i=0;i<Object.keys(state.Particles).length;i++){
        state.Particles[Object.keys(state.Particles)[i]].destroy();
    }
     state = {
        globalState: "None",
        vertexID:getVertexID(),
        particleID:getParticleID(),
        Particles:{},
        Vertices:{},
        selectedVertexId: null,
        selectedParticleId: null,
        drawFlavour: state.drawFlavour,
        offset: {"top":document.getElementById("workingCanvas").getBoundingClientRect().top, "left":document.getElementById("workingCanvas").getBoundingClientRect().left},
        initial: {"Charge":0,"Lepton number":0},
        final: {"Charge":0, "Lepton number":0}
      } ;
  }

