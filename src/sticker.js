import React from "react";
import ImageSource from "./image-source.js";
import { imageSource, DragDropService } from "./utils.js";

export default class Sticker extends React.Component
{
	constructor(props)
	{
		super(props); this.element=React.createRef();
		this.state=
		{ 
			coordX: (window.innerWidth-ImageSource.stickerWidth)/2,
			coordY: (window.innerHeight-ImageSource.stickerHeight)/2
		};
		
		this.dragEvents=[
		{ 
			type: DragDropService.DRAG_START_EVENT_TYPE,
			listener: this.controllerPressed.bind(this)
		},
		{
			type: DragDropService.DRAG_MOVE_EVENT_TYPE,
			listener: this.controllerMoved.bind(this)
		},
		{
			type: DragDropService.DRAG_END_EVENT_TYPE,
			listener: this.controllerReleased.bind(this)
		},
		{
			type: DragDropService.DRAG_CANCEL_EVENT_TYPE,
			listener: this.controllerLeft.bind(this)
		}];
	}
	
	componentDidMount() 
	{
		const element=this.element.current;
		this.dragEvents.forEach(event => element.addEventListener(event.type,
				event.listener));
		if (this.touchID)
		{
			element.setAttribute(DragDropService.TOUCH_ID_ATTR,this.touchID);
			delete this.touchID;
		}
		DragDropService.registerDragEvents(element);
	}
	
	componentWillUnmount()
	{
		const element=this.element.current;
		DragDropService.unregisterDragEvents(element);
		this.dragEvents.forEach(event => element.removeEventListener(event.type,
				event.listener));
		if (element.hasAttribute(DragDropService.TOUCH_ID_ATTR))
			this.touchID=element.getAttribute(DragDropService.TOUCH_ID_ATTR);
	}
	
	controllerPressed(event)
	{
		if (!this.dragging)
		{
			const bounds=this.element.current.getBoundingClientRect();
			this.dragging=
			{ 
				originX: event.detail.pageX-bounds.left,
				originY: event.detail.pageY-bounds.top
			};
		}
	}
	
	controllerMoved(event) { if (this.dragging) this.updatePosition(event); }
	controllerLeft() { if (this.dragging) delete this.dragging; }
	
	controllerReleased(event)
	{ if (this.dragging) { this.updatePosition(event); delete this.dragging; } }
	
	updatePosition(event)
	{
		this.setState(
		{
			coordX: event.detail.pageX-this.dragging.originX,
			coordY: event.detail.pageY-this.dragging.originY
		});
	}
	
	render()
	{
		return (
			<img src={imageSource.getStickerImage(this.props.stickerID)} alt="Sticker"
				draggable={false} ref={this.element} style={
			{
				//TODO: Get dimensions from image data / file name
				width: ImageSource.stickerWidth, height: ImageSource.stickerHeight,
				position: "absolute", left: this.state.coordX, top: this.state.coordY
			}}/>
		);
	}
}
