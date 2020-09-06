
const ABSTRACT_METHOD_ERROR_TEXT="Prototype methods can't be called from " + 
		"instances of the base class!";

export default class ImageSource
{	
	getScenesThumbs() { throw new TypeError(ABSTRACT_METHOD_ERROR_TEXT); }
	getSceneImage(sceneID) { throw new TypeError(ABSTRACT_METHOD_ERROR_TEXT); }
	getStickerImage(stickerID) { throw new TypeError(ABSTRACT_METHOD_ERROR_TEXT); }
	
	getStickersThumbs(sceneID,sceneOnly=true)
	{ throw new TypeError(ABSTRACT_METHOD_ERROR_TEXT); }
}

const pageWidth=getPageWidth(),pageHeight=getPageHeight();
ImageSource.pageWidth=pageWidth; ImageSource.pageHeight=pageHeight;

ImageSource.sceneThumbWidth=calcSceneThumbWidth(pageWidth);
ImageSource.sceneThumbHeight=ImageSource.sceneThumbWidth*(pageHeight/pageWidth);

ImageSource.stickerThumbWidth=ImageSource.sceneThumbWidth/2;
ImageSource.stickerThumbHeight=ImageSource.stickerThumbWidth;

//Not supposed to be constant - remove when implementing size mapping!
ImageSource.stickerWidth=ImageSource.stickerThumbWidth;
ImageSource.stickerHeight=ImageSource.stickerThumbHeight;

function getPageWidth() { return window.innerWidth; }
function getPageHeight() { return window.innerHeight; }

function calcSceneThumbWidth(pageWidth)
{
	if (pageWidth<1200) return 128;
	else return 192;
}
