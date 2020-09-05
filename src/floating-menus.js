import React from "react";
import Tippy from "@tippyjs/react";

import { ImageSource,getImageSource } from "./image-source.js";
const OPTIONS_MENU_ICONS=["newscene","loadscene","savescene"];

export default class FloatingMenus extends React.Component
{
	constructor(props)
	{ 
		super(props); this.state={ shown: false, sceneSelection: false };
		this.toggleMenus=this.toggleMenus.bind(this);
		this.closeMenus=this.closeMenus.bind(this);
		this.handleMenuOptionClick=this.handleMenuOptionClick.bind(this);
		this.handleNewSceneSelect=this.handleNewSceneSelect.bind(this);
	}
	
	closeMenus() { this.setState({ shown: false, sceneSelection: false }); }
	toggleMenus()
	{ 
		this.setState(state => 
		({ shown: !this.state.shown, sceneSelection: false }));
	}
	
	handleMenuOptionClick(event)
	{
		switch (event.currentTarget.id)
		{ 
			case "newscene": this.setState({ sceneSelection: true }); break;
			case "menuback": this.setState({ sceneSelection: false }); break;
			default:
				this.props.onMenuItemClick(new CustomEvent(event.currentTarget.id));
				this.setState({ shown: false });
				break;
		}
	}
	
	handleNewSceneSelect(event)
	{
		const menuEvent=new CustomEvent("newscene",
		{ detail: { imageID: event.currentTarget.id } });
		this.props.onMenuItemClick(menuEvent);
		this.setState({ shown: false, sceneSelection: false });
	}
	
	render()
	{
		let toggleClassName="menu-toggle icon-wrapper";
		if (this.state.shown) toggleClassName+=" toggled";
		else toggleClassName+=" untoggled";
		
		let verticalMenuArray=(this.state.sceneSelection?["menuback"]:OPTIONS_MENU_ICONS);
		let verticalMenu=verticalMenuArray.map(icon => 
			<div className="menu-item icon-wrapper my-1" id={icon} key={icon}
				onClick={this.handleMenuOptionClick}>
				<img src={process.env.PUBLIC_URL + "icons/" + icon + ".svg"}
					alt="Menu Option" className="w-100 h-100"/>
			</div>
		);
			
		if (this.state.sceneSelection)
		{
			verticalMenuArray=getImageSource().getAvailScenesThumbs();
			verticalMenu=verticalMenu.concat(verticalMenuArray.map(thumb => 
				<div className="menu-item scene-item" id={thumb.id} key={thumb.id}
					onClick={this.handleNewSceneSelect} style={
				{
					width: ImageSource.sceneThumbWidth,
					height: ImageSource.sceneThumbHeight
				}}>
					<img src={thumb.path} alt="Scene Thumb" className="w-100 h-100"/>
				</div>
			));
		}
		
		return (
			<Tippy interactive={true} arrow={false} offset={[0,0]} visible={this.state.shown}
				placement="bottom-start" theme="light" className="floating-menu"
				onClickOutside={this.closeMenus} content={verticalMenu}>
				<div className={toggleClassName} onClick={this.toggleMenus}>
					<img src={process.env.PUBLIC_URL + "icons/menus.svg"}
						className="w-100 h-100" alt="Menu Button"/>
				</div>
			</Tippy>
		);
	}
}
