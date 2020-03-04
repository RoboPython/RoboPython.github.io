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


backgroundLayer.add(initialLine);
backgroundLayer.add(finalLine);
backgroundLayer.add(initialText);
backgroundLayer.add(finalText);
backgroundLayer.add(timeline);
backgroundLayer.add(timeText);
stage.add(backgroundLayer);
