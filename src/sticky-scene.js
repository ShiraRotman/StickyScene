import React from "react";
import FloatingMenus from "./floating-menus.js";
import FullScreenButton from "./full-screen-button.js";
import Sticker from "./sticker.js";
import { imageSource } from "./utils.js";

export default class StickyScene extends React.Component
{
	constructor(props)
	{ 
		super(props); 
		this.state={ sceneID: "underwater-treasures", stickers: [] };
		this.menuItemClicked=this.menuItemClicked.bind(this);
	}
	
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
					className="w-100 h-100" draggable={false}/>
					
				{this.state.stickers.map((sticker,index) => 
					<Sticker stickerID={sticker} key={"sticker-" + index}/>
				)}
				
				<FloatingMenus sceneID={this.state.sceneID} onMenuItemClick={this.menuItemClicked}/>
				<FullScreenButton/>
			</div>
		);
	}
}
