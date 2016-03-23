
	
function initDrag() {

	var _startX = 0;			// mouse starting positions
	var _startY = 0;
	var _offsetX = 0;			// current element offset
	var _offsetY = 0;
	var _dragElement;			// needs to be passed from OnMouseDown to OnMouseMove
	var _oldZIndex = 0;		// we temporarily increase the z-index during drag
	var _debug = document.getElementById('debug');
	
	
	$(document)
	.on('click', '.msg-object', OnClick )
	.on('contextmenu', '.msg-object', OnContextMenu )
	.on('mousedown', '.msg-object', OnMouseDown )
	.on('mouseup', '.msg-object', OnMouseUp );

	function OnClick(e) {

			$('.msg-object').css({'z-index':10});
			$(this).css({'z-index':11});
			
			var l = parseInt($(this).css('left'));
			var t = parseInt($(this).css('top'));
			var w = parseInt($(this).css('width'));
			var h = parseInt($(this).css('height'));
			var	cx = l + w/2;
			var	cy = t + h/2;
			
			var prop = $(this).data('properties');
			var a = prop.angle.replace("deg","");
			prop.x = cx;
			prop.y = cy;

			$('#txtType').val( prop.type );
			$('#txtWHA').val( w+":"+h+", "+ a );
			$('#txtPosition').val( cx+":"+cy );
			$('#txtDetail').val( prop.format );
			return false;
	}
	
	function OnContextMenu(e) {
			var $obj = $(this);

			$('#objPropertyContextMenu')
			.data("caller", $obj)
			.css({left: e.pageX, top: e.pageY})
			.show();
			return false;
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
	
	function ExtractNumber(value) {
	
		var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	}
	
	function OnMouseMove(e) {
	
		if (e == null) 
			var e = window.event; 

		// this is the actual "drag code"
		_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
		_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
		
		_debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';	
	}
	
	function OnMouseUp(e) {
	
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
// End of file