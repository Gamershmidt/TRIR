const login = window.sessionStorage.getItem("login");
const lk = document.getElementById("lk");
const rating = document.getElementById("rating");
const rules = document.getElementById("rules");
const game = document.getElementById("game");
const left = document.getElementById("left");
const startgame = document.getElementById("startgame");
const timergame = document.getElementById("timer");
const pause = document.getElementById("pause");
const submit = document.getElementById("submit");
const restart = document.getElementById("restart");
const breaking = document.getElementById("break");
const contin = document.getElementById("continue");
const myTable = document.getElementById("myTable");
const rateTable = document.getElementById("rateTable");
flag = 0;
stopp = 0;
stop1 = 0;
stop2 = 0;
error = "ss";
coords = [465.7250061035156,553.9249877929688,642.125, 730.3250122070312, 818.5250244140625, 906.7250366210938, 994.9249877929688,1083.125];
ans = [0,0,0,0,0,0,0,0];
blocked = [0,0,0,0,0,0,0,0];
body = document.getElementById("body");
ball1 = document.getElementById("ball");
points = 0;
curtime = 0;
basetime = 0;
totaltime = 0;

left.addEventListener("change", (e) => {
    id = e.target.id;
    img = "../emotion/" + id[1] +".jpg";
    document.getElementById('right').style.backgroundImage = "url(../emotion/"+ id[1] +".png)";
    document.getElementById('right1').style.backgroundImage = "url(../emotion/"+ id[1] +".png)";
    $.ajax({
        type: "POST",
        url: '../php/mood.php',
        data: {login: login, mood: e.target.value},
        success: function(calc) {}});
})

menu.addEventListener("click", (event) => {
    if(event.target.id=="m1"){
        lk.classList.remove("lk-hidden");
        rules.classList.add('rules-hidden');
        game.classList.add("game-hidden");
        rating.classList.add("rating-hidden");
        if(startgame.classList.contains("pause-hidden")){
            shortbreak();
        }
        $.ajax({
            type: "POST",
            url: '../php/personalTable.php',
            data: {login: login},
            success: function(tabdata) {
                tablepers = JSON.parse(tabdata);
                for(var i=0; i<tablepers.length ; i++) {
                    var tr = document.createElement('tr');
                    for(var k = 0; k < 3; k++){
                        var td = document.createElement('td');
                        td.innerHTML = "";
                        tr.appendChild(td);
                    }
                    if(myTable.rows.length<= tablepers.length+1){
                        myTable.appendChild(tr);
                    }
                    
                    myTable.rows[i+1].cells[0].innerHTML = i+1;
                    myTable.rows[i+1].cells[1].innerHTML = tablepers[tablepers.length-1-i].points;
                    myTable.rows[i+1].cells[2].innerHTML = tablepers[tablepers.length-1-i].mood;
                }
            }
        });
        $.ajax({
            type: "POST",
            url: '../php/record.php',
            data: {login: login},
            success: function(reco) {
                if ((reco*1)%10 == 1){
                    document.getElementById("record").innerHTML = "Рекорд: " + reco + " очко";
                }
                else if((reco*1)%10 > 1 && (reco*1)%10 <5){
                    document.getElementById("record").innerHTML = "Рекорд: " + reco + " очка";
                }
                else{
                    document.getElementById("record").innerHTML = "Рекорд: " + reco + " очков";
                }
            }
        });
    }
    if(event.target.id=="m2"){
        lk.classList.add("lk-hidden");
        rules.classList.remove('rules-hidden');
        game.classList.add("game-hidden");
        rating.classList.add("rating-hidden");
        if(startgame.classList.contains("pause-hidden")){
            shortbreak();
        }
        
    }
    if(event.target.id=="m3"){
        lk.classList.add("lk-hidden");
        rules.classList.add('rules-hidden');
        game.classList.remove("game-hidden");
        rating.classList.add("rating-hidden");
        startgame.disabled = false;
    }
    if(event.target.id=="m4"){
        lk.classList.add("lk-hidden");
        rules.classList.add('rules-hidden');
        game.classList.add("game-hidden");
        rating.classList.remove("rating-hidden");
        if(startgame.classList.contains("pause-hidden")){
            shortbreak();
        }
        $.ajax({
            type: "POST",
            url: '../php/rating.php',
            data: {login: login},
            success: function(tabdata) {
                tablepers = JSON.parse(tabdata);
                for(var i=0; i<tablepers.length ; i++) {
                    var tr = document.createElement('tr');
                    for(var k = 0; k < 4; k++){
                        var td = document.createElement('td');
                        td.innerHTML = "";
                        tr.appendChild(td);
                    }
                    if(rateTable.rows.length<= tablepers.length+1){
                        rateTable.appendChild(tr);
                    }
                    
                    rateTable.rows[i+1].cells[0].innerHTML = i+1;
                    rateTable.rows[i+1].cells[1].innerHTML = tablepers[i].login;
                    if(tablepers[i].login == login){
                        rateTable.rows[i+1].cells[1].innerHTML = `<font color = "#ed0b0e">♥</font> ${tablepers[i].login}`;
                    }
                    rateTable.rows[i+1].cells[2].innerHTML = tablepers[i].points;
                    rateTable.rows[i+1].cells[3].innerHTML = tablepers[i].mood;
                }
            }
        });
    }
    if(event.target.id=="m5"){
        document.location.href = "../index.html";
    }
});


