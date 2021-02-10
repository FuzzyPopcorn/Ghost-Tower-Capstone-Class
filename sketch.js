var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png", "ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  spookySound.play()
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addAnimation("ghost", ghostImg);
  
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  climbersGroup = new Group();
  
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(tower.y>600){
      tower.y=height/2
    }
    if(keyDown("SPACE")){
      ghost.velocityY=-10  
    }
    ghost.velocityY+=0.8
    if(keyDown("LEFT_ARROW")){
      ghost.x-=5
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x+=5
    }
    
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0;
    }
    if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
      gameState="end";
    }
  

    spawnDoors();

   
    drawSprites();
  }
  
  if (gameState === "end"){
    textSize(20)
    fill("yellow")
    text("Game Over!", 290,310)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
 if(frameCount%200===0){
   door = createSprite(Math.round(random(100,500)),-50,20,20);
   door.addImage(doorImg);
   door.velocityY = 3;
   door.lifetime = 200;
   doorsGroup.add(door)
   ghost.depth=door.depth+5
   
   climber = createSprite(door.x,10,20,20)
   climber.addImage(climberImg);
   climber.velocityY = 3;
   climber.lifetime = 200;
   climbersGroup.add(climber)
   
   invisibleBlock = createSprite(climber.x,25,climber.width,20)
   invisibleBlock.velocityY = 3;
   invisibleBlock.visible = false;
   invisibleBlockGroup.add(invisibleBlock)
 }
  
}

