

var uniqueID = 0;

function parseText(displayArea, item)
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
				'format': item.format})
		.appendTo( displayArea );
	
	var prop = tmpObj.data('properties');
	tmpObj
	.css({
		'font-family': prop.font,
		'font-size': prop.size,
		left: 0,
		top: 0,
		webkitTransform: 'rotate(' + prop.angle + ')'
		})
	.text(prop.format);

	var l = prop.x - tmpObj.width()/2;
	var t = prop.y - tmpObj.height()/2;
	tmpObj.css({	left: l, top: t });

}


// Ex: var content = getTimeString("%year",0);
// Return: 2013
function getTimeString(format, days) {
	
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var d = new Date();
	d.setDate( d.getDate() + days );
	
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
	
	var content = format
			.replace(new RegExp(/%year/g), year)
			.replace(new RegExp(/%monthn/g), monNum)
			.replace(new RegExp(/%monthx/g), monTxt)
			.replace(new RegExp(/%week/g), week)
			.replace(new RegExp(/%day/g), day)
			.replace(new RegExp(/%hh/g), hours)
			.replace(new RegExp(/%mm/g), mm)
			.replace(new RegExp(/%ss/g), ss);
	return content;
}

function getCntString(content, cntList) {

	for(var i=0; i<cntList.length; i++) {
	
		var exp = "%cnt" + i;
		var reg = new RegExp(exp,"g");
		content = content.replace( reg, cntList[i].value );
	}
	return content;
}
function parseExpire(displayArea, item, flagExp)
{
	debugger
	var days = (flagExp=='true'? item.days: 0);
	var type = (flagExp=='true'? 'expire': 'datetime');
	var tmpObj =
		$('<div class="msg-object"></div>')
		.data('properties', {
				'type': type,
				'version': 1.0,
				'font': item.font,
				'size': item.size,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'format': item.format,
				'days': days
				})
		.appendTo( displayArea );				

	var prop = tmpObj.data('properties');
	var content = getTimeString( prop.format, days );
			
	tmpObj
	.css({
		'font-family': prop.font,
		'font-size': prop.size,
		left: 0,
		top: 0,
		WebkitTransform: 'rotate(' + prop.angle + ')'
		})
	.text(content);
	
	var l = prop.x - tmpObj.width()/2;
	var t = prop.y - tmpObj.height()/2;
	tmpObj.css({	left: l, top: t });	

}
function parseCounter(displayArea, item) 
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
				'format': item.format,
				'min': item.min,
				'max': item.max,
				'step': item.step,
				'flyback': item.flyback
				})			
		.appendTo( displayArea );				
		
	var prop = tmpObj.data('properties');
	var content = prop.format;
	
	tmpObj
	.css({
		'font-family': prop.font,
		'font-size': prop.size,
		left: 0,
		top: 0,
		WebkitTransform: 'rotate(' + prop.angle + ')'
		})
	.text(content);
	
	var l = prop.x - tmpObj.width()/2;
	var t = prop.y - tmpObj.height()/2;
	tmpObj.css({	left: l, top: t });		
}

function getSftString(table)
{
	var now = new Date();
	var hhmm = now.getHours()*100 + now.getMinutes();
	
	for(var i=0; i<table.length; i++) {
	
		var s = table[i].before.split(':');
		var before = s[0]*100 + s[1];
		if( hhmm < before ) {
			return table[i].team;
		}
	}
	return "none";
}
function parseShift(displayArea, item, table)
{
	var teamName = getSftString(table);

	var tmpObj =
		$('<div class="msg-object"></div>')
		.data('properties', {
				'type': item.type,
				'version': 1.0,
				'font': item.font,
				'size': item.size,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'format': item.format})
		.appendTo( displayArea );
	
	var prop = tmpObj.data('properties');
	tmpObj
	.css({
		'font-family': prop.font,
		'font-size': prop.size,
		left: 0,
		top: 0,
		webkitTransform: 'rotate(' + prop.angle + ')'
		})
	.text(teamName);

	var l = prop.x - tmpObj.width()/2;
	var t = prop.y - tmpObj.height()/2;
	tmpObj.css({	left: l, top: t });

	
}


function parseLogo(displayArea, item)
{
	var tmpObj =
		$('<img class="msg-object"></img>')
		.attr('src', item.src)		
		.data('properties', {
				'type': item.type,
				'version': 1.0,
				'angle': item.angle,
				'x': item.x,
				'y': item.y,
				'src': item.src,
				'format': item.format})
		.appendTo( displayArea );
	
	var prop = tmpObj.data('properties');
	var w = tmpObj.width();
	var h = tmpObj.height();
	var l = prop.x - w/2;
	var t = prop.y - h/2;
	prop.width = l;
	prop.height= t;
	
	tmpObj
	.css({
		left: l,
		top: t,
		webkitTransform: 'rotate(' + prop.angle + ')'
		});
}


function parseBarcode(displayArea, item)
{
	var tmpId = "barcode-" + uniqueID;
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
				'showtext': item.showtext,
				'cntList': item.cntList,
				'format': item.format})
		.appendTo( displayArea );
		
	var prop = tmpObj.data('properties');
	var sym = prop.bctype; // symdesc[22]; // symdesc[$('#symbol')[0].selectedIndex];
	var text = prop.format; // '01335583'; // $('#symtext').val().replace(/^\s+/,'').replace(/\s+$/,'');
	text = getTimeString( text, 0);
	text = getCntString( text, prop.cntList );
	
	var angles = { "0deg":"N", "90deg":"R", "180deg":"I", "270deg":"L" };
	var degree = ( prop.angle in angles )? angles[ prop.angle]: "N";
		
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
	bw.bitmap().show(tmpId, degree);
	
		
	var l = prop.x - tmpObj.width()/2;
	var t = prop.y - tmpObj.height()/2;
	tmpObj
	.css({
		left: l,
		top: t,
//		opacity: 0.6
//		WebkitTransform: 'rotate(' + prop.angle + ')'
		});
}
function parseString(displayArea, item) {
}
function msgDisplay( displayArea, messageFile )
{
	var msgObject;
	$(displayArea).empty();		
	$.each(messageFile.contents.object, function(i, item)
	{
		switch( item.type.toLowerCase() )
		{
			case 'text': // T
				parseText(displayArea, item);
				break;
			
			case 'datetime': // D
				parseExpire(displayArea, item, "false");
				break;
			
			case 'expire': // E
				parseExpire(displayArea, item, "true");
				break;
			
			case 'counter': // C
				parseCounter(displayArea, item);
				break;
			
			case 'shift': // F
				parseShift(displayArea, item, messageFile.contents.shiftable);
				break;
			
			case 'logo': // L
				parseLogo(displayArea, item);
				break;
			
			case 'barcode': // B
				parseBarcode(displayArea, item);
				break;
			
			case 'string': // S
			break;
		}
	});
}


// End of file

