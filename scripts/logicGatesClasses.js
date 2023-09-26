class RootStartNode {
  constructor(x, y) {
    this.value = false;
    this.color = this.value ? COLOR_1 : COLOR_2;
    this.x = x;
    this.y = y;
    this.type = "RootStartNode";
    this.connectionX = this.x + NodeBondLength;
    this.connected = false;
    this.connectionLine = null;
    this.allNodeIndex = allNodes.length;
    this.rootStartNodeIndex = rootStartNodes.length;
    this.clickableNodeIndex = clickableNodes.length;
    this.joinableNodeIndex = joinableNodes.length;
    this.id = idCount;
    this.saveIndex = saveString.length;
    this.deleted = false;
    idCount++;
    rootStartNodes.push(this);
    allNodes.push(this);
    clickableNodes.push(this);
    joinableNodes.push(this);
    this.selected = false;
    this.draw = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(
        this.x,
        this.y - NodeBondHeight / 2,
        NodeBondLength,
        NodeBondHeight
      );
      ctx.beginPath();
      ctx.arc(this.x + NodeBondLength, this.y, NodeBondEndRad, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, NodeRad, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = this.selected ? selectionColor : "#000";
      ctx.stroke();
      this.update();
    };
    this.update = () => {
      this.color = this.value ? COLOR_1 : COLOR_2;
      this.saveString = `new RootStartNode(${this.x}, ${this.y}).value = ${this.value}`;
      this.connectionX = this.x + NodeBondLength;
    };
    this.delete = () => {
      joinableNodes[this.joinableNodeIndex] = undefined;
      allNodes[this.allNodeIndex] = undefined;
      clickableNodes[this.clickableNodeIndex] = undefined;
      rootStartNodes[this.rootStartNodeIndex] = undefined;
      if (this.connectionLine !== null) {
        lines.forEach((line) => {
          if (line === undefined) return;
          if (line.startNode.id === this.id || line.endNode.id === this.id) {
            line.delete();
          }
        });
      }
      this.deleted = true;
    };
    this.copy = () => {
      singleInputNode();
    };
  }
}

