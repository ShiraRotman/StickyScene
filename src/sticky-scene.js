import React from "react";
import FloatingMenus from "./floating-menus.js";
import FullScreenButton from "./full-screen-button.js";
import Sticker from "./sticker.js";
import { imageSource, DragDropService } from "./utils.js";

export default class StickyScene extends React.Component
{
	constructor(props)
	{ 
		super(props); 
		this.state={ sceneID: "underwater-treasures", stickers: [] };
		this.sceneTouchMoved=this.sceneTouchMoved.bind(this);
		this.sceneTouchEnded=this.sceneTouchEnded.bind(this);
		this.menuItemClicked=this.menuItemClicked.bind(this);
	}
	
	handleTouchEvent(event,type)
	{
		for (let touch of event.changedTouches)
		{
			const element=touch.target;
			if (element.hasAttribute(DragDropService.TOUCH_ID_ATTR))
				DragDropService.sendCustomDragEvent(element,type,touch);
		}
	}
	
	sceneTouchMoved(event)
	{ this.handleTouchEvent(event,DragDropService.DRAG_MOVE_EVENT_TYPE); }
	
	sceneTouchEnded(event)
	{ this.handleTouchEvent(event,DragDropService.DRAG_END_EVENT_TYPE); }
	
	menuItemClicked(event)
	{
		switch (event.type)
		{
			case "newscene":
				this.setState({ sceneID: event.detail.imageID, stickers: [] });
				break;
			case "addsticker":
				//Array.concat is wasteful!
				this.state.stickers.push(event.detail.imageID);
				this.setState(state => ({ stickers: state.stickers }));
				break;
			default: break;
		}
	}
	
	render()
	{
		return (
			<div className="w-100 h-100">
				<img src={imageSource.getSceneImage(this.state.sceneID)} alt="Background Scene"
					className="w-100 h-100" onTouchMove={this.sceneTouchMoved}
					onTouchEnd={this.sceneTouchEnded}/>
					
				{this.state.stickers.map((sticker,index) => 
					<Sticker stickerID={sticker} key={"sticker-" + index}/>
				)}
				
				<FloatingMenus sceneID={this.state.sceneID} onMenuItemClick={this.menuItemClicked}/>
				<FullScreenButton/>
			</div>
		);
	}
}
