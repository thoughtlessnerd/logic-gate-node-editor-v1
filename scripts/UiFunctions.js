function showSearchBox() {
  searchMenu.style.top = `${mouseLine.q - 20}px`;
  searchMenu.style.left = `${mouseLine.p - 50}px`;
  searchMenu.style.display = "initial";
  addMenu.style.display = "none";
}

function hideSearchBox() {
  searchMenu.children[0].children[0].value = "";
  searchMenu.style.display = "none";
}

function showAddMenu() {
  addMenu.style.top = `${mouseLine.q}px`;
  addMenu.style.left = `${mouseLine.p}px`;
  addMenu.style.display = "block";
  hideSearchBox();
}

function hideAddMenu() {
  addMenu.style.display = "none";
}

function singleInputNode() {
  newNode = new RootStartNode(sideMargins, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function singleOutputNode() {
  newNode = new RootEndNode(canvas.width - sideMargins, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function addAndNode() {
  newNode = new AndNode(mouseLine.p, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function addNotNode() {
  newNode = new Not(mouseLine.p, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function addOrNode() {
  newNode = new OrNode(mouseLine.p, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function addXorNode() {
  newNode = new XorNode(mouseLine.p, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function addXandNode() {
  newNode = new XandNode(mouseLine.p, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function addNandNode() {
  newNode = new NandNode(mouseLine.p, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function addNorNode() {
  newNode = new NorNode(mouseLine.p, mouseLine.q);
  newNodeFixed = false;
  hideAddMenu();
  hideSearchBox();
  selectedNode.selected = false;
  selectedNode = newNode;
  selectedNode.selected = true;
}

function saveFile() {
  saveString = "";
  allNodes.forEach((node) => {
    saveString += "\n" + node.saveString;
  });
  lines.forEach((line) => {
    saveString += "\n" + line.saveString;
  });
  localStorage.setItem("save", saveString);
}

function showFileDropdown() {
  fileDropdown.style.display = "initial";
}

function hideFileDropdown() {
  fileDropdown.style.display = "none";
}

function newFile() {
  allNodes = [];
  lines = [];
  selectedNode = {};
  midNodes = [];
  joinableNodes = [];
  clickableNodes = [];
  rootEndNodes = [];
  rootStartNodes = [];
  hideFileDropdown();
}
