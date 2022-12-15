var darkCave, lightCave, torchHolder;
var torch;
var canvasX, canvasY;
var imageScalar;
var imageWidth, imageHeight;
var torchHitBox;
var torchIsHovered = false, torchIsHeld = false;
var caveOpeningX, caveOpeningY;

function preload() {
	
	canvasX = windowWidth*.99
	canvasY = windowHeight*.965
	
	imageScalar = Math.min(canvasX / 1920, canvasY / 1080)
	imageWidth = 1920 * imageScalar
	imageHeight = 1080 * imageScalar
	
	torch = new moveableImage()
	
	darkCave = loadImage("dark cave.png")
	lightCave = loadImage("light cave.png")
	torch.img = loadImage("free torch.png")
	torchHolder = loadImage("torch holder.png")
	
	torchHitBox = 790 * imageScalar / 4
	
	caveOpeningX = imageWidth * 0.7
	caveOpeningY = imageHeight * 0.55
	
}

function setup() {
	
	var myCanvas = createCanvas(canvasX, canvasY)
	myCanvas.parent("#canvas")
}

function draw() {
	background(0)
	
	if (mouseX > torch.x - torchHitBox / 4 &&
		mouseX < torch.x + torchHitBox / 4 &&
	    mouseY > torch.y &&
		mouseY < torch.y + torchHitBox) {
		torchIsHovered = true
	} else {
		torchIsHovered = false
	}
	
	push()
	tint(255, 255 - 255 * Math.min(dist(torch.x, torch.y, caveOpeningX, caveOpeningY) / dist(0, 0, caveOpeningX, caveOpeningY), 1))
	image(lightCave, 0, 0, imageWidth, imageHeight)
	pop()
	push()
	imageMode(CENTER)
	image(torch.img, torch.x, torch.y, 790 * imageScalar, 790 * imageScalar)
	image(torchHolder, imageWidth / 8, imageHeight / 2, 109 * imageScalar, 45 * imageScalar)
	pop()
}

function mousePressed() {
	// Lock in the torch being hovered if clicked while torchIsHovered
	if (torchIsHovered) {
		torchIsHeld = true
	}
	
}

function mouseDragged() {
	// If torch is held, update it's x and y as mouse moves
	if (torchIsHeld) {
		torch.x = mouseX
		torch.y = mouseY
	}
}

function mouseReleased() {
	// If torch is released in correct spot, proceed, otherwise ???
	if (torchIsHeld) {
		// Is the torch on the end?
		if (dist(torch.x, torch.y, caveOpeningX, caveOpeningY) < 100 * imageScalar) {
			window.open("https://www.google.com/","_self")
		}
		
	}
	
	torchIsHeld = false
}

class moveableImage {
	constructor(img, x = imageWidth / 7.75, y = imageHeight / 2.3) {
		this.img = img
		this.x = x
		this.y = y
	}
}