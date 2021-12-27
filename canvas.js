let CanvasEl = document.querySelector("canvas");

CanvasEl.width = window.innerWidth;
CanvasEl.height = window.innerHeight;

// Canvas Api
let tool = CanvasEl.getContext("2d");
tool.beginPath(); //