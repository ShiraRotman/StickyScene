(this["webpackJsonpsticky-scene"]=this["webpackJsonpsticky-scene"]||[]).push([[0],{11:function(e,t,n){e.exports=n(16)},16:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),c=n(7),r=n.n(c),s=n(10),o=n(2),u=n(3),l=n(1),d=n(5),h=n(4),g=n(8),m=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).state={},"toggled"in e||(i.state.toggled=!1),i.buttonPressed=i.buttonPressed.bind(Object(l.a)(i)),i.buttonReleased=i.buttonReleased.bind(Object(l.a)(i)),i}return Object(u.a)(n,[{key:"buttonPressed",value:function(){"toggled"in this.props||this.setState({toggled:!0})}},{key:"buttonReleased",value:function(){"toggled"in this.props||this.setState({toggled:!1})}},{key:"render",value:function(){var e,t="pseudo-button icon-wrapper";return t+=(e="toggled"in this.props?this.props.toggled:this.state.toggled)?" toggled":" untoggled","className"in this.props&&(t+=" "+this.props.className),a.a.createElement("div",{className:t,role:"button",onClick:this.props.onClick,onMouseDown:this.buttonPressed,onMouseUp:this.buttonReleased,onMouseLeave:this.buttonReleased},a.a.createElement("img",{src:e&&"toggledIcon"in this.props?this.props.toggledIcon:this.props.icon,alt:this.props.alt,className:"w-100 h-100",draggable:!1}))}}]),n}(a.a.Component),p="Prototype methods can't be called from instances of the base class!",b=function(){function e(){Object(o.a)(this,e)}return Object(u.a)(e,[{key:"getScenesThumbs",value:function(){throw new TypeError(p)}},{key:"getSceneImage",value:function(e){throw new TypeError(p)}},{key:"getStickerImage",value:function(e){throw new TypeError(p)}},{key:"getStickersThumbs",value:function(e){throw new TypeError(p)}}]),e}(),f=window.innerWidth,v=window.innerHeight;b.pageWidth=f,b.pageHeight=v,b.sceneThumbWidth=function(e){return e<1200?128:192}(f),b.sceneThumbHeight=b.sceneThumbWidth*(v/f),b.stickerThumbWidth=b.sceneThumbWidth/2,b.stickerThumbHeight=b.stickerThumbWidth,b.stickerWidth=b.stickerThumbWidth,b.stickerHeight=b.stickerThumbHeight;var k=["underwater-treasures","space-cosmonaut"],E={"underwater-treasures":["blue-black-fish","dory-fish","submarine","seahorse"],"space-cosmonaut":["rocket-spaceship","alien-flying-saucer"]},T=new(function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"getScenesThumbs",value:function(){return k.map((function(e){return{id:e,path:"/StickyScene/hardcoded/scenes/thumbs/"+e+".jpg"}}))}},{key:"getStickersThumbs",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=E[e];if(n||(n=[]),!t)for(var i in E)i!==e&&(n=n.concat(E[i]));return n.map((function(e){return{id:e,path:"/StickyScene/hardcoded/stickers/"+e+".jpg"}}))}},{key:"getSceneImage",value:function(e){return"/StickyScene/hardcoded/scenes/"+e+".jpg"}},{key:"getStickerImage",value:function(e){return"/StickyScene/hardcoded/stickers/"+e+".jpg"}}]),n}(b)),y=[{type:"mousedown",listener:j},{type:"mousemove",listener:D},{type:"mouseup",listener:M},{type:"mouseleave",listener:D}],S=[{type:"touchstart",listener:function(e){e.preventDefault();var t=e.target,n=e.targetTouches[0];t.setAttribute("data-touch",n.identifier),C(t,"dragdropstart",n)}},{type:"touchmove",listener:function(e){_(e,"dragdropmove")}},{type:"touchend",listener:function(e){_(e,"dragdropend",!0)}},{type:"touchcancel",listener:I}];function w(e){if(!e)throw new ReferenceError("A DOM element must be supplied!");if(!(e instanceof Element))throw new TypeError("The parameter supplied must be a DOM element!")}function O(e,t){y.forEach((function(e){return t(e.type,e.listener)})),window.TouchEvent&&S.forEach((function(e){return t(e.type,e.listener)}))}function C(e,t,n){var i;n&&(i={detail:{pageX:n.pageX,pageY:n.pageY}}),e.dispatchEvent(new CustomEvent(t,i))}function j(e){0===e.button&&C(e.target,"dragdropstart",e)}function D(e){0!==(1&e.buttons)&&C(e.target,"dragdropmove",e)}function M(e){0===e.button&&C(e.target,"dragdropend",e)}function _(e,t,n){e.preventDefault();var i=e.target,a=i.getAttribute("data-touch");if(a){for(var c=!1,r=0;!c&&r<e.changedTouches.length;)e.changedTouches[r].identifier===a?c=!0:r++;c?(e.stopPropagation(),n&&i.removeAttribute("data-touch"),C(i,t,e.changedTouches[r])):I(e)}}function I(e){var t=e.target;t.removeAttribute("data-touch"),C(t,"dragdropcancel")}var N={registerDragEvents:function(e){w(e),e.draggable=!1,O(0,e.addEventListener.bind(e))},unregisterDragEvents:function(e){w(e),O(0,e.removeEventListener.bind(e))},sendCustomDragEvent:C,TOUCH_ID_ATTR:"data-touch",DRAG_START_EVENT_TYPE:"dragdropstart",DRAG_MOVE_EVENT_TYPE:"dragdropmove",DRAG_END_EVENT_TYPE:"dragdropend",DRAG_CANCEL_EVENT_TYPE:"dragdropcancel"},A=["newscene","loadscene","savescene"],R=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).state={shown:!1,sceneSelection:!1},i.toggleMenus=i.toggleMenus.bind(Object(l.a)(i)),i.handleMenuOptionClick=i.handleMenuOptionClick.bind(Object(l.a)(i)),i.handleNewSceneSelect=i.handleNewSceneSelect.bind(Object(l.a)(i)),i.handleStickerSelect=i.handleStickerSelect.bind(Object(l.a)(i)),i}return Object(u.a)(n,[{key:"toggleMenus",value:function(){var e=this;this.setState((function(t){return{shown:!e.state.shown,sceneSelection:!1}}))}},{key:"handleMenuOptionClick",value:function(e){switch(e.currentTarget.id){case"newscene":this.setState({sceneSelection:!0});break;case"menuback":this.setState({sceneSelection:!1});break;default:this.props.onMenuItemClick(new CustomEvent(e.currentTarget.id)),this.setState({shown:!1})}}},{key:"handleNewSceneSelect",value:function(e){this.sendThumbClickEvent("newscene",e.currentTarget.id),this.setState({shown:!1,sceneSelection:!1})}},{key:"handleStickerSelect",value:function(e){this.sendThumbClickEvent("addsticker",e.currentTarget.id)}},{key:"sendThumbClickEvent",value:function(e,t){var n=new CustomEvent(e,{detail:{imageID:t}});this.props.onMenuItemClick(n)}},{key:"render",value:function(){var e=this,t=this.state.sceneSelection?["menuback"]:A,n=t.map((function(t){return a.a.createElement("div",{className:"menu-item icon-wrapper my-1",id:t,key:t,onClick:e.handleMenuOptionClick},a.a.createElement("img",{src:"/StickyScene/icons/"+t+".svg",alt:"Menu Option",className:"w-100 h-100"}))}));return this.state.sceneSelection&&(t=T.getScenesThumbs(),n=n.concat(t.map((function(t){return a.a.createElement("div",{className:"menu-item scene-item",id:t.id,key:t.id,onClick:e.handleNewSceneSelect,style:{width:b.sceneThumbWidth,height:b.sceneThumbHeight}},a.a.createElement("img",{src:t.path,alt:"Scene Thumb",className:"w-100 h-100"}))})))),a.a.createElement(g.a,{interactive:!0,arrow:!1,offset:[0,0],visible:this.state.shown,placement:"bottom-start",className:"floating-menu vertical-floating-menu",theme:"light",content:n},a.a.createElement(g.a,{interactive:!0,arrow:!1,offset:[0,0],visible:this.state.shown,placement:"left-start",theme:"light",maxWidth:"none",className:"floating-menu",content:T.getStickersThumbs(this.props.sceneID).map((function(t){return a.a.createElement("img",{src:t.path,alt:"Sticker Thumb",onClick:e.handleStickerSelect,className:"menu-item sticker-item",key:t.id,id:t.id,style:{width:b.stickerThumbWidth,height:b.stickerThumbHeight}})}))},a.a.createElement("span",{className:"menu-toggle"},a.a.createElement(m,{icon:"/StickyScene/icons/menus.svg",alt:"Menus",toggled:this.state.shown,onClick:this.toggleMenus}))))}}]),n}(a.a.Component),P=n(6),Y=n.n(P),W=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).state={isFullScrMode:!1},i.fullscrModeChanged=i.fullscrModeChanged.bind(Object(l.a)(i)),i.buttonClicked=i.buttonClicked.bind(Object(l.a)(i)),i}return Object(u.a)(n,[{key:"componentDidMount",value:function(){Y.a.fullscreenEnabled&&Y.a.addEventListener("fullscreenchange",this.fullscrModeChanged)}},{key:"componentWillUnmount",value:function(){Y.a.fullscreenEnabled&&Y.a.removeEventListener("fullscreenchange",this.fullscrModeChanged)}},{key:"fullscrModeChanged",value:function(){this.setState({isFullScrMode:null!==Y.a.fullscreenElement})}},{key:"buttonClicked",value:function(){null===Y.a.fullscreenElement?Y.a.requestFullscreen(document.documentElement):Y.a.exitFullscreen()}},{key:"render",value:function(){return a.a.createElement(m,{alt:"Fullscreen Mode",onClick:this.buttonClicked,className:"full-screen-button"+(Y.a.fullscreenEnabled?"":" d-none"),icon:"/StickyScene/icons/"+(this.state.isFullScrMode?"exitfullscr":"fullscreen")+".svg"})}}]),n}(a.a.Component),H=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).element=a.a.createRef(),i.state={coordX:(window.innerWidth-b.stickerWidth)/2,coordY:(window.innerHeight-b.stickerHeight)/2},i.dragEvents=[{type:N.DRAG_START_EVENT_TYPE,listener:i.controllerPressed.bind(Object(l.a)(i))},{type:N.DRAG_MOVE_EVENT_TYPE,listener:i.controllerMoved.bind(Object(l.a)(i))},{type:N.DRAG_END_EVENT_TYPE,listener:i.controllerReleased.bind(Object(l.a)(i))},{type:N.DRAG_CANCEL_EVENT_TYPE,listener:i.controllerLeft.bind(Object(l.a)(i))}],i}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this.element.current;this.dragEvents.forEach((function(t){return e.addEventListener(t.type,t.listener)})),this.touchID&&(e.setAttribute(N.TOUCH_ID_ATTR,this.touchID),delete this.touchID),N.registerDragEvents(e)}},{key:"componentWillUnmount",value:function(){var e=this.element.current;N.unregisterDragEvents(e),this.dragEvents.forEach((function(t){return e.removeEventListener(t.type,t.listener)})),e.hasAttribute(N.TOUCH_ID_ATTR)&&(this.touchID=e.getAttribute(N.TOUCH_ID_ATTR))}},{key:"controllerPressed",value:function(e){if(!this.dragging){var t=this.element.current.getBoundingClientRect();this.dragging={originX:e.detail.pageX-t.left,originY:e.detail.pageY-t.top}}}},{key:"controllerMoved",value:function(e){this.dragging&&this.updatePosition(e)}},{key:"controllerLeft",value:function(){this.dragging&&delete this.dragging}},{key:"controllerReleased",value:function(e){if(this.dragging){this.updatePosition(e),delete this.dragging;var t=this.element.current;this.setState({coordX:t.style.left,coordY:t.style.top})}}},{key:"updatePosition",value:function(e){var t=this.element.current;t.style.left=e.detail.pageX-this.dragging.originX+"px",t.style.top=e.detail.pageY-this.dragging.originY+"px"}},{key:"render",value:function(){return a.a.createElement("img",{src:T.getStickerImage(this.props.stickerID),alt:"Sticker",draggable:!1,ref:this.element,style:{width:b.stickerWidth,height:b.stickerHeight,position:"absolute",left:this.state.coordX,top:this.state.coordY}})}}]),n}(a.a.Component),V=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).state={sceneID:"underwater-treasures",stickers:[]},i.sceneTouchMoved=i.sceneTouchMoved.bind(Object(l.a)(i)),i.sceneTouchEnded=i.sceneTouchEnded.bind(Object(l.a)(i)),i.menuItemClicked=i.menuItemClicked.bind(Object(l.a)(i)),i}return Object(u.a)(n,[{key:"handleTouchEvent",value:function(e,t){var n,i=Object(s.a)(e.changedTouches);try{for(i.s();!(n=i.n()).done;){var a=n.value,c=a.target;c.hasAttribute(N.TOUCH_ID_ATTR)&&N.sendCustomDragEvent(c,t,a)}}catch(r){i.e(r)}finally{i.f()}}},{key:"sceneTouchMoved",value:function(e){this.handleTouchEvent(e,N.DRAG_MOVE_EVENT_TYPE)}},{key:"sceneTouchEnded",value:function(e){this.handleTouchEvent(e,N.DRAG_END_EVENT_TYPE)}},{key:"menuItemClicked",value:function(e){switch(e.type){case"newscene":this.setState({sceneID:e.detail.imageID,stickers:[]});break;case"addsticker":this.state.stickers.push(e.detail.imageID),this.setState((function(e){return{stickers:e.stickers}}))}}},{key:"render",value:function(){return a.a.createElement("div",{className:"w-100 h-100"},a.a.createElement("img",{src:T.getSceneImage(this.state.sceneID),alt:"Background Scene",className:"w-100 h-100",onTouchMove:this.sceneTouchMoved,onTouchEnd:this.sceneTouchEnded}),this.state.stickers.map((function(e,t){return a.a.createElement(H,{stickerID:e,key:"sticker-"+t})})),a.a.createElement(R,{sceneID:this.state.sceneID,onMenuItemClick:this.menuItemClicked}),a.a.createElement(W,null))}}]),n}(a.a.Component);r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(V,null)),document.getElementById("stickySceneRoot"))}},[[11,1,2]]]);
//# sourceMappingURL=main.7b07d5ad.chunk.js.map