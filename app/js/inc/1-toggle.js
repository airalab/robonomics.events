var selector = 'data-toggle',
	classOpen = 'open',
	classSwitchOn = 'on';

function action(e){

	var open, close;

	e.classList.toggle(classSwitchOn);
	o = document.querySelectorAll( e.getAttribute(selector) );

	o.forEach(function(i){
		console.log(i);
		i.classList.toggle(classOpen);
	});
}


function init(){

	var e = document.querySelectorAll('[' + selector + ']');

	e.forEach(function(i){

		i.addEventListener("click", function(event){
			event.preventDefault();
			action(this);
		});

	});
}


window.addEventListener('load', init, false);