function* getVertexID() {
    var index = 0;
    while(true)
      yield index++;
  }
  
  function* getParticleID() {
    var index = 0;
    while(true)
      yield index++;
  }

var state = {
    globalState: "None",
    vertexID:getVertexID(),
    particleID:getParticleID(),
    Particles:{},
    Vertices:{},
    selectedVertexId: null,
    selectedParticleId: null,
    drawFlavour: 'e',
    offset: {"top":document.getElementById("workingCanvas").getBoundingClientRect().top, "left":document.getElementById("workingCanvas").getBoundingClientRect().left},
    initial: {"Charge":0,"Lepton number":0},
    final: {"Charge":0, "Lepton number":0}
  } ;
  
