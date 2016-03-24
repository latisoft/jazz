
var JsonObj = null;
var currentMessage;
var currentMessageFile;
		
function handleFileSelect(evt) {

	var files = evt.target.files; // FileList object
	f = files[0];
	// files is a FileList of File objects. List some properties.
	// document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	$('#txtMessage').val(f.name);
	
	var reader = new FileReader();
	
	// Closure to capture the file information
	reader.onload = (function (theFile) {
		return function(e) {
			JsonObj = JSON.parse( e.target.result );
			msgDisplay($('#limitbox'), JsonObj);					
		};
	})(f);
	
	// reader.readAsDataURL(f);
	reader.readAsText(f);
}

$('#btnSave').on('click', function(e) {	
	currentMessage.contents.object.splice(0, currentMessage.contents.object.length);
	$('#limitbox .msg-object').each(function() {

		var prop = $(this).data('properties');
		prop.x = parseInt( $(this).css('left') ) + $(this).width()/2;
		prop.y = parseInt( $(this).css('top') )+ $(this).height()/2;
		currentMessage.contents.object.push( prop );
	});

//	jsobject.callNETNoReturn();

	var jsonString = JSON.stringify( currentMessage, null, "\t" );
	$.post('file.php', {
		filename: '../msg/test-new.json',
		data: jsonString
	}, function(data) {},	'text');

	return false;
});
	  
function selectTreeAt(file) { 

	currentMessageFile = "appMessageEditor/" + file;
	var fileNameIndex = file.lastIndexOf("/") + 1;
	var filename = file.substr(fileNameIndex);
	var fileExtIndex = file.lastIndexOf(".") + 1;
	var fileext = file.substr(fileExtIndex);

	if (fileext!='json') {
		console.log(filename + " File type Error: Please select a message file (JSON)!");
		$('#txtMessage').val("Format Error");

	} else {

		$('#txtMessage').val(filename);
		
		$.getJSON( currentMessageFile, function(jsonData) {
		
			currentMessage = jsonData;
			
			console.log(jsonData);
			msgDisplay($('#limitbox'), jsonData);

			var objDict = {
				"text": 0,
				"datetime": 0,
				"expire": 0,
				"counter": 0,
				"shift": 0,
				"logo": 0,
				"barcode": 0,
				"string": 0 };

			var objNum = jsonData.contents.object.length;	
			$.each( jsonData.contents.object, function(i, obj) {
				var type = obj.type;
				objDict[type] ++;
			} );
			// generate option list 
			$('#sltObjNumber option:contains("ALL")').text('ALL:'+ objNum);
			$('#sltObjNumber option:contains("TXT")').text('TXT:'+ objDict["text"]);
			$('#sltObjNumber option:contains("DTM")').text('DTM:'+ objDict["datetime"]);
			$('#sltObjNumber option:contains("EXP")').text('EXP:'+ objDict["expire"]);
			$('#sltObjNumber option:contains("CNT")').text('CNT:'+ objDict["counter"]);
			$('#sltObjNumber option:contains("SFT")').text('SFT:'+ objDict["shift"]);
			$('#sltObjNumber option:contains("LOG")').text('LOG:'+ objDict["logo"]);
			$('#sltObjNumber option:contains("BAR")').text('BAR:'+ objDict["barcode"]);
			$('#sltObjNumber option:contains("STR")').text('STR:'+ objDict["string"]);
		});		
	}
}

function initModifyDialog()
{
	var suffix = ["text","datetime","expire","counter","shift","logo","barcode","string"];

	for(var i=0; i<suffix.length; i++)
	{
		var elemDlg= "#dlg-modify-" + suffix[i];

		$(elemDlg)
		.dialog({
			autoOpen: false,
			width: 420,
			height: 200,
			position: ['center', 200], // [100,100]
			modal: true,
			show: { effect: 'fade', duration: 400 },
			hide: { effect: 'fade', duration: 400 },
			resizable: false,
			closeOnEscape: false,
			buttons:
				[{
					text: "Apply",
					click: function() { 
						$(this).dialog("close");
					}
				}]
		});
	}	
	// 
	$(this).load("pageObjectModify.html dlg-modify-datetime");
};

function initPanelDialog()
{

};


