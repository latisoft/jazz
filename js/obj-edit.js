


var msg = {};
(function(c) {

	function msgObject(guid, posX, posY) {
		this.id = guid;
		this.x = posX;
		this.y = posY;
	}

	var path = null;
	var json = null;
	var xobj = new msgObject(-1,0,0);
	var init = null;
	
	var load = function(fromPath) { alert(fromPath); };
	var save = function() { alert('save'); };
	
	alert('msg');
	
})(msg);

msg.load("hello path");
msg.save();



var alerts = [ 
    {num : 1, app:'helloworld',message:'message'},
    {num : 2, app:'helloagain',message:'another message'} 
]

alerts.push({num : 3, app:'helloagain_again',message:'yet another message'});

/*
// var obj = getObjectAt(125, 30);
function getObjectAt(x,y) {

    for(var i in currentMsg.object) {
        var obj = currentMsg.object[i];
        if( (obj.x==x) && (obj.y==y) ) {
            return obj;
        }
    }
    return null;
}

function loadMessage() { 

	$.getJSON('../sys/setup-object.json', function(json) {
		console.log( "Object Settings: " + json );

		objSettings = json;

		var	ID = $("#sltType").val();
		if(	initSetupFunctions[ID] )
			initSetupFunctions[ID]();	
	});
}
function saveMessage() {
	saveSetupPages();

	var jsonString = JSON.stringify( objSettings, null, "\t" );
	$.post('file.php', {
			filename: '../sys/setup-object.json',
			data: jsonString
		},
		function(data) {},
		'text');
}


function addText(data,size,font,angle) {} // add Text by json 
function addDatetime(format) {}
function addExpire() {}
function addCounter() {}
function addShift() {}
function addLogo() {}
function addBarcode() {}
function addString() {}

// delete this object with (x,y)
function delText(x,y) {}
function delDatetime(x,y) {}
function delExpire(x,y) {}
function delCounter(x,y) {}
function delShift(x,y) {}
function delLogo(x,y) {}
function delBarcode(x,y) {}
function delString(x,y) {}

//

function initDrag() {

	var _startX = 0;			// mouse starting positions
	var _startY = 0;
	var _offsetX = 0;			// current element offset
	var _offsetY = 0;
	var _dragElement;			// needs to be passed from OnMouseDown to OnMouseMove
	var _oldZIndex = 0;			// we temporarily increase the z-index during drag
	var _debug = $('debug');	// makes life easier

	document.onmousedown = OnMouseDown;
	document.onmouseup = OnMouseUp;

	function $(id) {
		return document.getElementById(id);
	}

	function OnMouseDown(e) {
	
		// IE is retarded and doesn't pass the event object
		if (e == null) 
			e = window.event; 
	
		// IE uses srcElement, others use target
		var target = e.target != null ? e.target : e.srcElement;
		
		var isDraggable = (target.className.indexOf('msg-object') !== -1);
		_debug.innerHTML = isDraggable
			? 'draggable element clicked' 
			: 'NON-draggable element clicked';

		// for IE, left click == 1
		// for Firefox, left click == 0
		if ((e.button == 1 && window.event != null || 
			e.button == 0) && isDraggable)
		{
				console.log("down2");
			// grab the mouse position
			_startX = e.clientX;
			_startY = e.clientY;
			
			// grab the clicked element's position
			_offsetX = ExtractNumber(target.style.left);
			_offsetY = ExtractNumber(target.style.top);
			
			// bring the clicked element to the front while it is being dragged
			_oldZIndex = target.style.zIndex;
			target.style.zIndex = 10000;
			
			// we need to access the element in OnMouseMove
			_dragElement = target;

			// tell our code to start moving the element with the mouse
			document.onmousemove = OnMouseMove;
			
			// cancel out any text selections
			document.body.focus();
			
			// prevent text selection in IE
			document.onselectstart = function () { return false; };
			// prevent IE from trying to drag an image
			target.ondragstart = function() { return false; };
			
			// prevent text selection (except IE)
			return false;
		}
	}

	function ExtractNumber(value)
	{
		var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	}

	function OnMouseMove(e)
	{
		if (e == null) 
			var e = window.event; 

		// this is the actual "drag code"
		_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
		_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
		
		_debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';	
	}

	function OnMouseUp(e)
	{
		if (_dragElement != null)
		{
			_dragElement.style.zIndex = _oldZIndex;

			// we're done with these events until the next OnMouseDown
			document.onmousemove = null;
			document.onselectstart = null;
			_dragElement.ondragstart = null;

			// this is how we know we're not dragging
			_dragElement = null;
			
			_debug.innerHTML = 'mouse up';
		}
		
		
		
		
		
	}

}
*/
// End of file