import React from "react";
import Tippy from "@tippyjs/react";
import { toast, ToastContainer } from "react-toastify";

import FloatingMenus from "./floating-menus.js";
import FullScreenButton from "./full-screen-button.js";
import Sticker from "./sticker.js";
import { imageSource, screenOrientation } from "./utils.js";

const ORIENTATION_LOCK_FAILED_MSG="Screen orientation lock failed! Please " + 
		"manually rotate your device to landscape if possible"

export default class StickyScene extends React.Component
{
	constructor(props)
	{ 
		super(props); this.nextIndex=0; this.state=
		{ sceneID: "underwater-treasures", stickers: [], isFullScreen: false };
		this.menuItemClicked=this.menuItemClicked.bind(this);
		this.fullscrModeChanged=this.fullscrModeChanged.bind(this);
	}
	
	menuItemClicked(event)
	{
		switch (event.type)
		{
			case "newscene":
				this.setState({ sceneID: event.detail.imageID, stickers: [] });
				this.nextIndex=0; break;
			case "addsticker":
				//Array.concat is wasteful!
				this.state.stickers.push(
				{ index: this.nextIndex++, sticker: event.detail.imageID });
				this.setState(state => ({ stickers: state.stickers }));
				break;
			default: break;
		}
	}
	
	stickerRemoved(index)
	{
		const arrayIndex=this.state.stickers.findIndex(stickerData => 
				stickerData.index===index);
		this.state.stickers.splice(arrayIndex,1);
		this.setState(state => ({ stickers: state.stickers }));
	}
	
	fullscrModeChanged(isFullScreen)
	{
		if ((isFullScreen)&&(!this.hasOwnProperty("locked")))
		{
			const orientation=screenOrientation.orientation;
			if (orientation instanceof String)
			{
				const lockOrientation=screenOrientation.lockOrientation;
				if (lockOrientation) this.locked=lockOrientation("landscape");
				else this.locked=false;
				if (!this.locked) this.showToast(ORIENTATION_LOCK_FAILED_MSG);
			}
			else if (orientation)
			{
				orientation.lock("landscape").then(() => this.locked=true).catch(() => 
				{ this.locked=false; this.showToast(ORIENTATION_LOCK_FAILED_MSG); });
			}
		}
		this.setState({ isFullScreen: isFullScreen });
	}
	
	showToast(message)
	{
		toast(message,
		{
			position: "bottom-center", hideProgressBar: true, draggable: false,
			autoClose: 5000, pauseOnHover: true, closeOnClick: true,
		});
	}
	
	render()
	{
		return (
			<div className="w-100 h-100">
				<img src={imageSource.getSceneImage(this.state.sceneID)} alt="Background Scene"
					className="w-100 h-100" draggable={false}/>
					
				{this.state.stickers.map(stickerData => 
					<Sticker stickerID={stickerData.sticker} key={"sticker-" + stickerData.index}
						onRemove={this.stickerRemoved.bind(this,stickerData.index)}/>
				)}
				
				<FloatingMenus sceneID={this.state.sceneID} onMenuItemClick={this.menuItemClicked}/>
				<ToastContainer bodyClassName="toast-message" style={{ width: window.innerWidth/2 }}/>
				
				<Tippy visible={!this.state.isFullScreen} placement="auto" theme="light"
					maxWidth="none" content="Switch to full screen for full enjoyment!">
					
					<span className="full-screen-button">
						<FullScreenButton isFullScreen={this.state.isFullScreen}
							onChange={this.fullscrModeChanged}/>
					</span>
				</Tippy>
			</div>
		);
	}
}