$(document).ready( function() {

	initDrag();
	
	initModifyDialog();
	initPanelDialog();

	//	
	loadObjSettings();

	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	
	// Initial Barcode and Sort the symbols
	symdesc.pop();	// remove the null last entry
	symdesc.sort(function(a,b) { return (a.desc < b.desc ? -1 : 1); });

	var loc = window.location.pathname;
	var dir = loc.substring(0, loc.lastIndexOf('/'));
	
	$('#debug').append(" [app]: " + loc);
	$.ajaxSetup({ cache: false });

	
	
	
	$('#inputType').on('click', function(e) {
		$('#typeListContextMenu')
		.css({left: e.pageX, top: e.pageY})
		.show();
	});	
	$('#typeListContextMenu')
	.menu({
		select: function (event, ui) {
			var type = ui.item.text().toLowerCase();
			$('#inputType').val(type);
			$('#typeListContextMenu').hide();
			
			
			$('#inputType').val(type);
			var pageDiv = ("pageObjectSetting.html #setup-xxx").replace( new RegExp("xxx","g"), type);
			$("#tdSetup").load(pageDiv, function() {		
				initSetupFunctions[type]();
			});			
		}
	})
	.on('mouseleave', function(event) {
		$("#typeListContextMenu").fadeOut();
	});
	

	
	$('#objPropertyContextMenu')
	.menu({
		select: function (event, ui) {	
			$("#objPropertyContextMenu").hide();
			
			var xobj = $(this).data('caller');
			var prop = xobj.data('properties');

			switch( ui.item.text() )
			{
				case "Modify":
					$("#dlg-modify-" + prop.type).dialog("open");
					break;
				
				case "Delete":
					xobj.remove();
					break;
				
				case "Clone":
					var clone = prop;
					clone.x = parseInt( xobj.css('left') ) + xobj.width()/2;
					clone.y = parseInt( xobj.css('top') ) + xobj.height()/2;
					newObject( prop.type, clone );
					break;
			}
		}
	})
	.on('mouseleave', function(event) {
		$("#objPropertyContextMenu").fadeOut();
	});
		
/*		
	$('#jqFileTree')
	.fileTree({	
		root: '../../msg/', 
		script: 'php/router.php', // jqueryFileTree.php
		action: 'showFileTree',
		folderEvent: 'click',
		expandSpeed: 750,
		collapseSpeed: 750,
		multiFolder: false,
		expandEasing: 'easeOutBounce',
		collapseEasing: 'easeOutBounce',
		loadMessage: 'Un momento...'},
		selectTreeAt);
*/
	$("#dlgList")
	.dialog({
		autoOpen: false,
		width: 210,
		height: 350,
		position: [800, 50],
		modal: true,
		show: { effect: 'fade', duration: 400 },
		hide: { effect: 'fade', duration: 400 },
		resizable: false,
		closeOnEscape: false,
		buttons:
			[{
				text: "Hide",
				click: function() { 
					$(this).dialog("close");
				}
			}]
	});


	
	
	$("#limitbox")
	.mousemove( function(event) {
		$('#divXY').text(	event.offsetX + ":" + event.offsetY );
	})
	.mouseleave( function(event) {
		$('#divXY').text( "---:---" );
	});

	$('#btnNewObject').on('click', function(e) {
		var type = $("#inputType").val();
		newObject(type, objSettings.contents[ type ]);
	});
	$('#btnSaveObject' ).on('click', saveObjSettings);
	$('#btnResetObject').on('click', loadObjSettings);


//
	$('#btnLoad').on('click', function(e) {
		$("#dlgList").dialog("open");
		return false;
	});




	$('#btnBackground').on('click', function(e) {
		var mode = $(this).text();
		if(mode=='Clean') {
			$(this).text('Paper');
			$('#limitbox').css('background-image','none');
		} else {
			$(this).text('Clean');
			$('#limitbox').css('background-image','url(css/workarea.png)');
		}

	});

});
function newObject(type, init)
{
	switch(type)
	{
		case "text": parseText( '#limitbox', init );
			break;
			
		case "datetime": parseExpire( '#limitbox', init, false );
			break;
		
		case "expire": parseExpire( '#limitbox', init, true );
			break;
			
		case "counter": parseCounter( '#limitbox', init );
			break;
			
		case "shift": parseShift( '#limitbox', init, objSettings.contents.shiftable );
			break;
			
		case "logo": parseLogo( '#limitbox', init );
			break;
			
		case "barcode": parseBarcode( '#limitbox', init );
			break;
			
		case "string": parseString( '#limitbox', init );
			break;
	}
}
