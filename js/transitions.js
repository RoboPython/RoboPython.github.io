



/*
First ones are functions relating to actions that happen over vertices. Update state is called within the vertex class
*/

//1
function mousedownVertex(id){
    console.log("GOOOOOOOOOOOOOD");
    originVertex = state.Vertices[id];
  
    //generates id to use for new particle and new vertex being created
    var newParticleId = state.particleID.next().value;
    var newVertexId = state.vertexID.next().value;
  
    state.Particles[newParticleId] = new Particle(
                                        newParticleId,
                                        state.drawFlavour,
                                        false,
                                        state.Vertices[originVertex.id].getX(),
                                        state.Vertices[originVertex.id].getY(),
                                        state.Vertices[originVertex.id].getX(),
                                        state.Vertices[originVertex.id].getY(),
                                      )
  
    state.Vertices[newVertexId] = new Vertex(
                                        newVertexId,
                                        originVertex.getX(),
                                        originVertex.getY(),
                                        20
                                       );
  
    //wires in the connections between particles and vertices
    state.Particles[newParticleId].backConnection = originVertex.id;
    state.Particles[newParticleId].frontConnection = newVertexId;
    state.Vertices[newVertexId].connections.push(newParticleId);
    state.Vertices[originVertex.id].connections.push(newParticleId);
  
  
  
    state.selectedVertexId = newVertexId;
    state.selectedParticleId = newParticleId;
  
  
  }
  
  //2
  function addPotential(){
    console.log("addPotential");
  }
  
  //3
  function mouseupVertex(){
    console.log("mouseupVertex");
    console.log(state.Vertices);
  
    if (isFermion(state.Particles[state.selectedParticleId].name)){
      if (state.Vertices[state.Particles[state.selectedParticleId].frontConnection].getX() < state.Vertices[state.Particles[state.selectedParticleId].backConnection].getX()){
          state.Particles[state.selectedParticleId].text.setText(state.Particles[state.selectedParticleId].text.getText()+String.fromCharCode(parseInt("305X",16)))
          state.Particles[state.selectedParticleId].draw()
          state.Particles[state.selectedParticleId].anti = true


      }else{
        state.Particles[state.selectedParticleId].text.text = state.Particles[state.selectedParticleId].name;
        console.log("forwards")
        state.Particles[state.selectedParticleId].text.setText(state.Particles[state.selectedParticleId].text.text)
        state.Particles[state.selectedParticleId].draw()
      }
    } 
    
    connect();
  }
  
  //4
  function mouseup(){
    console.log("mouseup");
    connect();
    state.selectedVertexId = null;
  }
  
  //5
  function mouseoverVertex(id){
    console.log("mouseoverVertex");
    console.log(id)
  }
  
  //6
  function mouseoutVertex(){
    console.log("mouseoutVertex");
  }
  
  //7
  function mousemove(pageX,pageY){
    var draggedVertex = state.Vertices[state.selectedVertexId];
    var draggedParticle = state.Particles[state.selectedParticleId];
  
  
    draggedParticle.setPoints(state.Vertices[draggedParticle.backConnection].getX(),state.Vertices[draggedParticle.backConnection].getY(),pageX,pageY);
    draggedParticle.draw();
  
    draggedVertex.setX(pageX);
    draggedVertex.setY(pageY);
    draggedVertex.draw();
  
  }
  
  function mousedown(pageX,pageY){
    console.log("BAAAAAAAAAAAAAAAAAAAD");
    var originVertexId = state.vertexID.next().value;
    var newParticleId = state.particleID.next().value;
    var newVertexId = state.vertexID.next().value;
  
  
    state.Vertices[originVertexId] = new Vertex(
                                        originVertexId,
                                        pageX,
                                        pageY,
                                        20
                                       );
  
    originVertex = state.Vertices[originVertexId];
  
  
    
    state.Particles[newParticleId] = new Particle(
                                        newParticleId,
                                        state.drawFlavour,
                                        false,
                                        state.Vertices[originVertex.id].getX(),
                                        state.Vertices[originVertex.id].getY(),
                                        state.Vertices[originVertex.id].getX()+10,
                                        state.Vertices[originVertex.id].getY()+10,
                                      )
  
    
  
    state.Vertices[newVertexId] = new Vertex(
                                        newVertexId,
                                        originVertex.getX()+10,
                                        originVertex.getY()+10,
                                        20
                                       );
  
    //wires in the connections between particles and vertices
    state.Particles[newParticleId].backConnection = originVertex.id;
    state.Particles[newParticleId].frontConnection = newVertexId;
    state.Vertices[newVertexId].connections.push(newParticleId);
    state.Vertices[originVertex.id].connections.push(newParticleId);
  
  
  
    state.selectedVertexId = newVertexId;
    state.selectedParticleId = newParticleId;
  
  }




