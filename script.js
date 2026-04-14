function createPanel() {
  if (document.getElementById("zx-console")) return;

  const panel = document.createElement("div");
  panel.id = "zx-console";

  panel.innerHTML = `
    <div id="zx-header">ZX DEV PANEL</div>
    <div id="zx-output"></div>
    <input id="zx-input" placeholder="Enter JS here..." />
    <div id="zx-buttons">
      <button id="run">Run</button>
      <button id="clear">Clear</button>
    </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    #zx-console {
      position: fixed;
      top: 50px;
      left: 50px;
      width: 400px;
      background: #0d0d0d;
      color: #00ff9f;
      font-family: monospace;
      border: 1px solid #00ff9f;
      z-index: 999999;
      box-shadow: 0 0 10px #00ff9f;
    }
    #zx-header {
      padding: 5px;
      cursor: move;
      background: #001a14;
      font-weight: bold;
    }
    #zx-output {
      height: 200px;
      overflow-y: auto;
      padding: 5px;
      font-size: 12px;
    }
    #zx-input {
      width: 100%;
      border: none;
      outline: none;
      padding: 5px;
      background: black;
      color: #00ff9f;
    }
    #zx-buttons {
      display: flex;
    }
    #zx-buttons button {
      flex: 1;
      background: black;
      color: #00ff9f;
      border: 1px solid #00ff9f;
      cursor: pointer;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(panel);

  const output = document.getElementById("zx-output");
  const input = document.getElementById("zx-input");

  function log(msg) {
    const div = document.createElement("div");
    div.textContent = "> " + msg;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  document.getElementById("run").onclick = () => {
    try {
      const result = eval(input.value);
      log(result);
    } catch (e) {
      log("Error: " + e.message);
    }
  };

  document.getElementById("clear").onclick = () => {
    output.innerHTML = "";
  };

  // Dragging
  let isDragging = false, offsetX, offsetY;
  const header = document.getElementById("zx-header");

  header.onmousedown = (e) => {
    isDragging = true;
    offsetX = e.clientX - panel.offsetLeft;
    offsetY = e.clientY - panel.offsetTop;
  };

  document.onmouseup = () => isDragging = false;

  document.onmousemove = (e) => {
    if (isDragging) {
      panel.style.left = e.clientX - offsetX + "px";
      panel.style.top = e.clientY - offsetY + "px";
    }
  };

  log("Injected ✔");
}

document.getElementById("inject").onclick = createPanel;
