import HardcodedImageSource from "./hardcoded-source.js";
const imageSource=new HardcodedImageSource();

function multiplyMatrices(leftMatrix,rightMatrix)
{
	if ((leftMatrix===undefined)||(rightMatrix===undefined))
		throw new ReferenceError("The matrices must be supplied!");
	else if ((!Array.isArray(leftMatrix))||(!Array.isArray(rightMatrix)))
		throw new TypeError("The parameters supplied must be matrices!");
	else if ((leftMatrix.length===0)||(rightMatrix.length===0))
		throw new RangeError("The matrices must contain elements!");
	/*If any of the other rows contains a different number of elements, an error
	  will be thrown during the operation*/
	else if (leftMatrix[0].length!==rightMatrix.length)
		throw new RangeError("The matrices' dimensions must be compatible!");
	
	const resultMatrix=new Array(leftMatrix.length);
	for (let index=0;index<resultMatrix.length;index++)
		resultMatrix[index]=new Array(rightMatrix[0].length);
	
	//This is an O(n^3) algorithm, but it's only used for small matrices
	for (let rowIndex=0;rowIndex<leftMatrix.length;rowIndex++)
		for (let colIndex=0;colIndex<rightMatrix[0].length;colIndex++)
		{
			let resultElement=0;
			for (let index=0; index<rightMatrix.length;index++)
				resultElement+=leftMatrix[rowIndex][index]*rightMatrix[index][colIndex];
			resultMatrix[rowIndex][colIndex]=resultElement;
		}
	return resultMatrix;
}

function createIdentityMatrix(rank)
{
	if (rank===undefined)
		throw new ReferenceError("The matrix's rank must be supplied!");
	else if (typeof(rank)!=="number")
		throw new TypeError("The matrix's rank must be a number!");
	else if (!Number.isInteger(rank))
		throw new RangeError("The matrix's rank must be an integer!");
	else if (rank<0)
		throw new RangeError("The matrix's rank must be greater than or equal to 0!");
	else if (rank===0) return [];
	else if (rank===1) return [1];
	else
	{
		const identityMatrix=new Array(rank);
		for (let index=0;index<identityMatrix.length;index++)
		{ identityMatrix[index]=new Array(rank); identityMatrix[index].fill(0); }
		for (let index=0;index<rank;index++) identityMatrix[index][index]=1;
		return identityMatrix;
	}
}

function create2DScaleMatrix(scaleX,scaleY)
{
	if (scaleX===undefined)
		throw new ReferenceError("At least 1 scale measure must be supplied!");
	else if (scaleY===undefined) scaleY=scaleX;
	if ((typeof(scaleX)!=="number")||(typeof(scaleY)!=="number"))
		throw new TypeError("The scale measures must be numbers!");
	else return [[scaleX,0],[0,scaleY]];
}

function create2DRotationMatrix(angle,inRadians=false)
{
	if (angle===undefined)
		throw new ReferenceError("The rotation angle must be supplied!");
	else if (typeof(angle)!=="number")
		throw new TypeError("The rotation angle must be a number!");
	else
	{
		if (!inRadians) angle=angle/360*2*Math.PI;
		const sine=Math.sin(angle),cosine=Math.cos(angle);
		return [[cosine,-sine],[sine,cosine]];
	}
}

const screenOrientation=
{
	orientation: (window.screen.orientation || window.screen.mozOrientation ||
			window.screen.msOrientation),
	lockOrientation: (window.screen.lockOrientation || window.screen.mozLockOrientation || 
			window.screen.msLockOrientation)
};

const MatrixOperations=
{ createIdentityMatrix, create2DScaleMatrix, create2DRotationMatrix, multiplyMatrices };
export { imageSource, screenOrientation, MatrixOperations };