class StartNode {
  constructor(x, y) {
    this.value = false;
    this.color = this.value ? COLOR_1 : COLOR_2;
    this.x = x;
    this.y = y;
    this.type = "StartNode";
    this.connected = false;
    this.connectionLine = null;
    this.joinableNodeIndex = joinableNodes.length;
    this.deleted = false;
    this.id = idCount;
    idCount++;
    joinableNodes.push(this);
    this.draw = () => {
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(this.x, this.y, NodeBondEndRad, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      this.update();
    };
    this.update = () => {
      if (this.connectionLine !== null) this.value = this.connectionLine.value;
      else this.value = false;
      this.color = this.value ? COLOR_1 : COLOR_2;
    };
    this.delete = () => {
      joinableNodes[this.joinableNodeIndex] = undefined;
      if (this.connectionLine !== null) {
        lines.forEach((line) => {
          if (line === undefined) return;
          if (line.startNode.id === this.id || line.endNode.id === this.id) {
            line.delete();
          }
        });
      }
      this.deleted = true;
    };
  }
}

class RootEndNode {
  constructor(x, y) {
    this.value = false;
    this.color = this.value ? COLOR_1 : COLOR_2;
    this.x = x;
    this.y = y;
    this.type = "RootEndNode";
    this.connectionX = this.x - NodeBondLength;
    this.connected = false;
    this.connectionLine = null;
    this.allNodeIndex = allNodes.length;
    this.rootEndNodeIndex = rootEndNodes.length;
    this.clickableNodeIndex = clickableNodes.length;
    this.joinableNodeIndex = joinableNodes.length;
    this.id = idCount;
    this.deleted = false;
    idCount++;
    rootEndNodes.push(this);
    allNodes.push(this);
    clickableNodes.push(this);
    joinableNodes.push(this);
    this.selected = false;
    this.draw = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(
        this.x,
        this.y - NodeBondHeight / 2,
        -NodeBondLength,
        NodeBondHeight
      );
      ctx.beginPath();
      ctx.arc(this.x - NodeBondLength, this.y, NodeBondEndRad, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, NodeRad, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = this.selected ? selectionColor : "#000";
      ctx.stroke();
      this.update();
    };
    this.update = () => {
      if (this.connectionLine !== null) this.value = this.connectionLine.value;
      else this.value = false;
      this.color = this.value ? COLOR_1 : COLOR_2;
      this.connectionX = this.x - NodeBondLength;
      this.saveString = `new RootEndNode(${this.x}, ${this.y})`;
    };
    this.delete = () => {
      joinableNodes[this.joinableNodeIndex] = undefined;
      allNodes[this.allNodeIndex] = undefined;
      clickableNodes[this.clickableNodeIndex] = undefined;
      rootEndNodes[this.rootEndNodeIndex] = undefined;
      if (this.connectionLine !== null) {
        lines.forEach((line) => {
          if (line === undefined) return;
          if (line.startNode.id === this.id || line.endNode.id === this.id) {
            line.delete();
          }
        });
      }
      this.deleted = true;
    };
    this.copy = () => {
      singleOutputNode();
    };
  }
}

class EndNode {
  constructor(x, y) {
    this.value = false;
    this.color = this.value ? COLOR_1 : COLOR_2;
    this.x = x;
    this.y = y;
    this.type = "EndNode";
    this.connected = false;
    this.connectionLine = null;
    this.joinableNodeIndex = joinableNodes.length;
    this.id = idCount;
    this.deleted = false;
    idCount++;
    joinableNodes.push(this);
    this.draw = () => {
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(this.x, this.y, NodeBondEndRad, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      this.update();
    };
    this.update = () => {
      if (this.connectionLine !== null) this.value = this.connectionLine.value;
      else this.value = false;
      this.color = this.value ? COLOR_1 : COLOR_2;
    };
    this.delete = () => {
      joinableNodes[this.joinableNodeIndex] = undefined;
      if (this.connectionLine !== null) {
        lines.forEach((line) => {
          if (line === undefined) return;
          if (line.startNode.id === this.id || line.endNode.id === this.id) {
            line.delete();
          }
        });
      }
      this.deleted = true;
    };
  }
}

class Line {
  constructor(x, y, p, q, startNode, endNode, draw = true) {
    this.x = x;
    this.y = y;
    this.p = p;
    this.q = q;
    this.startNode = startNode;
    this.endNode = endNode;
    this.startNode.connected = true;
    this.endNode.connected = true;
    this.color = startNode.value ? COLOR_1 : STROKECOLOR_1;
    this.value = startNode.value;
    this.curveStrength = 50 / globalScale;
    this.lineIndex = lines.length;
    if (draw) {
      lines.push(this);
    }
    this.draw = () => {
      if (
        Math.abs(this.p - this.x) < 2 * 50 ||
        Math.abs(this.y - this.q) < 2 * 50
      ) {
        if (Math.abs(this.p - this.x) > Math.abs(this.y - this.q)) {
          this.curveStrength = Math.abs(this.y - this.q) / (2 * globalScale);
        } else {
          this.curveStrength = Math.abs(this.p - this.x) / (2 * globalScale);
        }
      } else this.curveStrength = 50 / globalScale;
      let inverse = false;
      if (this.x > this.p) inverse = true;
      let arc1X;
      let arc1Y;
      let arc1StartAngle;
      let arc1EndAngle;
      let arc1;
      let arc2X;
      let arc2Y;
      let arc2StartAngle;
      let arc2EndAngle;
      let arc2;
      if (!inverse) {
        arc1X = this.x + (this.p - this.x) / 2 - this.curveStrength;
        arc1Y =
          this.y > this.q
            ? this.y - this.curveStrength
            : this.y + this.curveStrength;
        arc1StartAngle = this.y > this.q ? Math.PI / 2 : -Math.PI / 2;
        arc1EndAngle = 0;
        arc1 = this.y > this.q ? true : false;
        arc2X = this.x + (this.p - this.x) / 2 + this.curveStrength;
        arc2Y =
          this.y < this.q
            ? this.q - this.curveStrength
            : this.q + this.curveStrength;
        arc2StartAngle = this.y > this.q ? Math.PI : -Math.PI;
        arc2EndAngle = this.y < this.q ? Math.PI / 2 : -Math.PI / 2;
        arc2 = this.y < this.q ? true : false;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
      } else {
        arc1X = this.x + this.curveStrength;
        arc1Y =
          this.y < this.q
            ? this.y - this.curveStrength
            : this.y + this.curveStrength;
        arc1StartAngle = this.y < this.q ? Math.PI / 2 : -Math.PI / 2;
        arc1EndAngle = 0;
        arc1 = this.y < this.q ? true : false;
        arc2X = this.x + this.curveStrength;
        arc2Y =
          this.y < this.q
            ? arc1Y - this.curveStrength
            : arc1Y + this.curveStrength;
        arc2StartAngle = 0;
        arc2EndAngle = this.y > this.q ? Math.PI / 2 : -Math.PI / 2;
        arc2 = this.y < this.q ? true : false;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(arc1X, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3 / globalScale;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(
          arc1X,
          arc1Y,
          this.curveStrength,
          arc1StartAngle,
          arc1EndAngle,
          arc1
        );
        ctx.arc(
          arc2X,
          arc2Y,
          this.curveStrength,
          arc2StartAngle,
          arc2EndAngle,
          arc2
        );
        ctx.stroke();
        arc1X = this.p - this.curveStrength;
        arc1Y = arc2Y;
        arc1StartAngle = this.y > this.q ? Math.PI / 2 : -Math.PI / 2;
        arc1EndAngle = this.y > this.q ? Math.PI : -Math.PI;
        arc1 = this.y < this.q ? true : false;
        arc2X = this.p - this.curveStrength;
        arc2Y =
          this.y < this.q
            ? this.q - this.curveStrength
            : this.q + this.curveStrength;
        arc2StartAngle = -Math.PI;
        arc2EndAngle = this.y < this.q ? Math.PI / 2 : -Math.PI / 2;
        arc2 = this.y < this.q ? true : false;
      }
      ctx.lineTo(
        arc1X,
        this.y < this.q
          ? arc1Y - this.curveStrength
          : arc1Y + this.curveStrength
      );
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3 / globalScale;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        arc1X,
        arc1Y,
        this.curveStrength,
        arc1StartAngle,
        arc1EndAngle,
        arc1
      );
      ctx.arc(
        arc2X,
        arc2Y,
        this.curveStrength,
        arc2StartAngle,
        arc2EndAngle,
        arc2
      );
      ctx.lineTo(this.p, this.q);
      ctx.stroke();
      ctx.closePath();
      ctx.lineWidth = 1;
      this.update();
    };
    this.update = () => {
      this.startNode.connected = true;
      this.endNode.connected = true;
      this.color = this.startNode.value ? COLOR_1 : STROKECOLOR_1;
      this.value = this.startNode.value;
      this.endNode.connectionLine = this;
      this.startNode.connectionLine = this;
      if (this.startNode.deleted || this.endNode.deleted) this.delete();
      this.saveString = `new Line(${this.x}, ${this.y}, ${this.p}, ${this.q}, ${this.startNode}, ${this.endNode})`;
    };
    this.updateLocation = () => {
      if (this.endNode.type === "RootEndNode")
        this.p = this.endNode.x - NodeBondLength;
      else this.p = this.endNode.x;
      this.q = this.endNode.y;
      if (this.startNode.type === "RootStartNode")
        this.x = this.startNode.x + NodeBondLength;
      else this.x = this.startNode.x;
      this.y = this.startNode.y;
    };
    this.delete = () => {
      lines[this.lineIndex] = undefined;
      this.startNode.connected = false;
      this.endNode.connected = false;
      this.endNode.connectionLine = null;
      this.startNode.connectionLine = null;
    };
  }
}

class AndNode {
  constructor(x, y) {
    this.inputs = [];
    this.inputLines = [];
    this.outputs = [];
    this.outputLines = [];
    this.height = basicNodes.height / globalScale;
    this.width = basicNodes.width / globalScale;
    this.x = x;
    this.y = y;
    this.fontSize = 15 / globalScale;
    let inputGap = this.height / 3;
    let outputGap = this.height / 2;
    this.type = "MidNode";
    this.name = "And";
    for (let i = 0; i < 2; ++i) {
      this.inputs.push(new StartNode(this.x, this.y + inputGap * (i + 1)));
      this.inputs[i].group = this;
    }
    for (let i = 0; i < 1; ++i) {
      this.outputs.push(
        new EndNode(this.x + this.width, this.y + outputGap * (i + 1))
      );
      this.outputs[i].group = this;
    }
    this.allNodeIndex = allNodes.length;
    this.midNodeIndex = midNodes.length;
    allNodes.push(this);
    midNodes.push(this);
    this.selected = true;
    this.draw = () => {
      // ctx.fillStyle = 'royalblue';
      ctx.fillStyle = "rgba(65,105,225,0.8)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = this.selected ? selectionColor : "#000";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = `${this.fontSize}px sans-serif`;
      ctx.fillText(
        "AND",
        this.x + this.width / 2,
        this.y + this.height / 2 + this.fontSize / 4
      );
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].draw();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].draw();
      }
      this.update();
    };
    this.update = () => {
      let res = this.inputs[0].value;
      for (let i = 1; i < this.inputs.length; ++i) {
        res &= this.inputs[i].value;
      }
      this.outputs[0].value = res === 0 ? false : true;
      // if() this.updateLocation();
      this.saveString = `new AndNode(${this.x}, ${this.y})`;
    };
    this.updateLocation = () => {
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].x = this.x;
        this.inputs[i].y = this.y + inputGap * (i + 1);
        if (this.inputs[i].connectionLine !== null)
          this.inputs[i].connectionLine.updateLocation();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].x = this.x + this.width;
        this.outputs[i].y = this.y + outputGap * (i + 1);
        if (this.outputs[i].connectionLine !== null)
          this.outputs[i].connectionLine.updateLocation();
      }
    };
    this.reScale = () => {
      this.height = basicNodes.height / globalScale;
      this.width = basicNodes.width / globalScale;
      this.fontSize = 15 / globalScale;
    };
    this.delete = () => {
      allNodes[this.allNodeIndex] = undefined;
      midNodes[this.midNodeIndex] = undefined;
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].delete();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].delete();
      }
    };
    this.copy = () => {
      addAndNode();
    };
  }
}

