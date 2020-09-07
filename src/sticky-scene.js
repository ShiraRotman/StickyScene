import React from "react";

import FloatingMenus from "./floating-menus.js";
import IconButton from "./icon-button.js";
import Sticker from "./sticker.js";
import { imageSource } from "./utils.js";

export default class StickyScene extends React.Component
{
	constructor(props)
	{ 
		super(props);
		this.state={ sceneID: "underwater-treasures", stickers: [] };
		this.handleMenuItemClick=this.handleMenuItemClick.bind(this);
	}
	
	handleMenuItemClick(event)
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
					className="w-100 h-100"/>
				{this.state.stickers.map((sticker,index) => 
					<Sticker stickerID={sticker} key={"sticker-" + index}/>
				)}
				<FloatingMenus sceneID={this.state.sceneID} onMenuItemClick={this.handleMenuItemClick}/>
				<IconButton icon={process.env.PUBLIC_URL + "/icons/fullscreen.svg"} alt="Fullscreen Mode"
					className="full-screen-button"/>
			</div>
		);
	}
}