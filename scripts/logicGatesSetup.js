const canvas = document.querySelector('#graph');
const ctx = canvas.getContext('2d');
const body = document.querySelector('body');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let scale = document.getElementById('scale');
scale.value = localStorage.getItem('scale') !== null ? localStorage.getItem('scale') : 1;
let globalScale = 1;
body.style.background = 'url("./images/graph.png")';
body.style.backgroundSize = 20/globalScale + '%';

let sideMargins;
let topMargin;
let bottomMargin;
let nodeEditorWidth;
let nodeEditorHeight;


let COLOR_1 = 'crimson';
let COLOR_2 = '#222';
let BACKGROUNDCOLOR_1 = '#333';
let STROKECOLOR_1 = 'grey';


let NodeRad;
let NodeBondLength;
let NodeBondHeight;
let NodeBondEndRad;


let rootStartNodes = [];
let rootEndNodes = [];


let clickableNodes = [];
let joinableNodes = [];
let lines = [];
let midNodes = [];
let allNodes = [];


let hold = false;
let trynaConnect = false;
let mouseLine = new Line(0, 0, 0, 0, {}, {}, false);


let basicNodes = {height: 50, width: 60};

let addMenu = document.querySelector('ul#dropdown');
let searchMenu = document.querySelector('ul#searchBox');

let newNode = null;
let newNodeFixed = false;
let newNodeX = 0;

let selectedNode = {};
let selectionColor = '#fff';
let grabNode = false;
let grabNodeXmargin = 0;
let grabNodeYmargin = 0;
let limitGrabX = false;
let limitGrabY = false;

let idCount = 0;

let saveString = '';

let fileDropdown = document.querySelector('ul#fileDropdown')

redefineScale();

function main()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // code ...
    // ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // backgroundPattern();
    // ctx.strokeStyle = STROKECOLOR_1;
    // ctx.strokeRect(sideMargins, topMargin, nodeEditorWidth, nodeEditorHeight);
    if(hold && trynaConnect) mouseLine.draw();
    lines.forEach((line) => {
        if(line === undefined) return;
        line.draw();
        line.updateLocation();
    });
    allNodes.forEach((node) => {
        if(node === undefined) return;
        node.draw();
    });
    requestAnimationFrame(main);
}

main()

function redefineScale()
{
    sideMargins = 50/globalScale;
    topMargin = 100/globalScale;
    bottomMargin = 50/globalScale;
    nodeEditorWidth = (canvas.width - (sideMargins * 2));
    nodeEditorHeight = (canvas.height - (topMargin + bottomMargin));
    NodeRad = (25/2)/globalScale;
    NodeBondLength = 30/globalScale;
    NodeBondHeight = 4/globalScale;
    NodeBondEndRad = (25/4)/globalScale;
}