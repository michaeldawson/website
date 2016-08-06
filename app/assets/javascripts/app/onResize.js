function addResizeListener(callback) {
  if(typeof(callback) == 'function') window.resizeListeners.push(callback);
}

window.resizeListeners = [];

function handleResize(event) {
  window.resizeListeners.forEach(function(callback){
    callback.call(this, event)
  })
}

$(window).on('resize', handleResize);
