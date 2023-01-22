var caveImg;
var cave;
var SM;
var p1, p2,p3,p4,p5;
var p1Img, p2Img, p3Img, p4Img, p5Img;
var SMImg;
var gameoverImg;
var obstaclesGroup1
var obstaclesGroup2
var obstaclesGroup3
var obstaclesGroup4
var obstaclesGroup5 
var gameover;
var lazer;
var lazerImg;
var pup1;
var pup1Img;
var pwGroup;
var lazerGroup;

var score=0
var ammo=0

var PLAY=1
var END = 0
var gameState = PLAY;



function preload() {
caveImg = loadImage("cave1.jpg")
p1Img = loadImage("pillar1.png")
p2Img = loadImage("pillar2.png")
p3Img = loadImage("pillar3.png")
p4Img = loadImage("pillar4.png")
p5Img = loadImage("pillar5.png")
SMImg = loadImage("superman.png")
gameoverImg=loadImage("gameover.png")
lazerImg=loadImage("laser.png")
pup1Img=loadImage("pup1.png")
}



function setup() {
  createCanvas(1000,630);


  cave=createSprite(width/2-20, height/2,1800,130)
  cave.addImage(caveImg)
  cave.scale=1.65
  cave.velocityX=-3

  gameover= createSprite(500, 300)
  gameover.addImage(gameoverImg)
  gameover.visible=false;
  gameover.depth+=50

  SM = createSprite(150, 315, 50,50);
  SM.addImage("SMpic", SMImg);
  SM.debug=false
  SM.setCollider("rectangle", 0, 30, 500,120)
  SM.scale = 0.35;
  SM.velocityY = 2

obstaclesGroup1= createGroup();
obstaclesGroup2= createGroup();
obstaclesGroup3= createGroup();
obstaclesGroup4= createGroup();
obstaclesGroup5 = createGroup();
pwGroup= createGroup();
lazerGroup=createGroup();
}

function draw() 
{
  
  background(0);

score=score+1

if(gameState === PLAY) {
  if(keyDown("space")) {
    SM.velocityY = -7
  }
  
if(cave.x<300) {
  cave.x=cave.width/2
}

if(gameState===PLAY && ammo>0) {
  if(keyDown("RIGHT_ARROW")) {
    createLazer()
    ammo=ammo-1
  }

}

  SM.velocityY=SM.velocityY+1
  obstacles()
obstacles2()
obstacles3()
obstacles4()
obstacles5()
   
if(SM.y>630 || SM.y<0) {
  gameState = END
}

if(obstaclesGroup1.isTouching(SM) || 
   obstaclesGroup2.isTouching(SM) ||
   obstaclesGroup3.isTouching(SM) ||
   obstaclesGroup4.isTouching(SM) ||
   obstaclesGroup5.isTouching(SM) 
) {
  gameState = END
}

} else if (gameState === END) {
  obstaclesGroup1.setVelocityXEach(0)
  obstaclesGroup2.setVelocityXEach(0)
  obstaclesGroup3.setVelocityXEach(0)
  obstaclesGroup4.setVelocityXEach(0)
  obstaclesGroup5.setVelocityXEach(0)
  pwGroup.destroyEach()
  cave.velocityX=0
  score=0
  SM.velocityY=0
  SM.destroy()
  gameover.visible=true
}

pup()

if(lazerGroup.isTouching(obstaclesGroup1)) {
  obstaclesGroup1.destroyEach()
  lazerGroup.destroyEach()
}
if(lazerGroup.isTouching(obstaclesGroup2)) {
  obstaclesGroup2.destroyEach()
  lazerGroup.destroyEach()
}
if(lazerGroup.isTouching(obstaclesGroup3)) {
  obstaclesGroup3.destroyEach()
  lazerGroup.destroyEach()
}
if(lazerGroup.isTouching(obstaclesGroup4)) {
  obstaclesGroup4.destroyEach()
  lazerGroup.destroyEach()
}
if(lazerGroup.isTouching(obstaclesGroup5)) {
  obstaclesGroup5.destroyEach()
  lazerGroup.destroyEach()
}


if(pwGroup.isTouching(SM)) {
  pwGroup.destroyEach()
  ammo=ammo+1
}

  drawSprites()


  stroke("white")
fill("white")
textSize(25)
text("Score: "+score,850, 30) 

stroke("white")
fill("white")
textSize(25)
text("Ammo: "+ammo,850, 60) 
}

function obstacles() {
  if(frameCount%85==0) {
    p1 = createSprite(1300, 543, 20,20)
    p1.addImage("pillar", p1Img);
    p1.debug=false
    p1.setCollider("rectangle", 0, 0,550,480)
    p1.scale = 0.3;
    p1.velocityX= -10;
    obstaclesGroup1.add(p1)
  }
}

function obstacles2() {
  if(frameCount%70==0) {
    p2 = createSprite(1300, 50, 20,20)
    p2.addImage("pillar2", p2Img);
    p2.debug=false
    p2.setCollider("rectangle", 0, 0,550,1270)
    p2.scale = 0.12;
    p2.velocityX= -10;
    obstaclesGroup2.add(p2)
}
}

function obstacles3() {
  if(frameCount%140==0) {
    p3 = createSprite(1300, 490, 20,20)
    p3.addImage("pillar3", p3Img);
    p3.debug=false
    p3.setCollider("rectangle", -10, 0,280,450)
    p3.scale = 0.6;
    p3.velocityX= -10;
    obstaclesGroup3.add(p3)
}
}

function obstacles4() {
  if(frameCount%230==0) {
    p4 = createSprite(1300, 500, 20,20)
    p4.addImage("pillar4", p4Img);
    p4.debug=false
    p4.setCollider("rectangle", 0, 0,400,750)
    p4.scale = 0.3;
    p4.velocityX= -10;
    obstaclesGroup4.add(p4)
}
}

function obstacles5() {
  if(frameCount%110==0) {
    p5 = createSprite(1300, 70, 20,20)
    p5.addImage("pillar5", p5Img);
    p5.debug=false
    p5.setCollider("rectangle", -70, 0,380,700)
    p5.scale = 0.3;
    p5.velocityX= -10;
    obstaclesGroup5.add(p5)
}
}

function pup() {
  if(frameCount%300===0) {
    pup1=createSprite(1000,300,20,20)
    pup1.addImage(pup1Img)
    pup1.velocityX=-5
    pup1.scale=0.15
    pwGroup.add(pup1)
}}

function createLazer(){
lazer=createSprite()
lazer.x=SM.x+250
lazer.y=SM.y
lazer.velocityX=5
lazer.addImage(lazerImg)
lazer.scale=0.25
lazerGroup.add(lazer)
lazer.debug=false
lazer.setCollider("rectangle", 0,7, 800,50)
}