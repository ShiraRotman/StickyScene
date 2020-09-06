import React from "react";

import ImageSource from "./image-source.js";
import { imageSource } from "./utils.js";

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
		
		this.controllerPressed=this.controllerPressed.bind(this);
		this.controllerMoved=this.controllerMoved.bind(this);
		this.controllerReleased=this.controllerReleased.bind(this);
		this.controllerLeft=this.controllerLeft.bind(this);
	}
	
	controllerPressed(event)
	{
		if (!this.dragging)
		{
			const bounds=this.element.current.getBoundingClientRect();
			this.dragging=
			{ originX: event.pageX-bounds.left, originY: event.pageY-bounds.top };
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
			coordX: event.pageX-this.dragging.originX,
			coordY: event.pageY-this.dragging.originY
		});
	}
	
	render()
	{
		return (
			<img src={imageSource.getStickerImage(this.props.stickerID)} alt="Sticker"
				onMouseDown={this.controllerPressed} onMouseMove={this.controllerMoved}
				onMouseUp={this.controllerReleased} onMouseLeave={this.controllerLeft}
				draggable={false} ref={this.element} style={
			{
				width: ImageSource.stickerWidth, height: ImageSource.stickerHeight,
				position: "absolute", left: this.state.coordX, top: this.state.coordY
			}}/>
		);
	}
}
