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

//TODO: Map to size and add suffix to file names
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
			for (let sceneID in sceneStickersMap)
				thumbs=thumbs.concat(sceneStickersMap[sceneID]);
		}
		return thumbs.map(imageID => 
		({ id: imageID, path: STICKERS_THUMBS_PATH + imageID + ".jpg" }));
	}
	
	getSceneImage(sceneID) { return SCENES_IMAGES_PATH + sceneID + ".jpg"; }
	getStickerImage(stickerID) { return STICKERS_IMAGES_PATH + stickerID + ".jpg"; }
}
