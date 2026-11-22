/*const app = new PIXI.Application({ antialias: true });
const loader = new PIXI.Loader();
document.body.appendChild(app.view);
const g = new PIXI.Graphics();

app.ticker.add(delta => gameLoop(delta));
app.stage.addChild(g);*/

var isDragging = false;
var initX = 0;
var initY = 0;
var initPosX = 0;
var initPosY = 0;
var posX = 0; // position on map of (0,0) on page
var posY = 0;
document.addEventListener("mousedown", (event)=> {
	isDragging = true;
	initX = event.pageX;
	initY = event.pageY;
	initPosX = posX;
	initPosY = posY;
	console.log("hit!");
});
document.addEventListener("mouseup", (event)=> {
	isDragging = false;
});
document.addEventListener("mousemove", (event)=> {
	if (isDragging) {
		posX = initPosX+(event.pageX-initX);
		posY = initPosY+(event.pageY-initY);
		updatePos();
	}
});

var puzzles = [["2+6","8",0,0,"white"],["1+1","2",100,0,"white"],["15+51","99",200,0,"white"],["9-1+5","13",300,0,"white"],["999-9","990",400,0,"white"],
			["2+6","8",0,100,"red"],["1+1","1",100,100,"red"],["15+51","66",200,100,"red"],["9-1+5","5",300,100,"red"],["999-9","99",400,100,"red"],
			["2+6","11",0,-100,"grey"],["1+1","2",100,-100,"grey"],["15+51","",99200,-100,"grey"],["9-1+5","0",300,-100,"grey"],["999-9","099-",400,-100,"grey"],
			
			["<span style='color:red'>3+5</span>-1","8",0,300,"white"],["<span style='color:red'>3+</span>5-1","9",100,300,"white"],
			["<span style='color:red'>3+5</span>","9",200,300,"grey"],
			["9+<span style='color:grey'>6+6</span>","90",300,300,"white"],["<span style='color:grey'>9+6</span>+6","57",400,300,"white"],

			["2x6","12",-100,0,"white"],["11x9","99",-200,0,"white"],["2/5","0.4",-300,0,"white"],["8/2","4",-400,0,"white"],
			["2x6","81",-100,-100,"grey"],["11x9","99",-200,-100,"grey"],["2/5","5.2",-300,-100,"grey"],["8/2","52.0",-400,-100,"grey"],

			["1+1","2",0,500,"blue"],["15+51","66",100,500,"blue"],["2+6","10",200,500,"blue"],["12x4","60",300,500,"blue"],["100/4","20",400,500,"blue"],
			["<span style='color:grey'>51+5</span>","55",-100,500,"blue"],["<span style='color:blue'>7+</span>10-3","16",-200,500,"white"],["79/5","15",500,500,"blue"],

			["x-6=8","14",0,700,"yellow"],["<span style='color:grey'>x-6=8</span>","1",0,800,"yellow"],
			["5x+6=66","12",100,700,"yellow"],["<span style='color:grey'>5x+6=66</span>","81",100,800,"yellow"],

			["2xx=8","4",300,700,"yellow"],["2xx=8","2",400,700,"yellow"],

			["1+2x3","7",0,900,"white"],["12/2+1","7",100,900,"white"],["5-3+2","6",200,900,"white"],["(1+2)x3","9",300,900,"white"],
			["1+2x3","9",0,1000,"orange"],["12/2+1","4",100,1000,"orange"],["5-3+2","0",200,1000,"orange"],["(1+2)x3","7",300,1000,"orange"],

			["<span style='color:yellow'>2x=4</span>+2","4",0, 1200, "white"], ["<span style='color:yellow'>2x=4</span>+2","3",100, 1200, "orange"],

			["2^3","8",0,-300,"white"],["2^3^2","64",100,-300,"white"],["2^(3^2)","512",200,-300,"white"],["2^2^2^(2^2)","65536",300,-300,"white"],
			["2^3^4-2","512",400,-300,"orange"],

			["6-<span style='color:grey'>1+5</span>", "-3", 1000,500,"white"],["6-<span style='color:grey'>1+5</span>", "01", 1000,600,"orange"],
			["2x<span style='color:grey'>6-6</span>","0",1000,700,"white"],["2x<span style='color:grey'>6-6</span>","21-",1000,800,"orange"],

			["a","1",1000,1000,"white"],["hi","72",1100,1000,"white"],["baa","2",1200,1000,"white"],["bxb","4",1300,1000,"white"],["bxb","96",1400,1000,"white"],];
var correct = [];
function init() {
	var map = document.getElementById("map");
	for (var i in puzzles) {
		map.innerHTML += "<div id='puzzle"+i+"'; style='position:absolute; box-sizing: border-box; display: block; align-content:center; background-color:"+puzzles[i][4]+"; text-align:center; border-style:solid; border-width:2px; top:"+puzzles[i][3]+"px; left:"+puzzles[i][2]+"px; width: 100px; height:100px'><div style='text-align:center'>"+puzzles[i][0]+"</div><br /><input id='input"+i+"' style='width:80px' onkeydown='if (event.keyCode == 13) submit(document.getElementById(\"input"+i+"\").value,"+i+");'/></div>";
		correct[i]=false;
	}
}
function updatePos() {
	var map = document.getElementById("map");
	map.style.transform = "translate("+posX+"px, "+posY+"px)";
	console.log("update!");
}
function submit(num,idx) {

	var item = document.getElementById("puzzle"+idx);
	if (correct[idx]) {
		return;
	}
	if(num==puzzles[idx][1]) {
		console.log("yes");
		item.style.borderColor = "green";
		correct[idx] = true;
	} else {
		console.log("no");
	}
}
/*function gameLoop(delta) {
	render();
}

function render() {

}*/
