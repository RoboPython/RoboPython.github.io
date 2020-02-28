var updateState= function(actionType,options){


    if (state.globalState==="Can Select"){
      //6
      if(actionType ==="mouseoutVertex"){
        mouseoutVertex();
        state.globalState = "None";
      }
      //1
      if(actionType === 'mousedownVertex'){
        mousedownVertex(options.id);
        state.globalState = "Selected";
      }
    }
  
  
    if (state.globalState==='Selected'){
      //3
      if(actionType==="mouseupVertex"){
        mouseupVertex();
        state.globalState = "Can Select";
      }
  
  
      //4
      if(actionType==="mouseup"){
        mouseup();
        state.globalState = "None";
      }
  
      //7
      if(actionType === "mousemove"){
        mousemove(options.pageX,options.pageY);
        state.globalState = "Selected";
      }
  
    }
  
    if(state.globalState === "None"){
      //5
      if (actionType === "mouseoverVertex"){
        mouseoverVertex(options.id);
        state.globalState = "Can Select";
      }
      if (actionType === "mousedown"){
        mousedown(options.pageX,options.pageY);
        state.globalState = "Selected";
      }
  
    }
  
  }