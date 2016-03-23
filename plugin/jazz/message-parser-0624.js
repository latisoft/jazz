

var uniqueID = 0;
	
function parseText(item)
{
	var tmpObj =
		$('<div class="msg-object"></div>')
		.data('properties', {
				'type': 'text',
				'version': 1.0,
				'font': item.font,
				'size': item.size,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'format': item.format});
		
	var prop = tmpObj.data('properties');

	tmpObj
	.css({
		'font-family': prop.font,
		'font-size': prop.size,
		left: prop.x,
		top: prop.y,
		webkitTransform: 'rotate(' + prop.angle + ')'
		})
	.text(prop.format);
	
	return tmpObj;
}
	
function parseExpire(item, flagExp)
{
	var days = (flagExp=='true'? item.days: 0);
	var tmpObj =
		$('<div class="msg-object"></div>')
		.data('properties', {
				'type': 'datetime',
				'version': 1.0,
				'font': item.font,
				'size': item.size,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'format': item.format,
				'daysToExpire': days
				});

	var prop = tmpObj.data('properties');
	tmpObj
	.css({ 
		'font-family': prop.font,
		'font-size': prop.size,
		left: prop.x,
		top: prop.y,
		WebkitTransform: 'rotate(' + prop.angle + ')'
		});
		

	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var d = new Date();
	d.setDate( d.getDate() + prop.daysToExpire );
	
	var	year = d.getFullYear();
	var mIndex = d.getMonth();
	var monNum = mIndex+1;
	var monTxt = months[mIndex];
	var week = d.getDay();
	var day = d.getDate();
	
	var milliSeconds = ($.now() / 1000) | 0;
	var secondsInDay = ((milliSeconds % 86400) + 86400) % 86400;
	var seconds = secondsInDay % 60;
	var minutes = ((secondsInDay / 60) | 0) % 60;
	var hours = (secondsInDay / 3600) | 0;					
	
	var ss = (seconds < 10 ? "0" : "") + seconds;
	var mm = (minutes < 10 ? "0" : "") + minutes;
	
	var content = prop.format
				.replace('%year', year)
				.replace('%monthn', monNum)
				.replace('%monthx', monTxt)
				.replace('%week', week)
				.replace('%day', day)
				.replace('%hh', hours)
				.replace('%mm', mm)
				.replace('%ss', ss);
	tmpObj.text(content);
	return tmpObj;
}
function parseCounter(item) 
{
	var tmpObj =
		$('<div class="msg-object"></div>')
		.data('properties', {
				'type': 'counter',
				'version': 1.0,
				'font': item.font,
				'size': item.size,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'content': item.value});
		
	var prop = tmpObj.data('properties');
	
	tmpObj
	.css({
		'font-family': prop.font,
		'font-size': prop.size,
		left: prop.x,
		top: prop.y,
		WebkitTransform: 'rotate(' + prop.angle + ')'
		});
		
	tmpObj.text(prop.content);
	
	return tmpObj;
}

function parseShift(item)
{
	var tmpObj =
		$('<div class="msg-object"></div>')
		.data('properties', {
				'type': 'text',
				'version': 1.0,
				'font': item.font,
				'size': item.size,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'content': item.value});
		
	var prop = tmpObj.data('properties');
	
	tmpObj
	.css({
		'font-family': prop.font,
		'font-size': prop.size,
		left: prop.x,
		top: prop.y,
		WebkitTransform: 'rotate(' + prop.angle + ')'
		})
	.text(prop.content);
	
	return tmpObj;
}

function parseLogo(item)
{
	var tmpObj =
		$('<div class="msg-object"></div>')
		.data('properties', {
				'type': 'text',
				'version': 1.0,
				'font': item.font,
				'size': item.size,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'content': item.value});
		
	var prop = tmpObj.data('properties');
	
	tmpObj
	.css({
		'font-family': prop.font,
		'font-size': prop.size,
		left: prop.x,
		top: prop.y,
		WebkitTransform: 'rotate(' + prop.angle + ')'
		})
	.text(prop.content);
	
	return tmpObj;
}


