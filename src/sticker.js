import React from "react";
import Tippy from "@tippyjs/react";

import ImageSource from "./image-source.js";
import { DragDropService } from "./drag-drop-service.js";
import { imageSource, MatrixOperations } from "./utils.js";

const SCENE_BOUNDARY=0,CLICK_TAP_THRESHOLD=500;
const ROTATION_ANGLE=18,SCALE_FRACTION=0.1,transforms=[
{ 
	icon: "rotate_left", title: `Rotate left by ${ROTATION_ANGLE} degrees`,
	transform: MatrixOperations.create2DRotationMatrix(ROTATION_ANGLE)
},
{ 
	icon: "rotate_right", title: `Rotate right by ${ROTATION_ANGLE} degrees`,
	transform: MatrixOperations.create2DRotationMatrix(-ROTATION_ANGLE)
},
{ 
	icon: "rotate90", title: "Rotate left by 90 degrees",
	transform: MatrixOperations.create2DRotationMatrix(90)
},
{ 
	icon: "flipimage", title: "Flip (mirror image)",
	transform: MatrixOperations.create2DScaleMatrix(-1,1)
},
{ 
	icon: "scaleup", title: `Enlarge by ${SCALE_FRACTION*100}%`,
	transform: MatrixOperations.create2DScaleMatrix(1+SCALE_FRACTION)
},
{ 
	icon: "scaledown", title: `Shrink by ${SCALE_FRACTION*100}%`,
	transform: MatrixOperations.create2DScaleMatrix(1-SCALE_FRACTION)
}];

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
			menuShown: false, 
			transform: MatrixOperations.createIdentityMatrix(2),
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
		
		this.operations=transforms.concat([
		{
			icon: "resetimage", title: "Reset", 
			clickfunc: this.resetItemClicked.bind(this)
		},
		{ 
			icon: "delete_image", title: "Remove Sticker", 
			clickfunc: props.onRemove
		}]);
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
				startTime: Date.now(),
				originX: event.detail.pageX-bounds.left,
				originY: event.detail.pageY-bounds.top
			};
		}
	}
	
	controllerLeft() { if (this.dragging) delete this.dragging; }
	controllerMoved(event) 
	{ 
		if (this.dragging)
		{
			this.updatePosition(event); this.dragging.startTime=0;
			if (this.state.menuShown) this.setState({ menuShown: false });
		}
	}
	
	controllerReleased(event)
	{ 
		if (this.dragging)
		{ 
			const element=this.element.current;
			if ((this.dragging.startTime>0)&&(Date.now()-this.dragging.startTime<=
					CLICK_TAP_THRESHOLD))
				this.setState(state => ({ menuShown: !state.menuShown }));
			else
			{
				this.updatePosition(event);
				this.setState(
				{
					coordX: Number.parseInt(element.style.left),
					coordY: Number.parseInt(element.style.top)
				});
			}
			delete this.dragging;
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
	
	operationItemClicked(transform)
	{
		this.setState(state => 
		({ transform: MatrixOperations.multiplyMatrices(transform,state.transform) }));
	}
	
	resetItemClicked()
	{ this.setState({ transform: MatrixOperations.createIdentityMatrix(2) }); }
	
	render()
	{
		const transform=this.state.transform;		
		return (
			<Tippy interactive={true} placement="top" visible={this.state.menuShown}
				className="floating-menu" theme="light" maxWidth="none" content=
				{
					this.operations.map(operation => 
					<img src={process.env.PUBLIC_URL + "/icons/" + operation.icon + ".svg"}
						alt="Sticker Operation" key={operation.icon} title={operation.title}
						className="menu-item oper-item icon-wrapper" onClick=
						{operation.transform?this.operationItemClicked.bind(this,
						operation.transform):operation.clickfunc}/>)
				}>
				
				<img src={imageSource.getStickerImage(this.props.stickerID)} alt="Sticker"
					draggable={false} ref={this.element} style={
				{
					width: this.stickerWidth, height: this.stickerHeight,
					position: "absolute", left: this.state.coordX, top: this.state.coordY,
					transform: `matrix(${transform[0][0]},${transform[1][0]},${transform[0][1]},${transform[1][1]},0,0)`
				}}/>
			</Tippy>
		);
	}
}
