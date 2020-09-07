import HardcodedImageSource from "./hardcoded-source.js";
const imageSource=new HardcodedImageSource();

//Only these drag event types are needed for the application
const DRAG_START_EVENT_TYPE="dragdropstart",DRAG_MOVE_EVENT_TYPE="dragdropmove";
const DRAG_END_EVENT_TYPE="dragdropend",DRAG_CANCEL_EVENT_TYPE="dragdropcancel";
const MAIN_MOUSE_BUTTON=0,MAIN_MOUSE_BUTTON_FLAG=1,TOUCH_ID_ATTR="data-touch";

const mouseEvents=[
{ type: "mousedown", listener: elemMouseButtonDown },
{ type: "mousemove", listener: elemMouseMoved },
{ type: "mouseup", listener: elemMouseButtonUp },
{ type: "mouseleave", listener: elemInteractCancelled }];

const pointerEvents=[
{ type: "pointerdown", listener: elemPointerDown },
{ type: "pointermove", listener: elemPointerMoved },
{ type: "pointerup", listener: elemPointerUp },
{ type: "pointerout", listener: elemInteractCancelled }];

const touchEvents=[
{ type: "touchstart", listener: elemTouchStarted },
{ type: "touchmove", listener: elemTouchMoved },
{ type: "touchend", listener: elemTouchEnded },
{ type: "touchcancel", listener: elemInteractCancelled }];

function validateElement(element)
{
	if (!element) throw new ReferenceError("A DOM element must be supplied!");
	else if (!(element instanceof Element))
		throw new TypeError("The parameter supplied must be a DOM element!");
}

function handleRegUnreg(element,listenerFunc)
{
	if (window.PointerEvent)
		pointerEvents.forEach(event => listenerFunc(event.type,event.listener));
	else
	{
		mouseEvents.forEach(event => listenerFunc(event.type,event.listener));
		if (window.TouchEvent)
			touchEvents.forEach(event => listenerFunc(event.type,event.listener));
	}
}

function registerDragEvents(element)
{
	validateElement(element); element.draggable=false;
	handleRegUnreg(element,element.addEventListener);
}

function unregisterDragEvents(element)
{
	validateElement(element);
	handleRegUnreg(element,element.removeEventListener);
}

function sendCustomDragEvent(element,type,detailSource)
{
	let eventInit;
	if (detailSource)
	{
		eventInit=
		//Only these properties are needed in the application
		{ detail: { pageX: detailSource.pageX, pageY: detailSource.pageY } };
	}
	element.dispatchEvent(new CustomEvent(type,eventInit));
}

function elemMouseButtonDown(event)
{
	if (event.button===MAIN_MOUSE_BUTTON) 
		sendCustomDragEvent(event.target,DRAG_START_EVENT_TYPE,event);
}

function elemMouseMoved(event)
{
	if ((event.buttons & MAIN_MOUSE_BUTTON_FLAG)!==0)
		sendCustomDragEvent(event.target,DRAG_MOVE_EVENT_TYPE,event);
}

function elemMouseButtonUp(event)
{
	if (event.button===MAIN_MOUSE_BUTTON)
		sendCustomDragEvent(event.target,DRAG_END_EVENT_TYPE,event);
}

function handlePointerEvent(event,type,mouseEventFunc)
{
	if (event.isPrimary)
	{
		if (event.pointerType==="mouse") mouseEventFunc(event);
		else sendCustomDragEvent(event.target,type,event);
	}
}

function elemPointerDown(event)
{ handlePointerEvent(event,DRAG_START_EVENT_TYPE,elemMouseButtonDown); }

function elemPointerMoved(event) 
{ handlePointerEvent(event,DRAG_MOVE_EVENT_TYPE,elemMouseMoved); }

function elemPointerUp(event)
{ handlePointerEvent(event,DRAG_END_EVENT_TYPE,elemMouseButtonUp); }

function elemTouchStarted(event)
{
	event.preventDefault(); //Prevent mouse events from firing
	const element=event.target,touch=event.targetTouches[0];
	element.setAttribute(TOUCH_ID_ATTR,touch.identifier);
	sendCustomDragEvent(element,DRAG_START_EVENT_TYPE,touch);
}

function handleTouchMotionEvent(event,type,touchesList,hasToRemoveAttr)
{
	event.preventDefault();
	const element=event.target,touchID=element.getAttribute(TOUCH_ID_ATTR);
	if (touchID)
	{
		let found=false,index=0;
		while ((!found)&&(index<event[touchesList].length))
		{
			if (event[touchesList][index].identifier===touchID) found=true;
			else index++;
		}
		if (found)
		{
			if (hasToRemoveAttr) element.removeAttribute(TOUCH_ID_ATTR);
			sendCustomDragEvent(element,type,event[touchesList][index]);
		}
		else elemInteractCancelled(event);
	}
}

function elemTouchMoved(event)
{ handleTouchMotionEvent(event,DRAG_MOVE_EVENT_TYPE,"targetTouches"); }

function elemTouchEnded(event)
{ handleTouchMotionEvent(event,DRAG_END_EVENT_TYPE,"changedTouches",true); }

function elemInteractCancelled(event)
{
	const element=event.target;
	element.removeAttribute(TOUCH_ID_ATTR);
	sendCustomDragEvent(element,DRAG_CANCEL_EVENT_TYPE);
}

const DragDropService=
{ 
	registerDragEvents,unregisterDragEvents,TOUCH_ID_ATTR,DRAG_START_EVENT_TYPE,
	DRAG_MOVE_EVENT_TYPE,DRAG_END_EVENT_TYPE,DRAG_CANCEL_EVENT_TYPE
}
export { imageSource, DragDropService };
