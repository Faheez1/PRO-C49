var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,asteroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
var bg,bgImg;

function preload() {
  bgImg=loadImage("spacebg2.jpg");
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("spaceship 2.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() { 
  canvas = createCanvas(windowWidth,windowHeight);

  bg = createSprite(windowWidth,windowHeight)
  bg.addImage(bgImg)
   
//sprite for space background
  space = createSprite(windowWidth/2,windowHeight/2);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

//sprite for spaceship
  spaceShip = createSprite(width/2,height/2);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.1;

  //sprite for endline
  endline = createSprite(250,700,2500,5);
  endline.visible = true;
  
  //groups
  asteroidGroup = new Group;
  laserGroup = new Group;
  
 
}

function draw() {
  background(0);

  if(gameState === play) {
 
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;
 // camera position
   camera.position.x = spaceShip.x
   
   //key functions
    if(keyDown("space") && shoot < 460) {
      laserCreate()
      }  

    if(keyDown("right") ) {
      spaceShip.x = spaceShip.x + 20;
       }

    if(keyDown("left")) {
      spaceShip.x = spaceShip.x - 20;
     }

    if(spaceShip.x<=0){
      spaceShip.x=40
    }
    if(spaceShip.x>=1000){
      space.x=800
    }

    //game end if asteroid touches spaceship
    if(asteroidGroup.isTouching(spaceShip) || asteroidGroup.isTouching(spaceShip)) {
      gameEnd()
      
    }
    
    if(asteroidGroup.isTouching(laserGroup)) {
      laserDestroy()
      
    }

    asteroids();
    drawSprites();
    
    //score display
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    //game end if asteroy touches endline
    if(asteroidGroup.isTouching(endline)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
    text("The asteroids destroyed the planet",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);

    
  }


  if(gameState === instruction) {
    intro();
  }
}
  

function asteroids() {
  if(frameCount % 110 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1350)),-2);
    asteroid.velocityY = (13 + score/10);
   
    asteroid.scale = random(0.4,0.5);
    //asteroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              asteroid.setCollider("circle",-80,10,160);
            
              break;
      case 2: asteroid.addImage(asteroid2);
              asteroid.setCollider("circle",50,0,150);

              break;
      case 3: asteroid.addImage(asteroid3);
              asteroid.setCollider("circle",0,0,170)
             
      default: break;
    }
    
    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
    asteroid.lifetime = 1000;
    
  }
}
function gameEnd(){

  asteroidGroup.destroyEach();
  var blast = createSprite(spaceShip.x,spaceShip.y - 50);
  blast.addImage(blastImage);
  blast.frameDelay=500
 // blast.lifetime = 25;
  explosionSound.play();
 // spaceShip.destroy();
  gameState = end;

  
}
function laserDestroy(){
  asteroidGroup.destroyEach();
  laserGroup.destroyEach();
  explosionSound.play();
  score = score+1
}

function intro(){
  fill("Red")
  textSize(38)
  text("Welcome to the game Asteroid Shooter",canvas.width/2-300,canvas.height/2-300)
  text("Your task is to shoot all the asteroids before it kills us all", canvas.width/2-500,canvas.height/2-250)
  fill("Yellow")
  textSize(38)
  text("you will have your Trusted Spaceship by your side to make it easier",canvas.width/2-300, canvas.height/2-200)
  text("The Space Button is to shoot the lasers",canvas.width/2-300,canvas.height/2-150)
  fill("Blue")
  textSize(38)
  text("You can move using the right and left button",canvas.width/2-300,canvas.height/2-100)
  text("And Now you can begin your journey",canvas.width/2-300,canvas.height/2-70)
  text("Press the 'B' Button to start the game",canvas.width/2-300,canvas.height/2-40)
if(keyDown("B")){
  gameState=play
  bg.visible=false
}
if(keyDown("R")){
  restart()
}

}

function restart(){
  gameState===play
  score===0
}

function laserCreate(){
  laser=createSprite(spaceShip.x,spaceShip.y-130)
  laser.addImage(laserImage)
  laser.velocityY=-20
  laserGroup.add(laser)
  laserSound.play()
  shoot=laser.y
  laser.scale=0.7
}
