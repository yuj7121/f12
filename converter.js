let checked;

function checkBox() {
  chrome.storage.sync.get(['checked'], function(result) {
    checked = result.checked ?? false;
  });
}
checkBox();

const converter = (node) => {
  if(!checked) {
    return;
  }
    if(node.nodeType == Node.TEXT_NODE && node.textContent) {
      // console.log("YAA" + node.textContent);
      len = node.textContent.length;
      console.log(len + " - " + node.textContent);

      content = "";
      
      if((node.textContent.trim().length === 0)
        || len == 0
        || node.textContent.indexOf("{") >= 0 
        || node.textContent.indexOf(":") >= 0
        || node.textContent.indexOf("=") >= 0
        || node.textContent.indexOf(":") >= 0
        || node.textContent[0] == " "
        || node.textContent[0] == "="
      ) {
        node.textContent = content;
      } else {
        if(node.parentNode) {
          info = "";
          if(node.parentNode.className) {
            info = "class=\"" + node.parentNode.className + "\"";
          } else if (node.parentNode.tagName) {
            info = "<" + node.parentNode.tagName + ">";
          }
          content += info.slice(0, len);
          len -= content.length;
        }
        for(let i = 0; i < len; i++) {
          content += i % 2 ? "█" : " ";
        }
        node.textContent = content;
      }
    }
    if(node.hasChildNodes()) {
      node.childNodes.forEach(converter);
    }
  }

  // convert if any new dom elems appear/chagne
  const refresher = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      console.log("yoeee");
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            converter(node);
          }
        });
      }
    }
});

// wait 500ms beofre applying
setTimeout(() => {
  converter(document);
  refresher.observe(document.body, { childList: true, subtree: true });
}, 500);
