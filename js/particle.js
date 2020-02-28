
function Particle (id,name,anti,xi,yi,xf,yf) {
    this.id = id;
    this.anti = false;
    this.xi = xi;
    this.xf = xf;
    this.yi = yi;
    this.yf = yf;
    this.name = name;
    this.xDiff = this.xf - this.xi;
    this.yDiff = this.yf - this.yi;
    this.mag = Math.hypot(this.xDiff,this.yDiff)
    this.frontConnection = null;
    this.backConnection = null;
    this.layer = new Konva.Layer();
    this.arrow = new Konva.Line({
          points: [
          (this.xi+this.xf)/2 +this.yDiff*0.025, (this.yi+this.yf)/2-this.xDiff*0.025,
          (this.xi+this.xf)/2 +this.xDiff*0.5, (this.yi+this.yf)/2+this.yDiff*0.05,
          (this.xi+this.xf)/2 -this.yDiff*0.025, (this.yi+this.yf)/2+this.xDiff*0.025,
          ],
          fill: 'black',
          stroke: 'black',
          strokeWidth: 5,
          closed : true
    });

    this.line = new Konva.Line({
            points: interpolate([
            this.xi,this.yi,
            this.xf,this.yf,
            ],10),
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 5,
            closed : false,
            tension:0,
    });







    this.text = new Konva.Text({
      x: (this.xi+this.xf)/2 +this.yDiff*0.12, 
      y: (this.yi+this.yf)/2-this.xDiff*0.12,
      text: this.name,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'black'
    });

    this.layer.add(this.line);
    if (this.name !=='g' && this.name !=='γ' && this.name !=='z'){
      this.layer.add(this.arrow);
    }
    this.layer.add(this.text);
    stage.add(this.layer);


    this.draw = function(){
      this.xDiff = this.xf - this.xi;
      this.yDiff = this.yf - this.yi;

      //not perfect but passable for now
      if(this.name === "w+" || this.name == "z" || this.name ==="w-"){
        var mag = Math.hypot(this.xDiff,this.yDiff);
        dash = Math.round(mag)/8;
        this.line.dash([dash/2,dash])
      }
     
      if(this.name === "γ"){
        this.line.setPoints(sinePtsBuilder(this.xi,this.yi,this.xf,this.yf));
      }

      if(this.name === "g"){
        this.line.setPoints(coilPtsBuilder(this.xi,this.yi,this.xf,this.yf));
      }




      //not perfect but really minor issue
      this.text.setX((this.xi+this.xf)/2 +this.yDiff*0.20);
      this.text.setY((this.yi+this.yf)/2-this.xDiff*0.20);


      this.arrow.setPoints([
          (this.xi+this.xf)/2 +this.yDiff*0.05, (this.yi+this.yf)/2-this.xDiff*0.05,
          (this.xi+this.xf)/2 +this.xDiff*0.1, (this.yi+this.yf)/2+this.yDiff*0.1,
          (this.xi+this.xf)/2 -this.yDiff*0.05, (this.yi+this.yf)/2+this.xDiff*0.05,
      ])


      this.layer.draw();
    }

    this.destroy = function(){
      this.layer.destroy();
    }

    this.setPoints = function(xi,yi,xf,yf){

      this.xi = xi;
      this.xf = xf;
      this.yi = yi;
      this.yf = yf;

      if (this.name === "γ"){
        this.line.setPoints(sinePtsBuilder(this.xi,this.yi,this.xf,this.yf));
	  }

	  else if (this.name === "g"){
        this.line.setPoints(coilPtsBuilder(this.xi,this.yi,this.xf,this.yf));
	  }

	  else{
		this.line.setPoints([this.xi,this.yi,this.xf,this.yf]);
	  }
    } 
}
