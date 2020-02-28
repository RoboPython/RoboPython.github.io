function Vertex (id,x,y,updateState){
    this.x = x;
    this.y = y;
    this.id = id;
    this.connections = [];
    this.updateState = updateState;
    this.layer = new Konva.Layer();
    this.colour = 'black'
    this.circle = new Konva.Circle({
        x: this.x,
        y: this.y,
        radius: 20,
        fill: 'black',
    });

    this.destroy = function(){
      this.layer.destroy();
    }
    
    this.setX = function(value){
      this.circle.setX(value);
      this.x = value;
    }

    this.setY = function(value){
      this.circle.setY(value);
      this.y = value;
    }

    this.getX = function(){
      return this.x;
    }

    this.getY = function(){
      return this.y;
    }
    
    this.layer.add(this.circle);
    stage.add(this.layer);


    this.draw = function(){
      this.layer.draw();
    }

    this.text = new Konva.Text({
      x: this.x, 
      y: this.y,
      fontSize: 24,
      fontFamily: 'Calibri',
      fill: 'red'
    });
    this.layer.add(this.text);

    this.drawLabel= function(text){
      this.text.setX(this.x-7);
      this.text.setY(this.y-12);
      this.text.setText(text);
      this.layer.draw()
      this.layer.moveToTop();
    }

    

    var mouseover = function (id) {
      this.updateState("mouseoverVertex",{id});
    }
    this.circle.on('mouseover',()=>{mouseover(this.id)} );

    var mouseout = function(id){
      this.updateState("mouseoutVertex");
    }
    this.circle.on('mouseout', ()=>{mouseout(this.id)});

    var mousedown = function(id){
      this.updateState("mousedownVertex",{id});
    }
    this.circle.on('mousedown', ()=>{mousedown(this.id)});

    var mouseup = function(){
      this.updateState("mouseupVertex");
    }
    this.circle.on('mouseup', ()=>{mouseup(this.id)});
}