onload = function() {
    document.getElementById('greetings').innerHTML = `Козырь крести - <b>${login}</b> на месте!`;
    document.getElementById('left1').innerHTML = `Привет, <b>${login}</b>`;
    submit.disabled = true;
    breaking.disabled = true;
    restart.disabled = true;
    $("#h1").fadeOut(10);
    $("#h2").fadeOut(10);
    $("#h3").fadeOut(10);
    $.ajax({
        type: "POST",
        url: '../php/mood.php',
        data: {login: login, mood: ''},
        success: function(mood) {
            if(mood!="None"){
                for(var i=0; i<document.getElementsByName("r").length; i++){
                    if(document.getElementsByName("r")[i].value == mood){
                        document.getElementById('right').style.backgroundImage = "url(../emotion/"+
                        document.getElementsByName("r")[i].id[1] +".png)";
                        document.getElementById('right1').style.backgroundImage = "url(../emotion/"+
                        document.getElementsByName("r")[i].id[1] +".png)";
                        document.getElementsByName("r")[i].checked = true;
                    }
                }
            }
            else {
                document.getElementById('right1').style.backgroundImage = "url(../emotion/default.png)";
            }
        }});
    var dragObjects = document.getElementById('fishki').getElementsByClassName('money');
    $('#info').slideUp();
    for(var i=0; i<dragObjects.length; i++) {
        new DragObject(dragObjects[i]);
    }
    new DropTarget(document.getElementById('body'));
    new DropTarget(document.getElementById('fishki'));
    for (var i = 0; i< 8; i++){
        id = (i+1)+"";
        document.getElementsByClassName('money')[i].classList.add("disabled");
        document.getElementById(id).style.position = "absolute";
        document.getElementById(id).style.top = "143px";
        document.getElementById(id).style.left = coords[i] - 200+"px";
    }
    if(document.referrer == ""){
        document.location.href = "../index.html";
    }
    $.ajax({
        type: "POST",
        url: '../php/record.php',
        data: {login: login},
        success: function(reco) {
            if ((reco*1)%10 == 1){
                document.getElementById("record").innerHTML = "Рекорд: " + reco + " очко";
            }
            else if((reco*1)%10 > 1 && (reco*1)%10 <5){
                document.getElementById("record").innerHTML = "Рекорд: " + reco + " очка";
            }
            else{
                document.getElementById("record").innerHTML = "Рекорд: " + reco + " очков";
            }
        }
    });
    document.getElementById('startgame').style.position = "absolute";
    document.getElementById('startgame').style.top = "20px";
    document.getElementById('startgame').style.left = "230px";
    document.getElementById('pause').style.position = "absolute";
    document.getElementById('pause').style.top = "20px";
    document.getElementById('pause').style.left = "230px";
    document.getElementById('continue').style.position = "absolute";
    document.getElementById('continue').style.top = "20px";
    document.getElementById('continue').style.left = "230px";
    document.getElementById('break').style.position = "absolute";
    document.getElementById('break').style.top = "20px";
    document.getElementById('break').style.left = "320px";
    document.getElementById('timer').style.position = "absolute";
    document.getElementById('timer').style.top = "10px";
    document.getElementById('timer').style.left = "480px";
    document.getElementById('h1').style.position = "absolute";
    document.getElementById('h1').style.top = "10px";
    document.getElementById('h1').style.left = "740px";
    document.getElementById('h2').style.position = "absolute";
    document.getElementById('h2').style.top = "10px";
    document.getElementById('h2').style.left = "795px";
    document.getElementById('h3').style.position = "absolute";
    document.getElementById('h3').style.top = "10px";
    document.getElementById('h3').style.left = "880px";
    console.log($('#startgame').offset());
    $.ajax({
        type: "POST",
        url: '../php/personalTable.php',
        data: {login: login},
        success: function(tabdata) {
            tablepers = JSON.parse(tabdata);
            for(var i=0; i<tablepers.length ; i++) {
                var tr = document.createElement('tr');
                for(var k = 0; k < 3; k++){
                    var td = document.createElement('td');
                    td.innerHTML = "";
                    tr.appendChild(td);
                }
                if(myTable.rows.length<= tablepers.length+1){
                    myTable.appendChild(tr);
                }
                
                myTable.rows[i+1].cells[0].innerHTML = i+1;
                myTable.rows[i+1].cells[1].innerHTML = tablepers[tablepers.length-1-i].points;
                myTable.rows[i+1].cells[2].innerHTML = tablepers[tablepers.length-1-i].mood;
            }
        }
    });
    $.ajax({
        type: "POST",
        url: '../php/rating.php',
        data: {login: login},
        success: function(tabdata) {
            tablepers = JSON.parse(tabdata);
            console.log(tablepers);
            for(var i=0; i<tablepers.length ; i++) {
                var tr = document.createElement('tr');
                for(var k = 0; k < 4; k++){
                    var td = document.createElement('td');
                    td.innerHTML = "";
                    tr.appendChild(td);
                }
                if(rateTable.rows.length<= tablepers.length+1){
                    rateTable.appendChild(tr);
                }
                
                rateTable.rows[i+1].cells[0].innerHTML = i+1;
                rateTable.rows[i+1].cells[1].innerHTML = tablepers[i].login;
                if(tablepers[i].login == login){
                    rateTable.rows[i+1].cells[1].innerHTML = `<font color = "#ed0b0e">♥</font> ${tablepers[i].login}`;
                }
                rateTable.rows[i+1].cells[2].innerHTML = tablepers[i].points;
                rateTable.rows[i+1].cells[3].innerHTML = tablepers[i].mood;
            }
        }
    });
}

