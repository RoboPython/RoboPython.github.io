var width = 700;
var height = 500;

var stage = new Konva.Stage({
  container: 'konvaContainer',
  width: width,
  height: height,
  id:"test",
});
var elements = document.getElementsByClassName("konvajs-content")
elements[0].id = "workingCanvas";
var backgroundLayer = new Konva.Layer();
var initialLine = new Konva.Line({
  points: [125,0,125,500],
  stroke: 'black',
});
var finalLine = new Konva.Line({
  points: [575,0,575,500],
  stroke: 'black',
});
var initialText = new Konva.Text({
  x: 5,
  y: 10,
  text: 'Initial State',
  fontSize: 20,
  fontFamily: 'Calibri',
  fill: 'black'
});
var finalText = new Konva.Text({
  x: 580,
  y: 10,
  text: 'Final State',
  fontSize: 20,
  fontFamily: 'Calibri',
  fill: 'black'
});

var timeText = new Konva.Text({
  x: 220,
  y: 415,
  text: 'Time',
  fontSize: 20,
  fontFamily: 'Calibri',
  fill: 'black'
});

var timeline = new Konva.Line({
  points: [220,450,
           370,450,
           370,435,
           400,450,
           370,465,
           370,450,
          ],
          fill: 'black',
          stroke: 'black',
          strokeWidth: 5,
          closed : true
});



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

backgroundLayer.add(initialLine);
backgroundLayer.add(finalLine);
backgroundLayer.add(initialText);
backgroundLayer.add(finalText);
backgroundLayer.add(timeline);
backgroundLayer.add(timeText);
stage.add(backgroundLayer);
