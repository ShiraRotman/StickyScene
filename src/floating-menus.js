import React from "react";
import Tippy from "@tippyjs/react";

import IconButton from "./icon-button.js";
import ImageSource from "./image-source.js";
import { imageSource } from "./utils.js";

const OPTIONS_MENU_ICONS=["newscene","loadscene","savescene"];

export default class FloatingMenus extends React.Component
{
	constructor(props)
	{ 
		super(props); this.state={ shown: false, sceneSelection: false };
		this.toggleMenus=this.toggleMenus.bind(this);
		this.handleMenuOptionClick=this.handleMenuOptionClick.bind(this);
		this.handleNewSceneSelect=this.handleNewSceneSelect.bind(this);
		this.handleStickerSelect=this.handleStickerSelect.bind(this);
	}
	
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
		this.sendThumbClickEvent("newscene",event.currentTarget.id);
		this.setState({ shown: false, sceneSelection: false });
	}
	
	handleStickerSelect(event)
	{ this.sendThumbClickEvent("addsticker",event.currentTarget.id); }
	
	sendThumbClickEvent(type,thumbID)
	{
		const menuEvent=new CustomEvent(type,{ detail: { imageID: thumbID } });
		this.props.onMenuItemClick(menuEvent);
	}
	
	render()
	{
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
			verticalMenuArray=imageSource.getScenesThumbs();
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
				placement="bottom-start" className="floating-menu vertical-floating-menu"
				theme="light" content={verticalMenu}>
				
				<Tippy interactive={true} arrow={false} offset={[0,0]} visible={this.state.shown}
					placement="left-start" theme="light" maxWidth="none"
					className="floating-menu" content=
					{	
						imageSource.getStickersThumbs(this.props.sceneID).map(thumb => 
						<img src={thumb.path} alt="Sticker Thumb" onClick={this.handleStickerSelect}
							className="menu-item sticker-item" key={thumb.id} id={thumb.id} style={
						{
							width: ImageSource.stickerThumbWidth,
							height: ImageSource.stickerThumbHeight
						}}/>
					)}>
					
					<span className="menu-toggle">
						<IconButton icon={process.env.PUBLIC_URL + "icons/menus.svg"} alt="Menus"
							toggled={this.state.shown} onClick={this.toggleMenus}/>
					</span>
				</Tippy>
			</Tippy>
		);
	}
}