function DragObject(element) {
	element.dragObject = this;
	dragMaster.makeDraggable(element);
	var rememberPosition;
	var mouseOffset;
	this.onDragStart = function(offset) {
		var s = element.style;
		rememberPosition = {top: s.top, left: s.left, position: s.position}
		s.position = 'absolute';
		mouseOffset = offset;
	}
		
	this.hide = function() {
		element.style.display = 'none';
	}
	
	this.show = function() {
		element.style.display = '';
	}
	
	this.onDragMove = function(x, y) {
		element.style.top =  y - mouseOffset.y +'px';
		element.style.left = x - mouseOffset.x - 240 +'px';
	}
	
	this.onDragSuccess = function(dropTarget) { }
	
	this.onDragFail = function() {
		var s = element.style;
		s.top = rememberPosition.top;
		s.left = rememberPosition.left;
		s.position = rememberPosition.position;
	}
	
	this.toString = function() {
		return element.id;
	}
}

var dragMaster = (function() {
    var dragObject;
    var mouseDownAt;
	var currentDropTarget;
	function mouseDown(e) {
		e = fixEvent(e)
		if (e.which!=1) return
 		mouseDownAt = { x: e.pageX, y: e.pageY, element: this }
		addDocumentEventHandlers();
		return false
	}


function mouseMove(e){
		e = fixEvent(e)
		if (mouseDownAt) {
			if (Math.abs(mouseDownAt.x-e.pageX)<5 && Math.abs(mouseDownAt.y-e.pageY)<5) {
				return false
			}
			var elem  = mouseDownAt.element;
			dragObject = elem.dragObject;
			var mouseOffset = getMouseOffset(elem, mouseDownAt.x, mouseDownAt.y);
			mouseDownAt = null;
			dragObject.onDragStart(mouseOffset);
		}
		dragObject.onDragMove(e.pageX, e.pageY);
		var newTarget = getCurrentTarget(e);
		if (currentDropTarget != newTarget) {
			if (currentDropTarget) {
				currentDropTarget.onLeave();
			}
			if (newTarget) {
				newTarget.onEnter()
			}
			currentDropTarget = newTarget;
		}
		return false;
    }
function mouseUp(){
		if (!dragObject) { 
			mouseDownAt = null
		} else {
			if (currentDropTarget) {
				currentDropTarget.accept(dragObject);
				dragObject.onDragSuccess(currentDropTarget);
			} else {
				dragObject.onDragFail();
			}
			dragObject = null;
		}
		removeDocumentEventHandlers();
    }


	function getMouseOffset(target, x, y) {
		var docPos	= getOffset(target);
		return {x:x - docPos.left, y:y - docPos.top};
	}

	
function getCurrentTarget(e) {
		if (navigator.userAgent.match('MSIE') || navigator.userAgent.match('Gecko')) {
			var x=e.clientX, y=e.clientY
		} else {
			var x=e.pageX, y=e.pageY
		}
		dragObject.hide()
		var elem = document.elementFromPoint(x,y)
		dragObject.show()
		while (elem) {
			if (elem.dropTarget && elem.dropTarget.canAccept(dragObject)) {
				return elem.dropTarget
			}
			elem = elem.parentNode
		}
		return null
	}

function addDocumentEventHandlers() {
		document.onmousemove = mouseMove
		document.onmouseup = mouseUp
		document.ondragstart = document.body.onselectstart = function() {return false}
	}
	function removeDocumentEventHandlers() {
		document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = null
	}
    return {

		makeDraggable: function(element){
			element.onmousedown = mouseDown
		}
    }
}())