class OrNode {
  constructor(x, y) {
    this.inputs = [];
    this.inputLines = [];
    this.outputs = [];
    this.outputLines = [];
    this.height = basicNodes.height / globalScale;
    this.width = basicNodes.width / globalScale;
    this.x = x;
    this.y = y;
    this.fontSize = 15 / globalScale;
    let inputGap = this.height / 3;
    let outputGap = this.height / 2;
    this.type = "MidNode";
    for (let i = 0; i < 2; ++i) {
      this.inputs.push(new StartNode(this.x, this.y + inputGap * (i + 1)));
      this.inputs[i].group = this;
    }
    for (let i = 0; i < 1; ++i) {
      this.outputs.push(
        new EndNode(this.x + this.width, this.y + outputGap * (i + 1))
      );
      this.outputs[i].group = this;
    }
    this.allNodeIndex = allNodes.length;
    this.midNodeIndex = midNodes.length;
    allNodes.push(this);
    midNodes.push(this);
    this.selected = true;
    this.draw = () => {
      ctx.fillStyle = "purple";
      // ctx.fillStyle = 'rgba(65,105,225,0.8)';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = this.selected ? selectionColor : "#000";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = `${this.fontSize}px sans-serif`;
      ctx.fillText(
        "OR",
        this.x + this.width / 2,
        this.y + this.height / 2 + this.fontSize / 4
      );
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].draw();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].draw();
      }
      this.update();
    };
    this.update = () => {
      let res = this.inputs[0].value;
      this.outputs[0].value = res;
      if (res) return;
      for (let i = 1; i < this.inputs.length; ++i) {
        if (this.inputs[i].value) {
          res = this.inputs[i].value;
          this.outputs[0].value = res;
          return;
        }
      }
      this.outputs[0].value = res;
      // if() this.updateLocation();
      this.saveString = `new OrNode(${this.x}, ${this.y})`;
    };
    this.updateLocation = () => {
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].x = this.x;
        this.inputs[i].y = this.y + inputGap * (i + 1);
        if (this.inputs[i].connectionLine !== null)
          this.inputs[i].connectionLine.updateLocation();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].x = this.x + this.width;
        this.outputs[i].y = this.y + outputGap * (i + 1);
        if (this.outputs[i].connectionLine !== null)
          this.outputs[i].connectionLine.updateLocation();
      }
    };
    this.reScale = () => {
      this.height = basicNodes.height / globalScale;
      this.width = basicNodes.width / globalScale;
      this.fontSize = 15 / globalScale;
    };
    this.delete = () => {
      allNodes[this.allNodeIndex] = undefined;
      midNodes[this.midNodeIndex] = undefined;
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].delete();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].delete();
      }
    };
    this.copy = () => {
      addOrNode();
    };
  }
}

