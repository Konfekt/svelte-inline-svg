// Idea and implementation from https://github.com/hperrin/svelte-material-ui/blob/273ded17c978ece3dd87f32a58dd9839e5c61325/components/forwardEvents.js

export const nativeEvents = [
  'focus', 'blur',
  'fullscreenchange', 'fullscreenerror', 'scroll',
  'cut', 'copy', 'paste',
  'keydown', 'keypress', 'keyup',
  'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel',
  'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop',
  'touchcancel', 'touchend', 'touchmove', 'touchstart',
  'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture'
];

export function forwardEventsBuilder(dispatch, additionalEvents = []) {
  // Combine native and additional events.
  const events = [...nativeEvents, ...additionalEvents];

  // Return an action that attaches DOM event listeners.
  return node => {
    // Forward function to dispatch events with the same type and detail.
    function forward(event) {
      // Re-dispatch event using Svelte's dispatcher.
      dispatch(event.type, event.detail);
    }

    // Attach listeners for each event.
    events.forEach(type => {
      node.addEventListener(type, forward);
    });

    return {
      destroy() {
        events.forEach(type => {
          node.removeEventListener(type, forward);
        });
      }
    }
  };
}