function DropTarget(element) {
	element.dropTarget = this;
	
	this.canAccept = function(dragObject) {
		return true
	}
	
	this.accept = function(dragObject) {
		this.onLeave()
		if(this+"" == "body"){
            ans[(dragObject+"")*1-1] = 1;
        }
        if(this+"" == "fishki"){
            blocked[(dragObject+"")*1-1] = 1;
            ans[(dragObject+"")*1-1] = 0;
        }
	}
	
	this.onLeave = function() {
	}
	
	this.onEnter = function() {
	}
	
	this.toString = function() {
		return element.id
	}
}

function fixEvent(e) {
	e = e || window.event;
	if ( e.pageX == null && e.clientX != null ) {
		var html = document.documentElement
		var body = document.body
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
	}

	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
	}

	return e
}

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}

function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect()
 
    var body = document.body;
    var docElem = document.documentElement;
 
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
 
    return { top: Math.round(top), left: Math.round(left) }
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
        elem = elem.offsetParent;     
    }
    return {top: top, left: left}
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function renderPuzzle(){
    mainnumber = submit.innerHTML;
    console.log(mainnumber);
    $.ajax({
        type: "POST",
        url: '../php/gamecalc.php',
        data: {point: mainnumber},
        success: function(calc) {
            arrcalc = calc.split (' ');
            shuffle(arrcalc);
            for (var i = 0; i< 8; i++){
                id = (i+1)+"";
                document.getElementsByClassName('money')[i].classList.remove("disabled");
                document.getElementById(id).innerHTML = `<sub><sub>${arrcalc[i]}</sub></sub>`;
                document.getElementById(id).style.position = "absolute";
                document.getElementById(id).style.top = "143px";
                document.getElementById(id).style.left = coords[i] - 200+"px";
            }
            ans = [0,0,0,0,0,0,0,0];
            blocked = [0,0,0,0,0,0,0,0];
        }       
    });
}
function renderNumber(){
    prev = submit.innerHTML;
    $.ajax({
        type: "POST",
        url: '../php/rendernum.php',
        data: {prev: prev},
        success: function(number) {
            submit.innerHTML = number;
        }       
    });
}
function interval(){
    time = 0;
    $.ajax({
        type: "POST",
        url: '../php/time.php',
        data:{login: login},
        complete: function(){console.log(time);
            timer = setInterval(function(){
                let strTimer = `${time}`;
                timergame.innerHTML = strTimer;
                time-=1;
                curtime = time;
                if(time < 1){
                    clearInterval(timer);
                    timer = null;
                    submit.click();  
                }
                
                
            }, 1000);
        },
        success: function(newtime){
            time = newtime;
            basetime = newtime;
        }
    });
}