class Not {
  constructor(x, y) {
    this.inputs = [];
    this.outputs = [];
    this.height = basicNodes.height / globalScale;
    this.width = basicNodes.width / globalScale;
    this.fontSize = 15 / globalScale;
    this.x = x;
    this.y = y;
    let inputGap = this.height / 2;
    this.type = "MidNode";
    let outputGap = this.height / 2;
    for (let i = 0; i < 1; ++i) {
      this.inputs.push(new StartNode(this.x, this.y + inputGap * (i + 1)));
      this.inputs[i].group = this;
    }
    for (let i = 0; i < 1; ++i) {
      this.outputs.push(
        new EndNode(this.x + this.width, this.y + outputGap * (i + 1))
      );
      this.outputs[i].group = this;
    }
    this.allNodeIndex = allNodes.length;
    this.midNodeIndex = midNodes.length;
    midNodes.push(this);
    allNodes.push(this);
    this.selected = false;
    this.draw = () => {
      ctx.fillStyle = "rgba(34, 139, 34, 0.8)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = this.selected ? selectionColor : "#000";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = `${this.fontSize}px sans-serif`;
      ctx.fillText(
        "NOT",
        this.x + this.width / 2,
        this.y + this.height / 2 + this.fontSize / 4
      );
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].draw();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].draw();
      }
      this.update();
    };
    this.update = () => {
      let res = !this.inputs[0].value;
      this.outputs[0].value = res;
      this.saveString = `new Not(${this.x}, ${this.y})`;
    };
    this.updateLocation = () => {
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].x = this.x;
        this.inputs[i].y = this.y + inputGap * (i + 1);
        if (this.inputs[i].connectionLine !== null)
          this.inputs[i].connectionLine.updateLocation();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].x = this.x + this.width;
        this.outputs[i].y = this.y + outputGap * (i + 1);
        if (this.outputs[i].connectionLine !== null)
          this.outputs[i].connectionLine.updateLocation();
      }
    };
    this.reScale = () => {
      this.height = basicNodes.height / globalScale;
      this.width = basicNodes.width / globalScale;
      this.fontSize = 15 / globalScale;
    };
    this.delete = () => {
      allNodes[this.allNodeIndex] = undefined;
      midNodes[this.midNodeIndex] = undefined;
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].delete();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].delete();
      }
    };
    this.copy = () => {
      addNotNode();
    };
  }
}

