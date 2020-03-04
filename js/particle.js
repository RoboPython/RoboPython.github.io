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
    this.w = 20;
    this.h = 10;

    this.calcArrowPoints = function(){
        v1 = [(this.xf-this.xi)/Math.hypot((this.yf-this.yi),(this.xf-this.xi)),(this.yf-this.yi)/Math.hypot((this.yf-this.yi),(this.xf-this.xi))]
        v2 = [-(this.yf-this.yi)/Math.hypot((this.yf-this.yi),(this.xf-this.xi)),(this.xf-this.xi)/Math.hypot((this.yf-this.yi),(this.xf-this.xi))]

        arrowPoints = [
        (this.xi+this.xf)/2 - (this.w/2)*v1[0] + v2[0]*this.h, (this.yi+this.yf)/2 -(this.w/2)*v1[1]+ v2[1]*this.h,
        (this.xi+this.xf)/2 + (this.w/2)*v1[0], (this.yi+this.yf)/2 +(this.w/2)*v1[1],
        (this.xi+this.xf)/2 - (this.w/2)*v1[0] - v2[0]*this.h, (this.yi+this.yf)/2 -(this.w/2)*v1[1]- v2[1]*this.h
        ]
        return arrowPoints
    }




    this.arrow = new Konva.Line({
          points: this.calcArrowPoints(),
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
            strokeWidth: 2,
            closed : false,
            tension:0,
    });






    
    this.text = new Konva.Text({
      x: (this.xi+this.xf)/2 + 10, 
      y: (this.yi+this.yf)/2 + 10,
      text: this.name,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'black',
      align:'center'

    });

    this.text.offsetX(Math.round(this.text.width()/2))
    this.text.offsetY(Math.round(this.text.height()/2))


    this.layer.add(this.line);
    if (this.name !=='g' && this.name !=='γ' && this.name !=='z'){
      this.layer.add(this.arrow);
    }
    this.layer.add(this.text);
    stage.add(this.layer);


    this.draw = function(){

      v1 = [(this.xf-this.xi)/Math.hypot((this.yf-this.yi),(this.xf-this.xi)),(this.yf-this.yi)/Math.hypot((this.yf-this.yi),(this.xf-this.xi))]
      v2 = [-(this.yf-this.yi)/Math.hypot((this.yf-this.yi),(this.xf-this.xi)),(this.xf-this.xi)/Math.hypot((this.yf-this.yi),(this.xf-this.xi))]

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

      this.text.setX(Math.round((this.xi+this.xf)/2 + (this.w/2)*v1[0]) + 30*v2[0]);
      this.text.setY(Math.round((this.yi+this.yf)/2 + (this.w/2)*v1[1]) + 30*v2[1]);
      this.arrow.setPoints(this.calcArrowPoints())



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
