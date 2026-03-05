
const checkbox = document.getElementById("onButton");

chrome.storage.sync.get("checked", ({ checked }) => {
    console.log("restored", checked);
    checkbox.checked = checked ?? false;
});

checkbox.addEventListener("change", (event) => {
    const { checked } = event.target;
    chrome.storage.sync.set({ checked });
    window.location.reload();
});
