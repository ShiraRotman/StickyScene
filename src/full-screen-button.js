import React from "react";
import fullscreen from "fscreen";
import IconButton from "./icon-button.js";

export default class FullScreenButton extends React.Component
{
	constructor(props) 
	{
		super(props);
		this.fullscrModeChanged=this.fullscrModeChanged.bind(this);
		this.buttonClicked=this.buttonClicked.bind(this);
	}
	
	componentDidMount()
	{
		if (fullscreen.fullscreenEnabled)
			fullscreen.addEventListener("fullscreenchange",this.fullscrModeChanged);
	}
	
	componentWillUnmount()
	{
		if (fullscreen.fullscreenEnabled)
			fullscreen.removeEventListener("fullscreenchange",this.fullscrModeChanged);
	}
	
	fullscrModeChanged()
	{
		const isFullScreen=(fullscreen.fullscreenElement!==null);
		if (this.props.onChange) this.props.onChange(isFullScreen);
	}
	
	buttonClicked()
	{
		if (fullscreen.fullscreenElement===null)
			fullscreen.requestFullscreen(document.documentElement);
		else fullscreen.exitFullscreen();
	}
	
	render()
	{
		return (
			<IconButton alt="Fullscreen Mode" onClick={this.buttonClicked}
				className={!fullscreen.fullscreenEnabled?"d-none":""}
				icon={process.env.PUBLIC_URL + "/icons/" + (this.props.isFullScreen?
				"exitfullscr":"fullscreen") + ".svg"}/>
		);
	}
}