function clean(){
    for (var i = 0; i<8; i++){
        tmp = 0;
        if(document.getElementById((i+1)+"").innerHTML[11]=="<"){
            tmp = document.getElementById((i+1)+"").innerHTML[10];
        }
        else{
            tmp = document.getElementById((i+1)+"").innerHTML[10]+ document.getElementById((i+1)+"").innerHTML[11];
        }
        document.getElementById((i+1)+"").innerHTML = "";//document.getElementById((i+1)+"").innerHTML.replace(tmp, " ");    
    }
    
}

submit.onclick = function(){
    submit.disabled = true;
    breaking.disabled = true;
    setTimeout(function(){submit.disabled = false;breaking.disabled = false;}, 3900);
    res = 0;
    for (var i = 0; i<8; i++){
        tmp = 0;
        if(ans[i]==1){
            if(document.getElementById((i+1)+"").innerHTML[11]=="<"){
                tmp = document.getElementById((i+1)+"").innerHTML[10]*1;
            }
            else{
                tmp = (document.getElementById((i+1)+"").innerHTML[10]+ document.getElementById((i+1)+"").innerHTML[11])*1;
            }
        }
        res+= tmp;
    }
    mainnumber = submit.innerHTML;
    $.ajax({
        type: "POST",
        url: '../php/answer.php',
        data: {points: res, login: login, mainPoint: mainnumber},
        complete: function(){
            $.ajax({
                type: "POST",
                url: '../php/points.php',
                data: {login: login},
                complete: function(){
                    if(error[0] == "0"){
                        document.getElementById('react').style.backgroundImage = "url(../emotion/1.png)";
                        document.getElementById("textres").innerHTML = "Очко!";
                    }
                    if(error[0] == "2"){
                        document.getElementById('react').style.backgroundImage = "url(../emotion/10.png)";
                        document.getElementById("textres").innerHTML = "Перебор";
                    }
                    if(error[0] == "1"){
                        document.getElementById('react').style.backgroundImage = "url(../emotion/9.png)";
                        document.getElementById("textres").innerHTML = "Недобор";
                    }
                    systemReaction();
                    if (flag == "1"){
                        clearInterval(timer);  
                    }
                    if(error[1] == "2"){
                        $("#h1").fadeOut(1000).fadeIn(500).fadeOut(300).fadeIn(1000);
                        setTimeout(function(){document.getElementById('h1').style.backgroundImage = "url(../img/piki.png)";},1800);
                    }
                    if(error[1] == "1"){
                        $("#h2").fadeOut(1000).fadeIn(500).fadeOut(300).fadeIn(1000);
                        setTimeout(function(){document.getElementById('h2').style.backgroundImage = "url(../img/piki.png)";},1800);
                    }
                    if(error[1] == "n"){
                        $("#h3").fadeOut(1000).fadeIn(500).fadeOut(300).fadeIn(1000);
                        setTimeout(function(){document.getElementById('h3').style.backgroundImage = "url(../img/piki.png)";},1800);
                    }
                    if(error[1] != "n"){
                        setTimeout(renderNumber, 1000);
                        setTimeout(renderPuzzle, 2000);
                        if(flag == "1" || timer == null){
                            timer = 1;
                            setTimeout(interval, 3000);
                        }  
                    }
                    else {
                        clearInterval(timer);
                        clean();
                        curtime = 0;
                        startgame.classList.remove("pause-hidden");
                        pause.classList.add("pause-hidden");
                        submit.disabled = true;
                        setTimeout(function(){
                            $("#h1").fadeOut(1000);
                            $("#h2").fadeOut(1000);
                            $("#h3").fadeOut(1000);
                        }, 3000);
                        /*document.getElementById('h1').style.backgroundImage = "url(../img/heart.png)";
                        document.getElementById('h2').style.backgroundImage = "url(../img/heart.png)";
                        document.getElementById('h3').style.backgroundImage = "url(../img/heart.png)";*/
                        submit.innerHTML = "21";
                        timergame.innerHTML = "60";
                        for (var i = 0; i< 8; i++){
                            id = (i+1)+"";
                            document.getElementsByClassName('money')[i].classList.add("disabled");
                            document.getElementById(id).style.position = "absolute";
                            document.getElementById(id).style.top = "143px";
                            document.getElementById(id).style.left = coords[i] - 200+"px";
                        }
                        $.ajax({
                            type: "POST",
                            url: '../php/end.php',
                            data: {login: login},
                            success: function(total){
                                setTimeout(function(){startgame.disabled = false;
                                    document.getElementById('react').style.backgroundImage = "url(../emotion/11.png)";
                                    document.getElementById("textres").innerHTML = `Игра окончена<br>Результат: ${total}`;
                                    timergame.innerHTML = "";
                                    systemReaction();
                                    setTimeout(function(){submit.disabled = true;}, 3000);
                                }, 3800);
                                
                            }
                        });
                        
                    }
                    
                },
                success: function(flag1){
                    flag = flag1;
                }
            });  
        },
        success: function(err) {
            error = err;
        }
    })
}

