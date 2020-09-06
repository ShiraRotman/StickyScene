import React from "react";
import ReactDOM from "react-dom";

import FloatingMenus from "./floating-menus.js";
import ImageSource from "./image-source.js";
import { imageSource } from "./utils.js";

class StickyScene extends React.Component
{
	constructor(props)
	{ 
		super(props);
		this.state=
		{
			sceneID: "underwater-treasures", stickers: [],
			scenePath: process.env.PUBLIC_URL + "/hardcoded/scenes/underwater-treasures.jpg"
		};
		this.handleMenuItemClick=this.handleMenuItemClick.bind(this);
	}
	
	handleMenuItemClick(event)
	{
		switch (event.type)
		{
			case "newscene":
				this.setState(
				{ 
					sceneID: event.detail.imageID, stickers: [],
					scenePath: imageSource.getSceneImage(event.detail.imageID)
				});
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
				<img src={this.state.scenePath} className="w-100 h-100" alt="Background Scene"/>
				{this.state.stickers.map((sticker,index) => 
					<img src={imageSource.getStickerImage(sticker)} alt="Sticker" 
						key={"sticker-" + index} style={
					{
						width: ImageSource.stickerWidth, height: ImageSource.stickerHeight,
						//Temporary random values
						position: "absolute", top: Math.random()*800, left: Math.random()*450
					}}/>
				)}
				<FloatingMenus sceneID={this.state.sceneID} onMenuItemClick={this.handleMenuItemClick}/>
			</div>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<StickyScene/>
	</React.StrictMode>,
	document.getElementById("stickySceneRoot"));