class XorNode {
  constructor(x, y) {
    this.inputs = [];
    this.inputLines = [];
    this.outputs = [];
    this.outputLines = [];
    this.height = basicNodes.height / globalScale;
    this.width = basicNodes.width / globalScale;
    this.x = x;
    this.y = y;
    this.fontSize = 15 / globalScale;
    let inputGap = this.height / 3;
    let outputGap = this.height / 2;
    this.type = "MidNode";
    for (let i = 0; i < 2; ++i) {
      this.inputs.push(new StartNode(this.x, this.y + inputGap * (i + 1)));
      this.inputs[i].group = this;
    }
    for (let i = 0; i < 1; ++i) {
      this.outputs.push(
        new EndNode(this.x + this.width, this.y + outputGap * (i + 1))
      );
      this.outputs[i].group = this;
    }
    this.allNodeIndex = allNodes.length;
    this.midNodeIndex = midNodes.length;
    allNodes.push(this);
    midNodes.push(this);
    this.selected = true;
    this.draw = () => {
      // ctx.fillStyle = 'red';
      ctx.fillStyle = "rgba(221,32,32,0.8)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = this.selected ? selectionColor : "#000";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = `${this.fontSize}px sans-serif`;
      ctx.fillText(
        "XOR",
        this.x + this.width / 2,
        this.y + this.height / 2 + this.fontSize / 4
      );
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].draw();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].draw();
      }
      this.update();
    };
    this.update = () => {
      let res = this.inputs[0].value ^ this.inputs[1].value;
      this.outputs[0].value = res === 0 ? false : true;
      this.saveString = `new XorNode(${this.x}, ${this.y})`;
    };
    this.updateLocation = () => {
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].x = this.x;
        this.inputs[i].y = this.y + inputGap * (i + 1);
        if (this.inputs[i].connectionLine !== null)
          this.inputs[i].connectionLine.updateLocation();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].x = this.x + this.width;
        this.outputs[i].y = this.y + outputGap * (i + 1);
        if (this.outputs[i].connectionLine !== null)
          this.outputs[i].connectionLine.updateLocation();
      }
    };
    this.reScale = () => {
      this.height = basicNodes.height / globalScale;
      this.width = basicNodes.width / globalScale;
      this.fontSize = 15 / globalScale;
    };
    this.delete = () => {
      allNodes[this.allNodeIndex] = undefined;
      midNodes[this.midNodeIndex] = undefined;
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].delete();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].delete();
      }
    };
    this.copy = () => {
      addXorNode();
    };
  }
}

