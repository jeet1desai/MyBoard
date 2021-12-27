// Option
let OptionContainerEl = document.querySelector(".option-container");
let ToolContainerEl = document.querySelector(".tool-container");
let OptionFlag = false;

let PencilToolEl = document.querySelector(".pencil-tool");
let EraserToolEl = document.querySelector(".eraser-tool");

let PencilEl = document.querySelector(".pencil");
let EraserEl = document.querySelector(".eraser");
let StickyEl = document.querySelector(".sticky");
let UploadEl = document.querySelector(".upload");
let PencilFlag = false;
let EraserFlag = false;

// Hamburger option flag: true -> show, false -> hide
OptionContainerEl.addEventListener("click", (e) => {
  // console.log('option click...');

  OptionFlag = !OptionFlag;
  let IconEl = OptionContainerEl.children[0];
  // console.log(IconEl);

  if (OptionFlag) {
    // Open
    IconEl.classList.remove("fa-times");
    IconEl.classList.add("fa-bars");
    // console.log(ToolContainerEl.style.display !== "none")
    ToolContainerEl.style.display = "none";
    PencilToolEl.style.display = "none";
    EraserToolEl.style.display = "none";
  } else {
    // Close
    IconEl.classList.toggle("fa-bars");
    IconEl.classList.add("fa-times");
    ToolContainerEl.style.display = "inline-block";
  }
});

// Click On Pencil
PencilEl.addEventListener("click", (e) => {
  // console.log('pencil click...');
  PencilFlag = !PencilFlag;
  EraserFlag = false;
  if (PencilFlag) {
    // console.log('pencil open...');
    EraserToolEl.style.display = "none";
    PencilToolEl.style.display = "inline-block";
  } else {
    // Close
    // console.log('pencil close...');
    PencilToolEl.style.display = "none";
  }
});

// Click On Eraser
EraserEl.addEventListener("click", (e) => {
  // console.log('eraser click...');
  EraserFlag = !EraserFlag;
  PencilFlag = false;
  if (EraserFlag) {
    PencilToolEl.style.display = "none";
    EraserToolEl.style.display = "inline-block";
  } else {
    EraserToolEl.style.display = "none";
  }
});

// Click On Sticky Note
StickyEl.addEventListener("click", (e) => {
  // console.log("sticky note click...");

  PencilFlag = false;
  EraserFlag = false;
  PencilToolEl.style.display = "none";
  EraserToolEl.style.display = "none";

  const stickyNote = `
    <div class="sticky-header">
      <div class="minimize">
        <i class="fas fa-minus"></i>
      </div>
      <div class="remove">
        <i class="fas fa-times"></i>
      </div>
    </div>
    <div class="note-container">
      <textarea></textarea>
    </div>
  `;

  createStickyNote(stickyNote);
});

// Click On Upload Note as Sticky
UploadEl.addEventListener("click", (e) => {
  // console.log("upload click....");

  PencilFlag = false;
  EraserFlag = false;
  PencilToolEl.style.display = "none";
  EraserToolEl.style.display = "none";

  let inputEl = document.createElement("input");
  inputEl.setAttribute("type", "file");
  inputEl.setAttribute("accept", "image/*");
  inputEl.click();

  inputEl.addEventListener("change", (e) => {
    let file = inputEl.files[0];
    let url = URL.createObjectURL(file);

    const stickyNote = `
      <div class="sticky-header">
        <div class="minimize">
          <i class="fas fa-minus"></i>
        </div>
        <div class="remove">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="note-container">
        <img src="${url}" alt="image"></img>
      </div>
    `;

    createStickyNote(stickyNote);
  });
});

// Create Sticky Function
function createStickyNote(content) {
  let StickyContainerEl = document.createElement("div");
  StickyContainerEl.setAttribute("class", "sticky-container");

  StickyContainerEl.innerHTML = content;
  document.body.appendChild(StickyContainerEl);

  noteAction(StickyContainerEl);

  StickyContainerEl.onmousedown = function (event) {
    DragAndDrop(StickyContainerEl, event);
  };

  StickyContainerEl.ondragstart = function () {
    return false;
  };
}

// Minimize and Remove note function
function noteAction(StickyContainerEl) {
  let removeEl = StickyContainerEl.querySelector(".remove");
  let minimizeEl = StickyContainerEl.querySelector(".minimize");
  removeEl.addEventListener("click", (e) => {
    StickyContainerEl.remove();
  });

  minimizeEl.addEventListener("click", (e) => {
    let noteContainerEl = StickyContainerEl.querySelector(".note-container");
    let displayPro =
      getComputedStyle(noteContainerEl).getPropertyValue("display");

    if (displayPro === "none") {
      // console.log("yes");
      noteContainerEl.style.display = "block";
    } else {
      // console.log("No");
      noteContainerEl.style.display = "none";
    }
  });
}

// Drag and Drop Sticky note function
function DragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the element  at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
