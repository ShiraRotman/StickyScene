import React from "react";
import ReactDOM from "react-dom";

function StickyScene(props)
{
	return (
		<div className="w-100 h-100">
			<img src={props.scene} className="w-100 h-100" alt="Background Scene"/>
		</div>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<StickyScene scene={process.env.PUBLIC_URL + "/hardcoded/underwater-treasures.jpg"}/>
	</React.StrictMode>,
	document.getElementById("stickySceneRoot"));
