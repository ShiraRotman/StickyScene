import React from "react";
import ImageSource from "./image-source.js";
import { imageSource, DragDropService } from "./utils.js";

const SCENE_BOUNDARY=0;

export default class Sticker extends React.Component
{
	constructor(props)
	{
		super(props); this.element=React.createRef();
		//TODO: Get dimensions from image data / file name
		this.stickerWidth=ImageSource.stickerWidth; 
		this.stickerHeight=ImageSource.stickerHeight;
		
		this.state=
		{ 
			coordX: (window.innerWidth-this.stickerWidth)/2,
			coordY: (window.innerHeight-this.stickerHeight)/2
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
		DragDropService.registerDragEvents(element);
	}
	
	componentWillUnmount()
	{
		const element=this.element.current;
		DragDropService.unregisterDragEvents(element);
		this.dragEvents.forEach(event => element.removeEventListener(event.type,
				event.listener));
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
	{ 
		if (this.dragging)
		{ 
			this.updatePosition(event); delete this.dragging;
			const element=this.element.current;
			this.setState({ coordX: element.style.left, coordY: element.style.top });
		} 
	}
	
	updatePosition(event)
	{
		let coordX=event.detail.pageX-this.dragging.originX;
		let coordY=event.detail.pageY-this.dragging.originY;
		if (coordX<SCENE_BOUNDARY) coordX=SCENE_BOUNDARY;
		else if (coordX+this.stickerWidth+SCENE_BOUNDARY>window.innerWidth)
			coordX=window.innerWidth-this.stickerWidth-SCENE_BOUNDARY;
		if (coordY<SCENE_BOUNDARY) coordY=SCENE_BOUNDARY;
		else if (coordY+this.stickerHeight+SCENE_BOUNDARY>window.innerHeight)
			coordY=window.innerHeight-this.stickerHeight-SCENE_BOUNDARY;
		
		const element=this.element.current;
		element.style.left=coordX + "px"; element.style.top=coordY + "px";
	}
	
	render()
	{
		return (
			<img src={imageSource.getStickerImage(this.props.stickerID)} alt="Sticker"
				draggable={false} ref={this.element} style={
			{
				width: this.stickerWidth, height: this.stickerHeight,
				position: "absolute", left: this.state.coordX, top: this.state.coordY
			}}/>
		);
	}
}
