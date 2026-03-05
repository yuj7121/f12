let checked;

let mouseHistory = [];
currMouse = {};

document.addEventListener('mousemove', (event) => {
  const x = event.pageX;
  const y = event.pageY - window.pageYOffset;
  // console.log(`x: ${x}, y: ${y}`);
  currMouse = {x, y};
});

function checkBox() {
  chrome.storage.sync.get(['checked'], function(result) {
    checked = result.checked ?? false;
  });
}
checkBox();

function hitTest(element) {
  if (!element) return;
  let box = element.getBoundingClientRect();
  for(pos of mouseHistory) {
    if (pos.x >= box.left && pos.x <= box.right 
      && pos.y >= box.top && pos.y <= box.bottom
    ) {
      return true;
    }
  }
  return false;
}

function setUpNode(node) {
  node.src = node.textContent;
  len = node.textContent.length;

  content = "";

  if(node.textContent.trim().length == 0) {
    return;
  }
  if(node.parentNode) {
    info = "";
    if(node.parentNode.className) {
      info = "<class=\"" + node.parentNode.className + "\">";
    } else if (node.parentNode.tagName) {
      info = "<" + node.parentNode.tagName + ">";
    }
    content += info.slice(0, len);
    len -= content.length;
  }
  for(let i = 0; i < len; i++) {
    content += content[i];
  }
  node.alt = content;
}

const converter = (node) => {
  if(!checked) {
    return;
  }
  if(node.hasChildNodes()) {
    node.childNodes.forEach(converter);
  }
  // for all child nodes:
  if(node.nodeType == Node.TEXT_NODE && node.textContent) {
    if(!node.src || !node.alt) {
      setUpNode(node);
    }

    if(hitTest(node.parentNode)) {
      node.textContent = node.alt;
      let tar = Math.random() * (node.src.length - 1);
      // CURRENTLY FIXING THISSSSSSSSSS
      node.src = node.src.slice(0, tar) + node.alt?.at(tar) + node.src.slice(tar + 1);
    } else {
      node.textContent = node.src;
    }
  }
}

const howManyPrevs = 5;
// everything here runs every 100 ms
setInterval(function() {
  mouseHistory.push(currMouse);
  if(mouseHistory.length > howManyPrevs) {
    mouseHistory.splice(0, mouseHistory.length - howManyPrevs);
  }
  converter(document);
}, 100); 
