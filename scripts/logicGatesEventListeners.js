document.addEventListener('mousemove', (e) => 
{
    mouseLine.p = e.x;
    mouseLine.q = e.y;
    if(newNode !== null && !newNodeFixed)
    {
        newNode.x = newNode.type === 'MidNode' ? e.x : newNode.x;
        newNode.y = e.y;
        newNode.draw();
        if(newNode.type === 'MidNode') newNode.updateLocation();
    }
    if(grabNode)
    {
        if(selectedNode.type === 'RootStartNode' || selectedNode.type === 'RootEndNode')
        {
            if(limitGrabY) selectedNode.y = e.y + grabNodeYmargin;
            else if(limitGrabX) selectedNode.x = e.x + grabNodeXmargin;
            else
            {
                selectedNode.x = e.x + grabNodeXmargin;
                selectedNode.y = e.y + grabNodeYmargin; 
            }
        }
        else if(selectedNode.type === 'MidNode')
        {
            if(limitGrabY) selectedNode.y = e.y + grabNodeYmargin;
            else if(limitGrabX) selectedNode.x = e.x + grabNodeXmargin;
            else
            {
                selectedNode.x = e.x + grabNodeXmargin;
                selectedNode.y = e.y + grabNodeYmargin;
            }
            selectedNode.updateLocation();
        }
    }
});

document.addEventListener('mousedown', (e) => {
    grabNode = false;
    limitGrabY = false;
    limitGrabX = false;
    hold = true;
    newNodeFixed = true;
    newNode = null;
    for(let i = 0; i < clickableNodes.length; ++i)
    {
        if(clickableNodes[i] === undefined) continue;
        if(Math.sqrt(Math.pow(e.x - clickableNodes[i].x, 2) + Math.pow(e.y - clickableNodes[i].y, 2)) <= NodeRad)
        {
            clickableNodes[i].value = !clickableNodes[i].value;
            selectedNode.selected = false;
            selectedNode = clickableNodes[i];
            selectedNode.selected = true;
            return;
        }
    }
    for(let i = 0; i < joinableNodes.length; ++i)
    {
        if(joinableNodes[i] === undefined) continue;
        if(joinableNodes[i].type === 'StartNode' || joinableNodes[i].type === 'EndNode')
        {
            if(Math.sqrt(Math.pow(e.x - joinableNodes[i].x, 2) + Math.pow(e.y - joinableNodes[i].y, 2)) <= NodeBondEndRad)
            {
                if(joinableNodes[i].type === 'EndNode')
                {
                    mouseLine.x = joinableNodes[i].x;
                    mouseLine.y = joinableNodes[i].y;
                    mouseLine.p = e.x;
                    mouseLine.q = e.y;
                    mouseLine.startNode = joinableNodes[i];
                    trynaConnect = true;
                }
                else
                {
                    if(joinableNodes[i].connected)
                    {
                        mouseLine.x = joinableNodes[i].connectionLine.x;
                        mouseLine.y = joinableNodes[i].connectionLine.y;
                        mouseLine.p = e.x;
                        mouseLine.q = e.y;
                        mouseLine.startNode = joinableNodes[i].connectionLine.startNode;
                        trynaConnect = true;
                        joinableNodes[i].connected = false;
                        lines[lines.indexOf(joinableNodes[i].connectionLine)] = undefined;
                        joinableNodes[i].connectionLine = null;
                    }
                }
                return;
            }
        }
        else
        {
            if(Math.sqrt(Math.pow(e.x - joinableNodes[i].connectionX, 2) + Math.pow(e.y - joinableNodes[i].y, 2)) <= NodeBondEndRad)
            {
                if(joinableNodes[i].type === 'RootStartNode')
                {
                    mouseLine.x = joinableNodes[i].connectionX;
                    mouseLine.y = joinableNodes[i].y;
                    mouseLine.p = e.x;
                    mouseLine.q = e.y;
                    mouseLine.startNode = joinableNodes[i];
                    trynaConnect = true;
                }
                else if(joinableNodes[i].connected)
                {
                    mouseLine.x = joinableNodes[i].connectionLine.x;
                    mouseLine.y = joinableNodes[i].connectionLine.y;
                    mouseLine.p = e.x;
                    mouseLine.q = e.y;
                    mouseLine.startNode = joinableNodes[i].connectionLine.startNode;
                    trynaConnect = true;
                    joinableNodes[i].connected = false;
                    lines[lines.indexOf(joinableNodes[i].connectionLine)] = undefined;
                    joinableNodes[i].connectionLine = null;
                }
                return;
            }
        }
    }
    for(let i = 0; i < allNodes.length; ++i)
    {
        if(allNodes[i] === undefined) continue;
        if(allNodes[i].type === 'MidNode')
        {
            if(e.x > allNodes[i].x + (NodeBondEndRad) && e.x < allNodes[i].x + allNodes[i].width - (NodeBondEndRad) && e.y > allNodes[i].y && e.y < allNodes[i].y + allNodes[i].height)
            {
                selectedNode.selected = false;
                selectedNode = allNodes[i];
                selectedNode.selected = true;
                return;
            }
        }
        else if(Math.sqrt(Math.pow(e.x - allNodes[i].x, 2) + Math.pow(e.y - allNodes[i].y, 2)) <= NodeRad)
        {
            selectedNode.selected = false;
            selectedNode = allNodes[i];
            selectedNode.selected = true;
            return;
        }
    }
    selectedNode.selected = false;
    selectedNode = {};
});

