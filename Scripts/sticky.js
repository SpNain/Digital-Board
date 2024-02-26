let sticky = document.querySelector("#sticky");
let stickyCount = 0;
let taskbarDiv;
sticky.addEventListener("click", function(e){
  addSticky();
});

function addSticky(imageElement) {
  stickyCount++;
  if (stickyCount == 1) {
    taskbarDiv = document.createElement('div');
    taskbarDiv.classList.add('s-taskbar');
    if (document.querySelector('#canvas').classList.contains('canvas-dark')) {
      taskbarDiv.classList.add('dark-s-taskbar');
    } else {
      taskbarDiv.classList.add('light-s-taskbar');
    }

    document.body.append(taskbarDiv);
  }

  let stickyDiv = document.createElement("div");
  stickyDiv.classList.add("sticky");
  stickyDiv.innerHTML = `<div class="sticky-header">
  <div class="minimize"><i class="fa-solid fa-minus"></i></div>
  <div class="close"><i class="fa-solid fa-xmark"></i></div>
  </div>`;

  let minimize = stickyDiv.querySelector(".minimize");
  let close = stickyDiv.querySelector(".close");
  let stickyHeader = stickyDiv.querySelector(".sticky-header");

  let stickyContent;
  if(imageElement){
    let stickyImageDiv = document.createElement("div");
    stickyImageDiv.classList.add("sticky-image-div");
    stickyDiv.append(stickyImageDiv);
    stickyImageDiv.append(imageElement);
    stickyContent = stickyImageDiv;
  }else{
     let stickyContentDiv = document.createElement("div");
     stickyContentDiv.classList.add("sticky-content");
     stickyContentDiv.setAttribute("contenteditable" , "true");
     stickyDiv.append(stickyContentDiv);
     stickyContent = stickyContentDiv;
  }

  minimize.addEventListener("click", function () {
    stickyDiv.style.display = "none";
    
    let msDiv = document.createElement('div');
    msDiv.classList.add('msdiv');
    msDiv.innerHTML += `<img class="s-img" src="../Img-Icons/s-img.png" alt="">`;

    msDiv.addEventListener('click', function () {
      stickyDiv.style.display = "block";
      msDiv.remove();
    });

    taskbarDiv.append(msDiv);
  });

  close.addEventListener("click", function () {
    stickyCount--;
    if (stickyCount == 0) {
      taskbarDiv.remove();
    }
    stickyDiv.remove();
  });

  let stickyHold = false;
  let initialX;
  let initialY;
  stickyHeader.addEventListener("mousedown", function (e) {
      stickyHold=true;
      initialX = e.clientX;
      initialY = e.clientY;
  });

  stickyHeader.addEventListener("mousemove", function (e) {
      if(stickyHold){
          let finalX = e.clientX;
          let finalY = e.clientY;
    
          let dx = finalX - initialX;
          let dy = finalY - initialY;
    
          let {top , left} = stickyDiv.getBoundingClientRect();
          stickyDiv.style.top = top + dy + "px";
          stickyDiv.style.left = left +dx + "px";
    
          initialX = finalX;
          initialY = finalY;
      }
  });

  stickyHeader.addEventListener("mouseup", function (e) {
      stickyHold = false;
  });

  document.body.append(stickyDiv);
}
