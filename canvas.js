let CanvasEl = document.querySelector("canvas");
let DownloadEl = document.querySelector(".download");
let UndoEl = document.querySelector(".undo");
let RedoEl = document.querySelector(".redo");

let PencilColorEl = document.querySelectorAll(".pencil-color");
let PencilWidthEl = document.querySelector(".pencil-width");
let EraserWidthEl = document.querySelector(".eraser-width");

let pencilColor = "red";
let eraserColor = "white";
let pencilWidth = PencilWidthEl.value;
let eraserWidth = EraserWidthEl.value;

let UndoRedoTracker = []; // Data
let track = 0; // Which action want to perform from tracker

CanvasEl.width = window.innerWidth;
CanvasEl.height = window.innerHeight;

let mouseDown = false;

// Canvas Api
let tool = CanvasEl.getContext("2d");

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

// mouse down - start path
CanvasEl.addEventListener("mousedown", (e) => {
  mouseDown = true;
  tool.beginPath();
  tool.moveTo(e.clientX, e.clientY);
});

// mouse down move - path fill
CanvasEl.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    tool.lineTo(e.clientX, e.clientY);
    tool.stroke();
  }
});

// mouse up - end path
CanvasEl.addEventListener("mouseup", (e) => {
  mouseDown = false;

  // track for undo redo
  UndoRedoTracker.push(CanvasEl.toDataURL());
  track = UndoRedoTracker.length - 1;
});

// Pencil color change
PencilColorEl.forEach((colorEl) => {
  colorEl.addEventListener("click", (e) => {
    let color = colorEl.classList[0];
    pencilColor = color;
    tool.strokeStyle = color;
  });
});

// Pencil width change
PencilWidthEl.addEventListener("change", (e) => {
  pencilWidth = e.target.value;
  tool.lineWidth = pencilWidth;
});

// Eraser width change
EraserWidthEl.addEventListener("change", (e) => {
  eraserWidth = e.target.value;
  tool.lineWidth = eraserWidth;
});

// Click on Pencil
PencilEl.addEventListener("click", (e) => {
  tool.strokeStyle = pencilColor;
  tool.lineWidth = pencilWidth;
});

// Click on Eraser
EraserEl.addEventListener("click", (e) => {
  tool.strokeStyle = eraserColor;
  tool.lineWidth = eraserWidth;
});

// Click on Download
DownloadEl.addEventListener("click", (e) => {
  PencilFlag = false;
  EraserFlag = false;
  PencilToolEl.style.display = "none";
  EraserToolEl.style.display = "none";

  var link = document.createElement("a");
  link.download = "canvas.png";
  link.href = CanvasEl.toDataURL();
  link.click();
});

// Click on Undo
UndoEl.addEventListener("click", (e) => {
  // console.log("undo click...");

  PencilFlag = false;
  EraserFlag = false;
  PencilToolEl.style.display = "none";
  EraserToolEl.style.display = "none";

  if (track > 0) {
    track--;
  }

  undoRedoAction({
    track,
    UndoRedoTracker,
  });
});

// Click on Redo
RedoEl.addEventListener("click", (e) => {
  // console.log("redo click...");

  PencilFlag = false;
  EraserFlag = false;
  PencilToolEl.style.display = "none";
  EraserToolEl.style.display = "none";

  if (track < UndoRedoTracker.length - 1) {
    track++;
  }
  undoRedoAction({
    track,
    UndoRedoTracker,
  });
});

function undoRedoAction(tracker) {
  track = tracker.track;
  UndoRedoTracker = tracker.UndoRedoTracker;
 
  let img = new Image();
  img.src = UndoRedoTracker[track]
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, CanvasEl.width, CanvasEl.height)
  }
}
