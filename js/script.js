$(document).ready(function(){

// Drag
$("#draggable").draggable({scroll: true, scrollSensitivity: 100, scrollSpeed: 200 }).resizable();
$('#draggableNew').draggable({axis: "y"});
$('#draggableNew2').draggable({axis: "x", revert: true, helper: "clone"});
$('#draggableNew3').draggable({containment: '#containment-wrapper', scroll: false });
$('#draggableNew4').draggable({containment: "parent", cursor: "move"});
$('#draggableNew6').draggable({handle: ".ui-widget-header1"});
$('#draggableNew7').draggable({cancel: ".ui-widget-header2"});
$('#draggableNew6, #ui-widget-header2').disableSelection();
$('#dragSortable').sortable({revert: true});
$('#draggableSort').draggable({
	connectToSortable: "#dragSortable",
	opacity: 0.7,
	helper: "clone",
	revert: "invalid"
});
$( "#dragSortable, #draggableSort" ).disableSelection();
$('#draggableCursor').draggable({
	cursor: "move", 
	cursorAt: {top: -20, right: -20}, 
	helper: function(event){
		return $("<div class='newDivContent'>I'm a custom helper</div>");
	}
});

//-----------------------------------------------

 // img drag
$(".drag2").draggable();
//-----------------------------------------------

// drga drop
$('#draggable2').draggable();
$('#droppable').droppable(
	{drop:function(event, ui){
		$(this).addClass("ui-state-highlight").find(".dragpara2").html("Dropped!");}
	}
);
$('.draggable3').draggable();
$('.droppable2').droppable({
	drop:function(event, ui){
		$(this).css("background-color", "red").find(".imgpDrop").html("You did it");
	}
});
//-------------------------------------------------------

// selection
$('#selectable').selectable();
//---------------------------------------------------------

// sortable
$('#sortable').sortable();
//-----------------------------------------------------------

// accordion
let icons = {
	header: "ui-icon-circle-arrow-e",
    activeHeader: "ui-icon-circle-arrow-s"
};
$('#accordion').accordion({
	icons: icons,
	heightStyle: "content",
	collapsible: true,
})
$('.iconsToggle').on('click', function(){
	if($('#accordion').accordion("option", "icons")){
		$('#accordion').accordion("option", "icons", null);
	} else{
		$('#accordion').accordion("option", "icons", icons);
	}
});
//-----------------------------------------------------------

// autocomplete
let data = ["html", "css", "js", "jq", "bt5", "react", "php"];
$('.autoInput').autocomplete({
	source: data
});

//-----------------------------------------------------------

// Datepicker
$('#datepicker').datepicker();
$('#datepicker').datepicker( "option", "showAnim", "bounce");

$('#datepicker2').datepicker({
      showButtonPanel: true,
      changeMonth: true,
      changeYear: true,
      showOn: "button",
      buttonImage: "images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date",
      minDate: "-99Y", 
      maxDate: "+10Y"
    });
$('#anim').on('change', function(){
	$('#datepicker2').datepicker("option", "showAnim", $(this).val());
});

let dateFormat = "mm/dd/yy";
let from = $('#from').datepicker({
	defaultDate : "+1D", 
	changeMonth : true, 
	minDate : 0}).on('change', function(){
		let minDateForTo = getDate(this);
		minDateForTo.setDate(minDateForTo.getDate() + 1);
		to.datepicker("option", "minDate", minDateForTo);
	});
let to = $('#to').datepicker({
	defaultDate : "+1D", 
	changeMonth : true, 
	minDate : 1}).on('change', function(){
		from.datepicker("option", "maxDate", getDate(this));
	});

function getDate(element){
	let inputDate;
	try{ inputDate = $.datepicker.parseDate( dateFormat, element.value);
	} catch(error){inputDate = null;}
	return inputDate;
};

//-----------------------------------------------------------

// Menu
$('#menu').menu();
$('#menu2').menu({
	items: "> :not(.ui-widget-header-menu)"
});

//-----------------------------------------------------------

// progress bar
let progressbar = $( "#progressbar" );
let progressLabel = $( ".progress-label" );
 
    progressbar.progressbar({
      value: false,  
      // Makes the progress bar indeterminate initially.

      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      }, 
      // Update the progress label to show the current value of the progress bar with a percentage.

      complete: function() {
        progressLabel.text( "Complete!" );
      }
    });
 
    function progress() {
      let val = progressbar.progressbar( "value" ) || 0; // Get the current value of the progress bar, defaulting to 0 if it's undefined.
 
      progressbar.progressbar( "value", val + 5 );
 
      if ( val < 99 ) {
        setTimeout( progress, 80 );  // Call the progress function again after 80ms
      }
    }
    setTimeout( progress, 2000 );

//-----------------------------------------------------------

// progress bar File Download
let progressTimer;
let progressbar2 = $('#progressbar2');
let progresslabel2 = $('.progress-label2');
let dialogButtons = [{text: "Cancel Download",click: closeDownload}];
let dialog = $('#dialog').dialog({
	autoOpen: false, closeOnEscape: false, resizable: false, buttons: dialogButtons, open: function(){
		progressTimer = setTimeout( progress, 2000);
	}, beforeClose: function(){
		downloadButton.button("option", {
			disabled: false,
			label: "Start Download"
		});
	}
});
let downloadButton = $('#downloadButton').button().on('click', function(){
	$(this).button("option", {
		disabled : true,
		label : "Downloading..."
	});
	dialog.dialog("open");
});

progressbar2.progressbar({
	value : false,
	change : function(){
		progresslabel2.text("Current progress:" + progressbar2.progressbar("value") + "%" );
	},
	complete : function(){
		progresslabel2.text("Complete");
		dialog.dialog("option", "buttons", [{
			text : "Close",
			click : closeDownload
		}]);
		$('.ui-dialog button').last().trigger('focus');
	}
});
function progress(){
	let valPro = progressbar2.progressbar("value") || 0;
	progressbar2.progressbar("value", valPro + Math.floor( Math. random() * 7));
	if ( valPro <= 99 ){
		progressTimer = setTimeout(progress, 500);
	}
}
function closeDownload(){
	clearTimeout( progressTimer );
	dialog.dialog("option", "buttons", dialogButtons).dialog("close");
	progressbar2.progressbar("value", false);
	progresslabel2.text("Starting Download...");
	downloadButton.trigger("focus");
};

//-----------------------------------------------------------

// progress bar another

$('#progressbar3').progressbar({
	value: false
});
$('.exbtn').on('click', function(event){
	let target = $(event.target);
	let progressbar3 = $('#progressbar3');
	let progressbarValue = progressbar3.find('.ui-progressbar-value');
	if( target.is('#numButton')){
		progressbar3.progressbar("option", { value: Math.floor(Math.random()*100)
		});
	} else if(target.is('#colorButton')){
		progressbarValue.css({
			"background" : '#' + Math.floor(Math.random()*16777215).toString(16)
		});
	} else if(target.is('#falseButton')){
		progressbar3.progressbar("option", "value", 0)
	}
});

//-----------------------------------------------------------

// Tabs
$('#tabs').tabs({
	event: "mouseover",
	collapsible: true
});

//-----------------------------------------------------------

// tooltip
$('#show-option').tooltip({
	show: {
		effect: "explode", delay: 250
	}
});
$( "#hide-option" ).tooltip({
      hide: {
        effect: "explode",
        delay: 250
      }
});

//-----------------------------------------------------------
// counter
$('.counter').counterUp({
    delay: 10,
    time: 1000
});

//-----------------------------------------------------------
$('.counters').countUp({
  'time': 2000,
  'delay': 10
});

//-----------------------------------------------------------
$('.counter-2').counterUp({
  delay: 10,
  time: 2000
});
$('.counter-2').addClass('animated fadeInDownBig');
$('.cntH3').addClass('animated fadeIn');

//-----------------------------------------------------------
// animate
wow = new WOW(
  {
  boxClass:     'wow',      // default
  animateClass: 'animated', // default
  offset:       0,          // default
  mobile:       true,       // default
  live:         true        // default
	}
)
wow.init();

//-----------------------------------------------------------
// mixitupfilter
var mixer = mixitup('#mixFilter', {
    animation: {
        duration: 300
    }
});

//-----------------------------------------------------------
// lightbox
lightbox.option({
 	'resizeDuration': 200,
  'wrapAround': true
});



























































});