// JavaScript Document

(function( $ ) {
  $.fn.ucSlider = function(options) {
		
	//variables
	this.slideCount = this.children(":first").children().length;	
	this.pos;
	this.intervalID;
  
	
	// Objects
	this.cassette = this.children(":first");
	this.slide = this.cassette.children();
	this.posWrapper; 
	this.posMarker;
	this.leftArrow;
	this.rightArrow;
	
	//default Options
  	this.defaultOptions = {
			height: 350,
			width: 800,
			startSlide: 1,
			autoplayTimer: 1000,
			sliderSpeed: 500,
			arrowOffset: 0,
			arrowHeight: 100,
			arrowWidth: 50
		};
	//combining the default options with the user inputed options
	options = $.extend({}, this.defaultOptions, options); 
	
	//Making sure the options inputed by the user are what they are suppose to be... No wierd shit...
	
	if(options.startSlide>this.slideCount)
		options.startSlide = this.slideCount; //startslider Cannot be more than the slide Count...
		
	if(options.sliderSpeed>options.autoplayTimer)
		options.sliderSpeed = (options.autoplayTimer*.8); // slider speed cannot be faster than the autoplayTimer... it just wont work don't argue this one. this sets it to 80% of the value
		
	if(options.arrowHeight>options.height)
		options.arrowHeight = options.height; // arrow height can't be too much
	if(options.arrowWidth>(options.width/2))
		options.arrowWidth = (options.width/2); // arrow width can't be more than half the width of the slider'
		
		
	//all the calculations are true in this code if slideCount starts from "ZERO" this section makes sure the user inputed startSlide is converted to the actual
	//positions that the code can read... simply actual startSlide is startSlide-1 to be consistant with the code...
	options.startSlide = options.startSlide-1;
	
	
	
	//Adding coresponding classes to the objects
	
	this.addClass("urbancoyote-slider-main");
	this.cassette.addClass("urbancoyote-slider-cassette");
	this.slide.addClass("urbancoyote-slider-slide");
	
	//Applying all the extra CSS needed for the silder
		
	this.css({
			height: options.height+"px",
			width: options.width+"px"
		});
		
	this.cassette.css({
		  height: options.height+"px",
		  width: options.width*this.slideCount+"px",
		  left: (-1*(options.startSlide)*options.width)+"px" // Setting the cassette default position
		});
		
	this.slide.css({
			height: options.height+"px",
			width: options.width+"px"
		});
		
		
	//creating the arrows and putting them in the correct position
	
		
	//the left arrow is being constructed here... :) :) :) :) :) 
	
		this.leftArrow = $("<div/>",{
			id:"leftArrow",
			class:"urbancoyote-slider-leftArrow"
		}).appendTo(this);
				
		this.leftArrow.css({
			
			height: options.arrowHeight,
			width: options.arrowWidth,
			left: options.arrowOffset+"px",
			top: ((options.height-options.arrowHeight)/2)+"px"
			
			});
			
		//the right arrow construction
			
		this.rightArrow = $("<div/>",{
			id:"rightArrow",
			class:"urbancoyote-slider-rightArrow"
		}).appendTo(this);		
			
		
		this.rightArrow.css({
			
			height: options.arrowHeight,
			width: options.arrowWidth,
			right: options.arrowOffset+"px",
			top: ((options.height-options.arrowHeight)/2)+"px"
			
			});
			
	//creating the position wrapper 

 	this.posWrapper = $("<div/>",{
					  id:"posWrapper",
					  class:"urbancoyote-slider-posWrapper"
				  });
				  
	this.posWrapper.appendTo(this);
	
	
	
	//Creating the posMarkers and adding it to the posWrapper
	
	this.posMarker = new Array();
	
	for (i=0; i<this.slideCount; i++) {
		
		//this.posMarker = this.posMarker+i;
		
		this.posMarker[i] = $("<div/>",{
			id:"posMarker"+i,
			class:"urbancoyote-slider-posMarker",
			pos:i
		});
		
		this.posMarker[i].appendTo(this.posWrapper);
		
	};	
	
		
	//positioning posWrapper CENTER BOTTOM 
		this.posWrapper.css({
				width:this.slideCount*this.posMarker[0].width(),
				left:(options.width/2)-(this.posWrapper.width()/2)+"px"
			});
			
	// setting the posMarker's initial indicator
	this.posMarker[options.startSlide].css("background-position","center");



	//getting vars ready for passing to the functions
	
		var pos = options.startSlide;
		var slideCount = this.slideCount;
		var cassette = this.cassette;
		var posMarker = this.posMarker;
		
		// here starts the initial auto play function.....

	this.intervalID = setInterval(function(){
		
		pos = autoplay(pos, slideCount);
		
	},options.autoplayTimer);
	
	
	var intervalID = this.intervalID; 	//making the intervalID passable

	// autostop on mouseover  and start on mouse out... 
	this.mouseleave(function(){
	  intervalID = setInterval(function(){
		  pos = autoplay(pos, slideCount);
	  },options.autoplayTimer);
	});	
	
	//Start the auto play on mouse leave... :)
	this.mouseenter(function(){
		clearInterval(intervalID);
	});	
	
	
	//Left Arrow functionality ... 
	this.leftArrow.click(function(){
	  if (pos > 0){
		pos = positioner(pos, -1);
	  }else{
		pos = positioner2(pos, (slideCount-1));		
	  };
	});
	
	// right arrow functionality
	this.rightArrow.click(function(){
	  if (pos < slideCount-1){
		pos = positioner(pos, 1);
	  }else{
		pos = positioner2(pos, 0);		
	  };
	});
	
	
	
	$.each(this.posMarker, function(index, element){
		
		$(this).click(function(){
			var position = $(this).attr("pos");
			$(this).css("cursor","default");
			pos = positioner2(pos, position);

		});
		
		$(this).mouseover(function(e) {
			if(index != pos){
			  $(this).css({
				"background-position":"bottom",
				cursor: "pointer"				  
			  });
			};
        });
		
		$(this).mouseout(function(e) {
			if(index != pos){
			  $(this).css({
				  "background-position":"top",
			  });
			};
		});


		
		
	});
	
	
/*	this.posWrapper.each(function(index, element) {
	
		$(this).click(function(element){
			
			
		  var position = $(element).attr("pos");
		  
		  
		  $(this).css("cursor","default");
		  pos = positioner2(pos, position);
		});
	});
*/			
////////////////////////////////////////////

	///var wrapper_div = $("#main-slider-pos-wrapper div");
	
	
	//$(wrapper_div).each(function(index, element) {
		
		
/*        $(this).click(function(){
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
    });*/

/////////////////////////////////////////////////////////////	
	
		////////////////////////////////////////////// Private Function sets ///////
		function positioner(pos, dir){
		  var dir = parseInt(dir);
			  pos = parseInt(pos);		
		  posMarker[pos].css("background-position","top");
		  if(dir){
		  pos = pos + dir;
		  }
		  cassette.animate({
			  left: (-1*pos*options.width)+"px"
		  }, options.sliderSpeed);
		  posMarker[pos].css("background-position","center");
		  return pos;
		};
		
		function positioner2(pos_i, pos_f){
		  //		  
		  //initial posMarker background reset
		  posMarker[pos_i].css("background-position","top");
		  
		  //send the cassette to next position
		  cassette.animate({
			  left: (-1*pos_f*options.width)+"px"
		  }, options.sliderSpeed);
		  
		  //change current posMarker background		  
		  
		  
		  //console.log("positioner2 "+pos_f);
		  posMarker[pos_f].css("background-position","center");
		  
		  return pos_f;
		  
		};
		
		
		
		function autoplay(pos, slideCount){
	
		
		//console.log(pos, slideCount, cassette, posMarker);
		//var cassette = cassette;
		  var last_slide = slideCount-1;
		  		  
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

  };
})( jQuery );