class XandNode {
  constructor(x, y) {
    this.inputs = [];
    this.inputLines = [];
    this.outputs = [];
    this.outputLines = [];
    this.height = basicNodes.height / globalScale;
    this.width = basicNodes.width / globalScale;
    this.x = x;
    this.y = y;
    this.fontSize = 15 / globalScale;
    let inputGap = this.height / 3;
    let outputGap = this.height / 2;
    this.type = "MidNode";
    for (let i = 0; i < 2; ++i) {
      this.inputs.push(new StartNode(this.x, this.y + inputGap * (i + 1)));
      this.inputs[i].group = this;
    }
    for (let i = 0; i < 1; ++i) {
      this.outputs.push(
        new EndNode(this.x + this.width, this.y + outputGap * (i + 1))
      );
      this.outputs[i].group = this;
    }
    this.allNodeIndex = allNodes.length;
    this.midNodeIndex = midNodes.length;
    allNodes.push(this);
    midNodes.push(this);
    this.selected = true;
    this.draw = () => {
      // ctx.fillStyle = 'red';
      ctx.fillStyle = "rgba(178,32,124,0.8)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = this.selected ? selectionColor : "#000";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = `${this.fontSize}px sans-serif`;
      ctx.fillText(
        "XAND",
        this.x + this.width / 2,
        this.y + this.height / 2 + this.fontSize / 4
      );
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].draw();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].draw();
      }
      this.update();
    };
    this.update = () => {
      let res = this.inputs[0].value === this.inputs[1].value;
      this.outputs[0].value = res;
      this.saveString = `new XandNode(${this.x}, ${this.y})`;
    };
    this.updateLocation = () => {
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].x = this.x;
        this.inputs[i].y = this.y + inputGap * (i + 1);
        if (this.inputs[i].connectionLine !== null)
          this.inputs[i].connectionLine.updateLocation();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].x = this.x + this.width;
        this.outputs[i].y = this.y + outputGap * (i + 1);
        if (this.outputs[i].connectionLine !== null)
          this.outputs[i].connectionLine.updateLocation();
      }
    };
    this.reScale = () => {
      this.height = basicNodes.height / globalScale;
      this.width = basicNodes.width / globalScale;
      this.fontSize = 15 / globalScale;
    };
    this.delete = () => {
      allNodes[this.allNodeIndex] = undefined;
      midNodes[this.midNodeIndex] = undefined;
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].delete();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].delete();
      }
    };
    this.copy = () => {
      addAndNode();
    };
  }
}

