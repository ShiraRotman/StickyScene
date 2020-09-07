import React from "react";

export default class IconButton extends React.Component
{
	constructor(props)
	{
		super(props); this.state={ };
		if (!("toggled" in props)) this.state.toggled=false;
		this.buttonPressed=this.buttonPressed.bind(this);
		this.buttonReleased=this.buttonReleased.bind(this);
	}
	
	buttonPressed()
	{ if (!("toggled" in this.props)) this.setState({ toggled: true }); }
	
	buttonReleased()
	{ if (!("toggled" in this.props)) this.setState({ toggled: false }); }
	
	render()
	{
		let buttonClassName="pseudo-button icon-wrapper",toggled;
		if ("toggled" in this.props) toggled=this.props.toggled;
		else toggled=this.state.toggled;
		if (toggled) buttonClassName+=" toggled";
		else buttonClassName+=" untoggled";
		if ("className" in this.props)
			buttonClassName+=" " + this.props.className;
		
		return (
			<div className={buttonClassName} role="button" onClick={this.props.onClick}
				onMouseDown={this.buttonPressed} onMouseUp={this.buttonReleased}
				onMouseLeave={this.buttonReleased}>
				<img src={!toggled?this.props.icon:("toggledIcon" in this.props?
					this.props.toggledIcon:this.props.icon)} alt={this.props.alt}
					className="w-100 h-100" draggable={false}/>
			</div>
		);
	}
}
