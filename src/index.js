import React from "react";
import ReactDOM from "react-dom";
import Tippy from "@tippyjs/react";

const OPTIONS_MENU_ICONS=["newscene","loadscene","savescene"];

class FloatingMenus extends React.Component
{
	constructor(props)
	{ 
		super(props); this.state={ shown: false };
		this.toggleMenus=this.toggleMenus.bind(this);
		this.closeMenus=this.closeMenus.bind(this);
	}
	
	toggleMenus() 
	{ this.setState(state => ({ shown: !this.state.shown })); }
	closeMenus() { this.setState({ shown: false }); }
	
	render()
	{
		let toggleClassName="menu-toggle icon-wrapper";
		if (this.state.shown) toggleClassName+=" toggled";
		else toggleClassName+=" untoggled";
		
		return (
			<Tippy interactive={true} arrow={false} offset={[0,0]} visible={this.state.shown}
				placement="bottom-start" theme="light" className="floating-menu"
				onClickOutside={this.closeMenus} content={OPTIONS_MENU_ICONS.map(icon => 
				<div className="menu-option icon-wrapper my-1" key={icon.substring(0,icon.indexOf("scene"))}>
					<img src={process.env.PUBLIC_URL + "icons/" + icon + ".svg"} alt="Menu Option"
						className="w-100 h-100"/>
				</div>)}>
				<div className={toggleClassName} onClick={this.toggleMenus}>
					<img src={process.env.PUBLIC_URL + "icons/menus.svg"} className="w-100 h-100"
						alt="Menu Button"/>
				</div>
			</Tippy>
		);
	}
}

function StickyScene(props)
{
	return (
		<div className="w-100 h-100">
			<img src={props.scene} className="w-100 h-100" alt="Background Scene"/>
			<FloatingMenus/>
		</div>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<StickyScene scene={process.env.PUBLIC_URL + "/hardcoded/underwater-treasures.jpg"}/>
	</React.StrictMode>,
	document.getElementById("stickySceneRoot"));
