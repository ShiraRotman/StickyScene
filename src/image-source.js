
const ABSTRACT_METHOD_ERROR_TEXT="Prototype methods can't be called from " + 
		"instances of the base class!";

export class ImageSource
{	
	getAvailScenesThumbs() { throw new TypeError(ABSTRACT_METHOD_ERROR_TEXT); }
	getFullImage(imageID) { throw new TypeError(ABSTRACT_METHOD_ERROR_TEXT); }
}

const pageWidth=getPageWidth(),pageHeight=getPageHeight();
ImageSource.pageWidth=pageWidth; ImageSource.pageHeight=pageHeight;
ImageSource.sceneThumbWidth=calcSceneThumbWidth(pageWidth);
ImageSource.sceneThumbHeight=ImageSource.sceneThumbWidth*(pageHeight/pageWidth);

function getPageWidth() { return window.innerWidth; }
function getPageHeight() { return window.innerHeight; }

function calcSceneThumbWidth(pageWidth)
{
	if (pageWidth<1200) return 128;
	else return 192;
}

const SCENES_IMAGES_PATH=process.env.PUBLIC_URL + "/hardcoded/scenes/";
const SCENES_THUMBS_PATH=SCENES_IMAGES_PATH + "thumbs/";

class HardcodedImageSource extends ImageSource
{
	getAvailScenesThumbs()
	{
		//TODO: Map to size
		return [
		{
			id: "underwater-treasures",
			path: SCENES_THUMBS_PATH + "underwater-treasures.jpg"
		},
		{
			id: "space-cosmonaut",
			path: SCENES_THUMBS_PATH + "space-cosmonaut.jpg"
		}];
	}
	
	//TODO: Map to size
	getFullImage(imageID) { return SCENES_IMAGES_PATH + imageID + ".jpg"; }
}

export function getImageSource() { return new HardcodedImageSource(); }
