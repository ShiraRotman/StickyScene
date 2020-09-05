import React from "react";
import ReactDOM from "react-dom";

import FloatingMenus from "./floating-menus.js";
import { getImageSource } from "./image-source.js";

class StickyScene extends React.Component
{
	constructor(props)
	{ 
		super(props);
		this.state=
		{
			sceneID: "underwater-treasures",
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
					sceneID: event.detail.imageID,
					scenePath: getImageSource().getFullImage(event.detail.imageID)
				});
				break;
			default: break;
		}
	}
	
	render()
	{
		return (
			<div className="w-100 h-100">
				<img src={this.state.scenePath} className="w-100 h-100" alt="Background Scene"/>
				<FloatingMenus onMenuItemClick={this.handleMenuItemClick}/>
			</div>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<StickyScene/>
	</React.StrictMode>,
	document.getElementById("stickySceneRoot"));