document.addEventListener('mouseup', (e) => {
    hold = false;
    shiftCanvas = false;
    for(let i = 0; i < joinableNodes.length; ++i)
    {
        if(joinableNodes[i] === undefined) continue;
        if(joinableNodes[i].type === 'StartNode' || joinableNodes[i].type === 'EndNode')
        {
            if(Math.sqrt(Math.pow(e.x - joinableNodes[i].x, 2) + Math.pow(e.y - joinableNodes[i].y, 2)) <= NodeBondEndRad)
            {
                if(joinableNodes[i].type === 'StartNode' && trynaConnect)
                {
                    if(joinableNodes[i].connected)
                    {
                        lines[lines.indexOf(joinableNodes[i].connectionLine)] = undefined;
                        joinableNodes[i].connectionLine = null;
                    }
                    mouseLine.p = joinableNodes[i].x;
                    mouseLine.q = joinableNodes[i].y;
                    mouseLine.endNode = joinableNodes[i];
                    mouseLine.update();
                    let newLine = mouseLine;
                    lines.push(newLine);
                    mouseLine = new Line(0, 0, 0, 0, {}, {}, false);
                    trynaConnect = false;
                }
                return;
            }
        }
        else
        {
            if(Math.sqrt(Math.pow(e.x - joinableNodes[i].connectionX, 2) + Math.pow(e.y - joinableNodes[i].y, 2)) <= NodeBondEndRad)
            {
                if(joinableNodes[i].type === 'RootEndNode' && trynaConnect)
                {
                    if(joinableNodes[i].connected)
                    {
                        lines[lines.indexOf(joinableNodes[i].connectionLine)] = undefined;
                        joinableNodes[i].connectionLine = null;
                    }
                    mouseLine.p = joinableNodes[i].connectionX;
                    mouseLine.q = joinableNodes[i].y;
                    mouseLine.endNode = joinableNodes[i];
                    mouseLine.update();
                    let newLine = mouseLine;
                    lines.push(newLine);
                    mouseLine = new Line(0, 0, 0, 0, {}, {}, false);
                    trynaConnect = false;
                }
                trynaConnect = false;
                return;
            }
        }
    }
    trynaConnect = false;
})

scale.addEventListener('mouseup', (e) => {
    localStorage.setItem('scale', scale.value);
    let a = document.createElement('a');
    a.href = document.location.href;
    a.click();
})

document.addEventListener('keypress', (e) => {
    if(e.shiftKey && e.code === 'KeyA')
    {
        showAddMenu();
    }
    if(e.shiftKey && e.code === 'KeyD')
    {
        if(selectedNode.type !== undefined)
        {
            selectedNode.copy();
        }
    }
    if(e.code === 'KeyG')
    {
        grabNode = true;
        grabNodeXmargin = selectedNode.x - mouseLine.p;
        grabNodeYmargin = selectedNode.y - mouseLine.q;
    }
    if(e.code === 'KeyY' && grabNode)
    {
        limitGrabY = true;
        limitGrabX = false;
        grabNodeYmargin = selectedNode.y - mouseLine.q;
    }
    if(e.code === 'KeyX' && grabNode)
    {
        limitGrabX = true;
        limitGrabY = false;
        grabNodeXmargin = selectedNode.x - mouseLine.p;
    }
    if(e.code === 'KeyX' && !limitGrabX)
    {
        selectedNode.selected = false;
        if(selectedNode.type !== undefined) selectedNode.delete();
        selectedNode = {};
    }
})

addMenu.addEventListener('mouseleave', hideAddMenu)

searchMenu.addEventListener('mouseleave', hideSearchBox);

fileDropdown.addEventListener('mouseleave', hideFileDropdown);