class NandNode {
  constructor(x, y) {
    this.inputs = [];
    this.inputLines = [];
    this.outputs = [];
    this.outputLines = [];
    this.height = basicNodes.height / globalScale;
    this.width = basicNodes.width / globalScale;
    this.x = x;
    this.y = y;
    this.fontSize = 15 / globalScale;
    let inputGap = this.height / 3;
    let outputGap = this.height / 2;
    this.type = "MidNode";
    this.name = "And";
    for (let i = 0; i < 2; ++i) {
      this.inputs.push(new StartNode(this.x, this.y + inputGap * (i + 1)));
      this.inputs[i].group = this;
    }
    for (let i = 0; i < 1; ++i) {
      this.outputs.push(
        new EndNode(this.x + this.width, this.y + outputGap * (i + 1))
      );
      this.outputs[i].group = this;
    }
    this.allNodeIndex = allNodes.length;
    this.midNodeIndex = midNodes.length;
    allNodes.push(this);
    midNodes.push(this);
    this.selected = true;
    this.draw = () => {
      // ctx.fillStyle = 'royalblue';
      ctx.fillStyle = "rgba(5,105,105,0.8)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = this.selected ? selectionColor : "#000";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = `${this.fontSize}px sans-serif`;
      ctx.fillText(
        "NAND",
        this.x + this.width / 2,
        this.y + this.height / 2 + this.fontSize / 4
      );
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].draw();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].draw();
      }
      this.update();
    };
    this.update = () => {
      let res = this.inputs[0].value;
      for (let i = 1; i < this.inputs.length; ++i) {
        res &= this.inputs[i].value;
      }
      this.outputs[0].value = res === 0 ? true : false;
      // if() this.updateLocation();
      this.saveString = `new NandNode(${this.x}, ${this.y})`;
    };
    this.updateLocation = () => {
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].x = this.x;
        this.inputs[i].y = this.y + inputGap * (i + 1);
        if (this.inputs[i].connectionLine !== null)
          this.inputs[i].connectionLine.updateLocation();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].x = this.x + this.width;
        this.outputs[i].y = this.y + outputGap * (i + 1);
        if (this.outputs[i].connectionLine !== null)
          this.outputs[i].connectionLine.updateLocation();
      }
    };
    this.reScale = () => {
      this.height = basicNodes.height / globalScale;
      this.width = basicNodes.width / globalScale;
      this.fontSize = 15 / globalScale;
    };
    this.delete = () => {
      allNodes[this.allNodeIndex] = undefined;
      midNodes[this.midNodeIndex] = undefined;
      for (let i = 0; i < this.inputs.length; ++i) {
        this.inputs[i].delete();
      }
      for (let i = 0; i < this.outputs.length; ++i) {
        this.outputs[i].delete();
      }
    };
    this.copy = () => {
      addNandNode();
    };
  }
}