restart.onclick = function(){
    stopp = 1;
    setTimeout(function() {startgame.disabled = false;}, 2800);
    stop1 = 1;
    clearInterval(timer);
    $.ajax({
        type: "POST",
        url: '../php/end.php',
        data: {login: login},
        success: function(total){
            setTimeout(function(){
                document.getElementById('react').style.backgroundImage = "url(../emotion/11.png)";
                document.getElementById("textres").innerHTML = `Игра окончена<br>Результат: ${total}`;
                systemReaction();
            }, 100);
            
        }
    });
    if(!contin.classList.contains("pause-hidden")){
        $('#info').slideUp();
        contin.classList.add("pause-hidden");
    }
    document.getElementById('h1').style.backgroundImage = "url(../img/heart.png)";
    document.getElementById('h2').style.backgroundImage = "url(../img/heart.png)";
    document.getElementById('h3').style.backgroundImage = "url(../img/heart.png)";
    setTimeout(function() {startgame.click();}, 3000);
}

function paused(){
    clearInterval(timer);
}

function continued(){
    time4 = curtime;
    if(curtime!= 0){
        timer = setInterval(function(){
        let strTimer = `${time4}`;
        timergame.innerHTML = strTimer;
        time4-=1;
        curtime = time4;
        if(time4 < 1){
            clearInterval(timer);
            submit.click();
            timer = null;
        }console.log('cont');
    }, 1000);
    if(stopp == 1 || stop1 == 1){
        clearInterval(timer);
    }
    if(error[1] == "n"){
        clearInterval(timer);
    }
    if(flag == "1"){
        clearInterval(timer);
    }
    }
}

pause.onclick = function(){
    document.getElementById('react').style.backgroundImage = "url(../emotion/6.png)";
    document.getElementById("textres").innerHTML = "Пауза";
    pause.classList.add("pause-hidden");
    contin.classList.remove("pause-hidden");
    clearInterval(timer);
    clearInterval(timer);
    clearInterval(timer);
    $('#info').slideDown();
}

contin.onclick = function(){
    pause.classList.remove("pause-hidden");
    contin.classList.add("pause-hidden");
    $('#info').slideUp();
    time = curtime;
    timer = setInterval(function(){
        let strTimer = `${time}`;
        timergame.innerHTML = strTimer;
        time-=1;
        curtime = time;
        if(time < 1){
            clearInterval(timer);
            timer = null;
            submit.click();
        }console.log()
    }, 1000);
}


function systemReaction(){
    pause.disabled = true;
    paused();
    $('#info').slideDown();
    setTimeout(() => $('#info').slideUp(), 3000);
    if(flag!= "1"){
        setTimeout(continued, 3500);
    }
    setTimeout(function(){pause.disabled = false;}, 3500);
}

