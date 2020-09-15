import ImageSource from "./image-source.js";

const SCENES_IMAGES_PATH=process.env.PUBLIC_URL + "/hardcoded/scenes/";
const SCENES_THUMBS_PATH=SCENES_IMAGES_PATH + "thumbs/";

const STICKERS_IMAGES_PATH=process.env.PUBLIC_URL + "/hardcoded/stickers/";
const STICKERS_THUMBS_PATH=STICKERS_IMAGES_PATH;

const availScenes=["underwater-treasures","space-cosmonaut"];
const sceneStickersMap= //For scaling, add a subpath
{ 
	"underwater-treasures": ["blue-black-fish","dory-fish","submarine","seahorse"],
	"space-cosmonaut": ["rocket-spaceship","alien-flying-saucer"]
}

//Each array's entries have to be sorted by size to fasten mapping
const imageSizesMap=
{
	"blue-black-fish": [{ width: 128, height: 64, suffix: "" }],
	"dory-fish": [{ width: 128, height: 64, suffix: "" }],
	"submarine": [{ width: 128, height: 64, suffix: "" }],
	"seahorse": [{ width: 64, height: 128, suffix: "" }],
	"rocket-spaceship": [{ width: 96, height: 96, suffix: "" }],
	"alien-flying-saucer": [{ width: 128, height: 82, suffix: "" }]
}

export default class HardcodedImageSource extends ImageSource
{
	getScenesThumbs()
	{	
		return availScenes.map(imageID => 
		({ id: imageID, path: SCENES_THUMBS_PATH + imageID + ".jpg" }));
	}
	
	getStickersThumbs(sceneID,sceneOnly=true)
	{
		let thumbs=sceneStickersMap[sceneID]; if (!thumbs) thumbs=[];
		if (!sceneOnly)
		{
			for (let sceneImageID in sceneStickersMap)
			{
				if (sceneImageID!==sceneID)
					thumbs=thumbs.concat(sceneStickersMap[sceneImageID]);
			}
		}
		return thumbs.map(imageID => 
		({ id: imageID, path: STICKERS_THUMBS_PATH + imageID + ".jpg" }));
	}
	
	//TODO: Map to size
	static getImageData(imageID) { return imageSizesMap[imageID][0]; }
	static getImageFilename(imageID,suffix) { return imageID + suffix + ".jpg"; }
	
	getSceneImage(sceneID)
	{ 
		return SCENES_IMAGES_PATH + HardcodedImageSource.getImageFilename(
				sceneID,"");
	}
	
	getStickerImageData(stickerID)
	{
		const imageData=HardcodedImageSource.getImageData(stickerID);
		if (!imageData) return null;
		else return { 
			width: imageData.width, height: imageData.height,
			path: STICKERS_IMAGES_PATH + HardcodedImageSource.getImageFilename(
					stickerID,imageData.suffix)
		};
	}
}
