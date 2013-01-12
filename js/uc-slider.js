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
  	var defaultOptions = {
			height: 350,
			width: 800,
			startSlide: 1,
			autoplayTimer: 1000,
			sliderSpeed: 500
		};
	//combining the default options with the user inputed options
	var options = $.extend({}, defaultOptions, options); 
	
	//Making sure the options inputed by the user are what they are suppose to be... No wierd shit...
	
	if(options.startSlide>this.slideCount)
		options.startSlide = this.slideCount; //startslider Cannot be more than the slide Count...
		
	if(options.sliderSpeed>options.autoplayTimer)
		options.sliderSpeed = (options.autoplayTimer*.8); // slider speed cannot be faster than the autoplayTimer... it just wont work don't argue this one. this sets it to 80% of the value
		
		
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
	
		
	//the arrows are being constructed here... :) :) :) :) :) 
	
		this.leftArrow = $("<div/>",{
			id:"leftArrow",
			class:"urbancoyote-slider-leftArrow"
		}).appendTo(this);
		
		console.log(this.leftArrow);
		
		this.leftArrow.css({
			
			left: "0px",
			top: (options.height/2)-(this.leftArrow.height()/2)+"px"
			
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
			class:"urbancoyote-slider-posMarker"
		});
		
		this.posMarker[i].appendTo(this.posWrapper);
		
	};	
	
		
	//Fix the posWrapper width and Center it
		this.posWrapper.css({
				width:this.slideCount*this.posMarker[0].width(),
				left:(options.width/2)-(this.posWrapper.width()/2)+"px"
			});
			
	// setting the posMarker's initial indicator
	this.posMarker[options.startSlide].css("background","pink");



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
	
	this.mouseenter(function(){
		clearInterval(intervalID);
	});	
	
	

	
		////////////////////////////////////////////// Private Function sets ///////
		function slide(pos, dir){
		  var dir = parseInt(dir);
			  pos = parseInt(pos);		
		  $("#posMarker"+pos).css("background","red");
		  if(dir){
		  pos = pos + dir;
		  }
		  cassette.animate({
			  left: (-1*pos*options.width)+"px"
		  }, sliderSpeed);
		  $("#posMarker"+pos).css("background","pink");
		  return pos;
		};
		
		function positioner2(pos_i, pos_f){

		  //initial posMarker background reset
		  posMarker[pos_i].css("background","red");
		  
		  //send the cassette to next position
		  cassette.animate({
			  left: (-1*pos_f*options.width)+"px"
		  }, options.sliderSpeed);
		  
		  //change current posMarker background		  
		  posMarker[pos_f].css("background","pink");
		  
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