breaking.onclick = function(){
    breaking.disabled = true;
    restart.disabled = true;
    stopp = 1;
    $.ajax({
        type: "POST",
        url: '../php/end.php',
        data: {login: login},
        success: function(total){
            startgame.disabled = true;
            setTimeout(function(){
                document.getElementById('react').style.backgroundImage = "url(../emotion/11.png)";
                document.getElementById("textres").innerHTML = `Игра окончена<br>Результат: ${total}`;
                systemReaction();
                timergame.innerHTML = "";
                setTimeout(function() {startgame.disabled = false;}, 3500);
            }, 100);
            
        }
    });
    startgame.disabled = true;
    submit.disabled = true;
    submit.innerHTML = 21;
    clearInterval(timer);
    clean();
    for (var i = 0; i< 8; i++){
        id = (i+1)+"";
        document.getElementsByClassName('money')[i].classList.add("disabled");
        document.getElementById(id).style.position = "absolute";
        document.getElementById(id).style.top = "143px";
        document.getElementById(id).style.left = coords[i] - 200+"px";
    }
    $.ajax({
        type: "POST",
        url: '../php/break.php',
        data: {login: login},
        success: function() {
            if(!contin.classList.contains("pause-hidden")){
                $('#info').slideUp();
                contin.classList.add("pause-hidden");
            }
            $("#h1").fadeOut(1000);
            $("#h2").fadeOut(1000);
            $("#h3").fadeOut(1000);
            startgame.classList.remove("pause-hidden");
            pause.classList.add("pause-hidden");
            setTimeout(function() {
                document.getElementById('h1').style.backgroundImage = "url(../img/heart.png)";
                document.getElementById('h2').style.backgroundImage = "url(../img/heart.png)";
                document.getElementById('h3').style.backgroundImage = "url(../img/heart.png)";
            }, 1000)
            
            timergame.innerHTML = "";
            setTimeout(function(){clearInterval(timer);}, 2500);
        }
    })
}

function shortbreak() {
    breaking.disabled = true;
    restart.disabled = true;
    stopp = 1;
    $.ajax({
        type: "POST",
        url: '../php/end.php',
        data: {login: login},
        success: function(total){
            startgame.disabled = true;
            setTimeout(function(){
                setTimeout(function() {startgame.classList.remove("pause-hidden");/*startgame.disabled = false;*/}, 2800);
            }, 100);
            
        }
    });
    timergame.innerHTML = "";
    //submit.disabled = true;
    $("#h1").fadeOut(10);
    $("#h2").fadeOut(10);
    $("#h3").fadeOut(10);
    submit.innerHTML = 21;
    clearInterval(timer);
    clean();
    for (var i = 0; i< 8; i++){
        id = (i+1)+"";
        document.getElementsByClassName('money')[i].classList.add("disabled");
        document.getElementById(id).style.position = "absolute";
        document.getElementById(id).style.top = "143px";
        document.getElementById(id).style.left = coords[i] - 200+"px";
    }
    $.ajax({
        type: "POST",
        url: '../php/break.php',
        data: {login: login},
        success: function() {
            if(!contin.classList.contains("pause-hidden")){
                $('#info').slideUp();
                contin.classList.add("pause-hidden");
            }
            
            //startgame.classList.remove("pause-hidden");
            pause.classList.add("pause-hidden");
            document.getElementById('h1').style.backgroundImage = "url(../img/heart.png)";
            document.getElementById('h2').style.backgroundImage = "url(../img/heart.png)";
            document.getElementById('h3').style.backgroundImage = "url(../img/heart.png)";
            timergame.innerHTML = "";
            setTimeout(function(){submit.disabled = true;clean()}, 2800);
            setTimeout(function(){clearInterval(timer);}, 4500);
        }
    })
    

}

startgame.onclick = function(){
    document.getElementById('h1').style.backgroundImage = "url(../img/heart.png)";
    document.getElementById('h2').style.backgroundImage = "url(../img/heart.png)";
    document.getElementById('h3').style.backgroundImage = "url(../img/heart.png)";
    $("#h1").fadeIn(1000);
    $("#h2").fadeIn(1000);
    $("#h3").fadeIn(1000);
    stopp = 0;
    contin.classList.add("pause-hidden");
    submit.disabled = false;
    breaking.disabled = false;
    restart.disabled = false;
    startgame.disabled = true;
    clearInterval(timer);
    startgame.classList.add("pause-hidden");
    pause.classList.remove("pause-hidden");
    $.ajax({
        type: "POST",
        url: '../php/start.php',
        data: {login: login},
        complete: function(){
            interval();
        },
        success: function() {
            renderPuzzle();
        }
    });
}

