import React from "react";
import ReactDOM from "react-dom";
import Tippy from "@tippyjs/react";

class FloatingMenus extends React.Component
{
	constructor(props)
	{ 
		super(props); this.state={ shown: false };
		this.toggleMenus=this.toggleMenus.bind(this);
	}
	
	toggleMenus() 
	{ this.setState(state => ({ shown: !this.state.shown })); }
	
	render()
	{
		return (
			<Tippy interactive={true} arrow={false} offset={[0,0]} visible={this.state.shown}
				placement="bottom-start" content={<span>Menu Item</span>}>
				<button type="button" className="menu-toggle" onClick={this.toggleMenus}>
					<img src={process.env.PUBLIC_URL + "/hamburger.svg"} className="w-100 h-100"
						alt="3 horizontal lines"/>
				</button>
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
