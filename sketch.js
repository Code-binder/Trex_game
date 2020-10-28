var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, icloud;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacleGroup,cloudsGroup;
var PLAY=1; //constants
var END=0;
var gameState=PLAY;
var gameOver,igameOver
var restart,irestart;
var jumpSound,dieSound,checkpSound;



var score=0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  icloud = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  igameOver = loadImage("gameOver.png");
  irestart = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpSound = loadSound("checkPoint.mp3");
  
}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  trex.debug=false;
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstacleGroup = new Group();
  cloudsGroup = createGroup();
  
   gameOver = createSprite(300,100);
        gameOver.addImage("gameOver.png",igameOver);
        gameOver.scale=0.6;
        gameOver.visible=false;
        
        restart = createSprite(300,130);
        restart.addImage("restart.png",irestart);
        restart.scale = 0.5;
        restart.visible=false;
}

function draw() {
  //set background color
  background(180);
  
  
  text("score:"+score,500,50);
  
  if(gameState===PLAY)
  {
        if(obstacleGroup.isTouching(trex))
        {
          gameState=END;
          dieSound.play();
        }
    ground.velocityX = -(4+3*(score/500));
    
        score=score+Math.round(getFrameRate()/30);
            // jump when the space key is pressed
        if(keyDown("space")&& trex.y >= 140) {
          trex.velocityY = -10;
          jumpSound.play();
        }
          trex.velocityY = trex.velocityY + 0.8

        if (ground.x < 0){
          ground.x = ground.width/2;
        }
        ground.velocityX=-3;
     
        if(score>0 && score%500===0){
          checkpSound.play();
        }
        //Spawn Clouds
        spawnClouds();
        spawnObstacle();
  }
  else if(gameState===END)
  {
        ground.velocityX=0;
        cloudsGroup.setVelocityXEach(0);
        cloudsGroup.setLifetimeEach(-1);
        obstacleGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
    
        trex.changeAnimation("collided",trex_collided);
        trex.velocityY=0;
    
        restart.visible=true;
        gameOver.visible=true;
    
        if(mousePressedOver(restart)){
          gameState = PLAY;
          obstacleGroup.destroyEach();
          cloudsGroup.destroyEach();
          trex.changeAnimation("running", trex_running);
          gameOver.visible=false;
          restart.visible=false;
          score=0;
        }
        
  }

  
  
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
 
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
   if(frameCount%60===0){
    cloud = createSprite(600,50,10,10);
    cloud.addImage("cloud.png",icloud);
    cloud.scale=0.6;
    cloud.y=Math.round(random(10,70));
   cloud.velocityX=-(3+score/500);
   cloud.lifetime=(200);
    console.log(cloud.depth);
     cloud.depth=trex.depth;
     trex.depth+=1;
     cloudsGroup.add(cloud);
     
   }

  
  
 // write your code here 
}
function spawnObstacle(){
  if(frameCount%70===0){
    obstacle = createSprite(600,163,12,40);
    obstacle.velocityX=-(4+score/500);
    obstacle.scale=0.5;
    var rando = Math.round(random(1,6));
    switch(rando){
        case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle4);
        break;
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
         }
    obstacle.lifetime = 150;
 obstacleGroup.add(obstacle);
  }
}