/*
Handlers for when the mouse isnt over a vertex, therefore have to be handled globally.
*/

//for releasing when not over a vertex
function handler(e) {
    e = e || window.event;
    
    
    var pageX = e.pageX - state.offset.left;
    var pageY = e.pageY - state.offset.top;
    
    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    updateState('mouseup');
    }
    // attach handler to the click event of the document
    if (document.attachEvent) document.attachEvent('onmouseup', handler);
    else document.addEventListener('mouseup', handler);
    
    
    
    //for moving when not over a vertex
    function handler2(e) {
    e = e || window.event;
    var pageX = e.pageX - state.offset.left;
    var pageY = e.pageY - state.offset.top;
    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    updateState('mousemove',{'pageX':pageX ,'pageY':pageY});
    }
    // attach handler to the click event of the document
    if (document.attachEvent) document.attachEvent('onmousemove', handler2);
    else document.addEventListener('mousemove', handler2);
    
    
    
    //rename from onclick...also set this so its mousedown just on the canvas and not while its trying to do 
    //for moving when not over a vertex
    function handler3(e) {
    e = e || window.event;
    var pageX = e.pageX - state.offset.left;
    var pageY = e.pageY - state.offset.top;
    // IE 8
    
    updateState('mousedown',{'pageX':pageX ,'pageY':pageY});
    }
    
    var container = document.getElementById("workingCanvas");
    //change so doesnt affect buttons
    if (container.attachEvent) container.attachEvent('mousedown', handler3);
    else container.addEventListener('mousedown', handler3);
    
    
    
    function handler4(e) {
        console.log("resize!");
        state.offset = {"top":document.getElementById("workingCanvas").getBoundingClientRect().top, "left":document.getElementById("workingCanvas").getBoundingClientRect().left}
    }
    window.addEventListener('resize', handler4, false)




    //just squirreling this into its own function, used to connect nodes when they over lap
    function connect(){
        intersectionActivated = false;
        intersectionId = null;
        for(var i=0;i<Object.keys(state.Vertices).length;i++){
          
          if(Object.keys(state.Vertices)[i]!= state.selectedVertexId){
            if (intersects(state.Vertices[state.selectedVertexId],state.Vertices[Object.keys(state.Vertices)[i]],state.Vertices[state.selectedVertexId].radius)){
              intersectionActivated = true;
              console.log("Intersection!")
              intersectionId = Object.keys(state.Vertices)[i];
            }
          }
        }
        
        if (intersectionActivated){
    
          state.Vertices[state.selectedVertexId].circle.destroy();
          state.Particles[state.selectedParticleId].frontConnection = state.Vertices[intersectionId].id;
          state.Vertices[intersectionId].connections.push(state.selectedParticleId);
          
          state.Particles[state.selectedParticleId].setPoints(
                                                                    state.Vertices[state.Particles[state.selectedParticleId].backConnection].getX(),
                                                                    state.Vertices[state.Particles[state.selectedParticleId].backConnection].getY(),
                                                                    state.Vertices[intersectionId].getX(),
                                                                    state.Vertices[intersectionId].getY(),
                                                                    );
          state.Particles[state.selectedParticleId].draw();
          state.Vertices[state.selectedVertexId].draw();
    
    
          delete state.Vertices[state.selectedVertexId]
        }else{
          console.log("no intersection");
        }
      state.selectedParticleId = null;
      state.selectedVertexId = null;
    }
    
    
