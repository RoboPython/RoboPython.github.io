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


function sinePtsBuilder(x1,y1,x2,y2){
    totalPts = [x1,y1]

    //16 and 78 simply chosen for aesthetics
    periods = Math.round(Math.hypot((y2-y1),(x2-x1))/78)
    stepNumber = 16*periods

    vector1 = [(x2-x1)/Math.hypot((y2-y1),(x2-x1)),(y2-y1)/Math.hypot((y2-y1),(x2-x1))]
    vector2 = [-(y2-y1)/Math.hypot((y2-y1),(x2-x1)),(x2-x1)/Math.hypot((y2-y1),(x2-x1))]

    v1Scaling = Math.hypot((y2-y1),(x2-x1))/stepNumber
     
     for (i = 0; i <= stepNumber; i++) {
         flip = 0
         amplitude = 20
         flip = -Math.sin((i/stepNumber) *periods*2*Math.PI)
         totalPts.push(x1+vector1[0]*i*v1Scaling+amplitude*vector2[0]*flip)
         totalPts.push(y1+vector1[1]*i*v1Scaling+amplitude*vector2[1]*flip)
     }

     return totalPts
}

function coilPtsBuilder(x1,y1,x2,y2){

    pts = [x1,y1]
	//40 and 25 are artibtrary but look nice
	loops = Math.round(Math.hypot((y2-y1),(x2-x1))/40)
    steps = 25*loops 
	xStep = (x2-x1)/steps
	yStep = (y2-y1)/steps

    for (var i = 0; i < steps; i++) {
        pts.push((x1+xStep*i + 20 * Math.cos(-(Math.PI/5)+(loops*2 * Math.PI * i / steps))));
        pts.push((y1+yStep*i + 20 * Math.sin(-(Math.PI/5)+(loops*2 * Math.PI * i / steps))));
    }

	pts.push(x2)
	pts.push(y2)

    return pts
    

}


