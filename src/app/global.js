import React from 'react';
import ReactDOM from 'react-dom';

export var World = {
	moveit: function(starttime, timestamp, el, dist, duration, close){
	    //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
	    var timestamp = timestamp || new Date().getTime();
	    // subtract the starting timestamp from most recent to get how long timers been running
	    let runtime = timestamp - starttime;
	    // divide run time by duration to get what % of time completed
	    let progress = runtime / duration;
	    // If we're closing we want the % to go down and never less than 0
	    if (close){
	      progress = Math.max((1-progress), 0);
	    } else {
	        // We don't want to be multiplying the height more than 1
	        progress = Math.min(progress, 1);
	        // Padding needs to be added on open otherwise it will always be partially visible
	        el.style.paddingTop = '10px';
	      }
	      // Update the height to the current % of the distance input
	      el.style.height = (dist * progress).toFixed(2) + 'px';
	      // If the runtime is less than the duration call requestAnimation again
	      if (runtime < duration){ // if duration not met yet
	          requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
	              World.moveit(starttime, timestamp, el, dist, duration, close);
	          });
	        // If the time is up and we're trying to close, remove the padding
	      } else if (close) {
	        el.style.paddingTop = '0';
	      }  
	},
	getHeight: function(recipe){
    let length = recipe.ingredients.length;
    return length*37+66;
  }
}
	


