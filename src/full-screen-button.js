import React from "react";
import fullscreen from "fscreen";
import IconButton from "./icon-button.js";

export default class FullScreenButton extends React.Component
{
	constructor(props) 
	{
		super(props); this.state={ isFullScrMode: false }
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
	{ this.setState({ isFullScrMode: (fullscreen.fullscreenElement!==null) }); }
	
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
				className={"full-screen-button" + (!fullscreen.fullscreenEnabled?" d-none":"")}
				icon={process.env.PUBLIC_URL + "/icons/" + (this.state.isFullScrMode?
				"exitfullscr":"fullscreen") + ".svg"}/>
		);
	}
}
