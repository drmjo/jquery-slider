// JavaScript Document

var width = 950;
var height = 450;
var pos = 1; // position starts from 0.
var slider_speed = 800;
var autoplay_timer = 4000;
var marker_dim = 24;
var intervalID;

$(document).ready(function(e) {
	var count = $("#main-slider-cassette li").length;
	var cassete_width = width*count;
	//$("#main-slider-left").

	for (i=0; i<count; i++) {
	
		$("<div/>",{
			id:"pos_"+i,
			class:"main-slider-pos-marker",
			pos:i
		}).appendTo("#main-slider-pos-wrapper");
	};
	
	$(".main-slider-pos-marker").css({
	  width: marker_dim+"px",
	  height: marker_dim+"px",
	  "background-position": "0px -24px"
	});
	
	$("#main-slider-pos-wrapper").css({
		width: (marker_dim*(count))+"px",
		height: marker_dim+"px",
		bottom: "0px",	
		left: (width/2)-((marker_dim*(count))/2)+"px"
	});

	$("#main-slider-cassette").css({
		width: cassete_width+"px",
		left: (-1*pos*width)+"px"
	});
	
	$("#pos_"+pos).css("background-position","0px 0px");
	
	  intervalID = setInterval(function(){
		pos = autoplay(pos, count);
		//$("#dev").text("pos:"+pos+", Count:"+(count-1)+", intervalID: "+intervalID);
	},autoplay_timer);

	$("#main-slider-wrapper").mouseleave(function(){
	  intervalID = setInterval(function(){
		  pos = autoplay(pos, count);
		  //$("#dev").text("pos:"+pos+", Count:"+(count-1)+", intervalID: "+intervalID);
	  },autoplay_timer);
	});	
	
	$("#main-slider-wrapper").mouseenter(function(){
		clearInterval(intervalID);
		//$("#dev").append("mouseendter: "+intervalID);
	});		
	
	$("#main-slider-left").click(function(){
	  if (pos > 0){
		pos = positioner(pos, -1);
	  }else{
		pos = positioner2(pos, (count-1));		
	  };
	});
	
	$("#main-slider-right").click(function(){
	  if (pos < count-1){
		pos = positioner(pos, 1);
	  }else{
		pos = positioner2(pos, 0);		
	  };
	});

	$(document).keydown(function(e){ //left arrow
	  if (e.keyCode == 37) {  
		if (pos > 0){
		  pos = positioner(pos, -1);
		};
	  }; 
	}); 
	$(document).keydown(function(e){ //right arrow
	  if (e.keyCode == 39) {  
		if (pos < count-1){
		  pos = positioner(pos, 1);
		};
	  }; 
	}); 

	var wrapper_div = $("#main-slider-pos-wrapper div");
	
	
	$(wrapper_div).each(function(index, element) {
        $(this).click(function(){
			var position = $(this).attr("pos");
			$(this).css("cursor","default");
			pos = positioner2(pos, position);
		});
		$(this).mouseover(function(e) {
			if(index != pos){
			  $(this).css({
				"background-position":"0px -48px",
				cursor: "pointer"				  
			  });
			};
        });
		$(this).mouseout(function(e) {
			if(index != pos){
			  $(this).css({
				  "background-position":"0px -24px",
			  });
			};
		});
    });
});

function positioner(pos, dir){
		var dir = parseInt(dir);
			pos = parseInt(pos);		
		$("#pos_"+pos).css("background-position","0px -24px");
		if(dir){
		pos = pos + dir;
		}
		$("#main-slider-cassette").animate({
			left: (-1*pos*width)+"px"
		}, slider_speed);
		$("#pos_"+pos).css("background-position","0px 0px");
		return pos;
};
function positioner2(oldpos, posi){
	
		$("#pos_"+oldpos).css("background-position","0px -24px");
		$("#main-slider-cassette").animate({
			left: (-1*posi*width)+"px"
		}, slider_speed);
		$("#pos_"+posi).css("background-position","0px 0px");
		return posi;
};
function autoplay(pos, count){
	
		var last_slide = count-1;
		last_slide = parseInt(last_slide);		
		pos = parseInt(pos);		
		if(pos==last_slide){
			pos=0;
			pos = positioner2(last_slide, pos);
		}else{
			pos = positioner2(pos, (pos+1));
		}
		return pos;
};