! function() {

    function SetCanvasArea() {
        CanvasWidth = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        CanvasHeight = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    function RefreshCanvas() {
        canvas2D.clearRect(0, 0, CanvasWidth, CanvasHeight);
        canvas2D.fillStyle = "#2473ab";
        canvas2D.fillRect(0, 0, CanvasWidth, CanvasHeight);
        canvas2D.fillStyle = "rgb(255,248,220)";
        var AllNodeList = [MouseCoor].concat(NodeList);
        var NodeV, LineWidth, DistanceX, DistanceY, Distance;
        NodeList.forEach(function(NodeI) {
            NodeI.x += NodeI.DX;
            NodeI.y += NodeI.DY;
            NodeI.DX *= (NodeI.x > CanvasWidth || NodeI.x < 0) ? -1 : 1;
            NodeI.DY *= (NodeI.y > CanvasHeight || NodeI.y < 0) ? -1 : 1;

            canvas2D.fillRect(NodeI.x - 0.5, NodeI.y - 0.5, 1, 1);

            for (var v = 0; v < AllNodeList.length; v++) {
                NodeV = AllNodeList[v];
                if (NodeI !== NodeV && null !== NodeV.x && null !== NodeV.y) {
                    DistanceX = NodeI.x - NodeV.x;
                    DistanceY = NodeI.y - NodeV.y;
                    Distance = DistanceX * DistanceX + DistanceY * DistanceY;

                    if (Distance < NodeV.max) {
                        if (NodeV === MouseCoor && Distance >= NodeV.max / 2) {
                            NodeI.x -= 0.03 * DistanceX;
                            NodeI.y -= 0.03 * DistanceY;
                        }
                        canvas2D.strokeStyle = "rgb(255,248,220)";
                        LineWidth = (NodeV.max - Distance) / NodeV.max;
                        canvas2D.beginPath(), canvas2D.lineWidth = LineWidth / 2;
                        canvas2D.moveTo(NodeI.x, NodeI.y), canvas2D.lineTo(NodeV.x, NodeV.y);
                        canvas2D.stroke();
                    }
                }
            }

            AllNodeList.splice(AllNodeList.indexOf(NodeI), 1);

        });
        RequestAnimationFrame(RefreshCanvas);
    }


    var canvas = document.createElement("canvas"),
        canvas2D = canvas.getContext("2d"),
        CanvasWidth,
        CanvasHeight,
        NodeList,
        RequestAnimationFrame = window.requestAnimationFrame,
        RandomNumber = Math.random,
        MouseCoor = { x: null, y: null, max: 20000 };
    canvas.id = "demo";
    canvas.style.cssText = "position:fixed;top:0;left:0;z-index:-1;opacity:0.5";
    canvas2D.fillStyle = "#2473ab";
    canvas2D.fillRect(0, 0, CanvasWidth, CanvasHeight);

    document.getElementsByTagName("body")[0].appendChild(canvas);

    SetCanvasArea();

    window.onresize = SetCanvasArea;

    window.onmousemove = function(i) {
        i = i || window.event;
        MouseCoor.x = i.clientX;
        MouseCoor.y = i.clientY;
    };

    window.onmouseout = function() {
        MouseCoor.x = null;
        MouseCoor.y = null;
    };

    for (NodeList = [], p = 0; 200 > p; p++) {
        var NodeX = RandomNumber() * CanvasWidth,
            NodeY = RandomNumber() * CanvasHeight,
            NodeDX = 2 * RandomNumber() - 1,
            NodeDY = 2 * RandomNumber() - 1;
        NodeList.push({ x: NodeX, y: NodeY, DX: NodeDX, DY: NodeDY, max: 6000 });
    }

    setTimeout(function() {
        RefreshCanvas();
    }, 100);
}();