

var objSettings;
function loadObjSettings()
{
	$.getJSON('../sys/setup-object.json', function(json) {
		console.log( "Object Settings: " + json );

		objSettings = json;

		var	ID = $("#sltType").val();
		if(	initSetupFunctions[ID] )
			initSetupFunctions[ID]();	
	});
}
function saveObjSettings() {

	saveSetupPages();

	var jsonString = JSON.stringify( objSettings, null, "\t" );
	$.post('file.php', {
			filename: '../sys/setup-object.json',
			data: jsonString
		},
		function(data) {}, 'text');
}


function initSetupText() {
	var txt = objSettings.contents["text"];
	$('#setup-txt-format').val(txt.format);
	$('#setup-txt-size').val(txt.size);
	$('#setup-txt-angle').val( txt.angle );
	$('#setup-txt-font').val(txt.font);
}
function initSetupDatetime() {
	var dtm = objSettings.contents["datetime"];
	$('#setup-dtm-format').val(dtm.format);
	$('#setup-dtm-size').val(dtm.size);
	$('#setup-dtm-angle').val( dtm.angle );
	$('#setup-dtm-font').val(dtm.font);
}
function initSetupExpire() {
	var exp = objSettings.contents["expire"];
	$('#setup-exp-format').val(exp.format);
	$('#setup-exp-size').val(exp.size);
	$('#setup-exp-angle').val( exp.angle );
	$('#setup-exp-font').val(exp.font);
}
function initSetupCounter() {
	var cnt = objSettings.contents["counter"];
	$('#setup-cnt-format').val(cnt.format);
	$('#setup-cnt-min').val(cnt.min);
	$('#setup-cnt-max').val(cnt.max);
	$('#setup-cnt-step').val(cnt.step);
	$('#setup-cnt-size').val(cnt.size);
	$('#setup-cnt-angle').val( cnt.angle );
	$('#setup-cnt-font').val(cnt.font);
}
function initSetupShift() {
	var sft = objSettings.contents["shift"];
	$('#setup-sft-size').val( sft.size );
	$('#setup-sft-angle').val( sft.angle );
	$('#setup-sft-font').val( sft.font );
}
function initSetupLogo() {
	var log = objSettings.content["logo"];
	$('#setup-log-preview').attr('src',log.src);
}
function initSetupBarcode() {
	var bar = objSettings.contents["barcode"];
	$('#setup-bar-format').val(bar.format);
	$('#setup-bar-bctype option').filter( function() {
		return $(this).text() == bar.bctype;
	}).prop('selected', true);

	var sts = (bar.showtext=='true')? true: false;
		$('#setup-bar-showtext').attr('checked', sts);
}
function initSetupString() {
	var str = objSettings.content["string"];
}	
function saveSetupPages() {

	var txt = objSettings.contents["text"];
	txt.format = $('#setup-txt-format').val();
	txt.font = $('#setup-txt-font').val();
	txt.size = $('#setup-txt-size').val();
	txt.angle= $('#setup-txt-angle').val();

	
	var dtm = objSettings.contents["datetime"];
	dtm.format = $('#setup-dtm-format').val();
	dtm.font	= $('#setup-dtm-font').val();
	dtm.size	= $('#setup-dtm-size').val();
	dtm.angle= $('#setup-dtm-angle').val() + "deg";
	
	var exp = objSettings.contents["expire"];
	exp.format = $('#setup-exp-format').val();
	exp.font	= $('#setup-exp-font').val();
	exp.size	= $('#setup-exp-size').val();
	exp.angle= $('#setup-exp-angle').val() + "deg";
	exp.days = $('#setup-exp-days').val();
	
	
	
	
	
	
	var cnt = objSettings.contents["counter"];
	
	var sft = objSettings.contents["shift"];
	
	
	var log = objSettings.contents["logo"];
	
	

	
	var bar = objSettings.contents["barcode"];
	bar.showtext = ( $('#setup-bar-showtext').is(':checked') )? "true": "false";

	var str = objSettings.contents["string"];

	
}



