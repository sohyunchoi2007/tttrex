var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver, gameOverImage, restart, restartImage;

var jump, die, checkpoint;

function preload(){
  //loading animation for running trex
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  //load animation for collided trex
  trex_collided = loadAnimation("trex_collided.png");
  //load image for the ground
  groundImage = loadImage("ground2.png");
  //load image for the cloud
  cloudImage = loadImage("cloud.png");
  //load image for the obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  //load image for game over and restart
  gameOverImage = loadImage("game-over.png");
  restartImage = loadImage("restart.png");
  //load sound for jummping trex, dying trex, and checkpoints
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("score.mp3");
}

function setup() {
  createCanvas(600, 200);
  //adding trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  //adding ground
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  //ading gameover Image
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  //adding restart Image
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale = 0.3;
  //making ivisible ground for trex
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //grouping obstacles and clouds
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  trex.setCollider("circle",0,0,40);
  trex.debug=true;
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,40);
  
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -6;
  spawnClouds();
    spawnObstacles();
    score = score + Math.round(getFrameRate()/60);
    if(score>0 && score % 100 == 0){
      checkpoint.play();
    }
    if(keyDown("space")&& trex.y >= 161) {
    trex.velocityY = -13;
    jump.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
      die.play();
    }
  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    if(mousePressedOver(restart)){
    reset()
  }
  }
  

  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    score = 0;
  }

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(4 +score/100);
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.4;
    obstacle.lifetime = 330;
   
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {

  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    
    cloud.lifetime = 330;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
  }
  
}