function parseBarcode(displayArea, item)
{
	var tmpId = "barcode" + uniqueID;
	uniqueID ++;
	
	var tmpObj = 
		$('<canvas class= "msg-object"></canvas>')
		.attr('id',tmpId)
		.data('properties', {
				'type': 'barcode',
				'version': 1.0,
				'bctype': item.bctype,
				'bcoption': item.bcoption,
				'width': item.width,
				'height': item.height,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'hidetxt': item.hidetxt,
				'format': item.format});
	var prop = tmpObj.data('properties');

	tmpObj
	.css({
		left: prop.x,
		top: prop.y,
		WebkitTransform: 'rotate(' + prop.angle + ')'
		});

	tmpObj.appendTo(displayArea);

	
	
	var sym = prop.bctype; // symdesc[22]; // symdesc[$('#symbol')[0].selectedIndex];
	var text = prop.format; // '01335583'; // $('#symtext').val().replace(/^\s+/,'').replace(/\s+$/,'');
	var opts = prop.bcoption; // "includetext guardwhitespace height=0.5"; // $('#symopts').val().replace(/^\s+/,'').replace(/\s+$/,'');


	var bw = new BWIPJS;
	var tmp = opts.split(' '); 
	opts = {};
	for (var i = 0; i < tmp.length; i++) {
		if (!tmp[i])
			continue;
		var eq = tmp[i].indexOf('=');
		if (eq == -1)
			opts[tmp[i]] = bw.value(true);
		else
			opts[tmp[i].substr(0, eq)] = bw.value(tmp[i].substr(eq+1));
	}
	opts.inkspread = bw.value(0);
	if (needyoffset[sym] && !opts.textxalign && !opts.textyalign &&
			!opts.alttext && opts.textyoffset === undefined)
		opts.textyoffset = bw.value(-10);


	bw.bitmap(new Bitmap);
	bw.scale(1,1);
	bw.push(text); // 
	bw.push(opts); // 


	bw.call(sym);
	bw.bitmap().show(tmpId, 'N');	
	
		
	return tmpObj;
}

function msgDisplay( displayArea, messageFile )
{
		var msgObject;
		$(displayArea).empty();		
		$.each(messageFile.contents.object, function(i,item)
		{
			switch( item.type.toLowerCase() )
			{
				case 'text': // T
					msgObject = parseText(item);
					msgObject.appendTo( displayArea );
					break;
				
				case 'datetime': // D
					msgObject = parseExpire(item,"false");
					msgObject.appendTo( displayArea );					
					break;
				
				case 'expire': // E
					msgObject = parseExpire(item,"true");
					msgObject.appendTo( displayArea );					
					break;
				
				case 'counter': // C
					msgObject = parseCounter(item);
					msgObject.appendTo( displayArea );	
					break;
				
				case 'shift': // F
					//msgObject = parseShift(item);
					break;
				
				case 'logo': // L
					//msgObject = parseLogo(item);
					break;
				
				case 'barcode': // B
	
					msgObject = parseBarcode(displayArea, item);
					// msgObject.appendTo( displayArea );						


					break;
				
				case 'string': // S
				break;
			}
			

			
		});
	
}

function parseMessage(filePath, target)
{
	var fileNameIndex = filePath.lastIndexOf("/") + 1;
	var filename = filePath.substr(fileNameIndex);
	
	var fileExtIndex = filePath.lastIndexOf(".") + 1;
	var fileext = filePath.substr(fileExtIndex);
	
	if( fileext != 'json' ) {
			$('#statusArea').text("Please select a message file (JSON)!");
		return;
	}
	
	$.getJSON(filePath, function(jsonData) {
	
		console.log(jsonData);
		msgDisplay(target, jsonData);
	});
	
	
			
}

// End of file

