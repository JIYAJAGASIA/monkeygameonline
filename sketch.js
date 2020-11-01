
var monkey ,monkey1, monkey_running;
var banana ,bananaImage, ObstacleImage;
var FoodGroup, ObstaclesGroup,Food,Obstacles;
var ground;
var score=0;

var background1,backgroundImage;


function preload(){
  
  backgroundImage=loadImage("jungle-1.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  ObstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(800, 800);
  
 
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  background1=createSprite(0,0,800,800);
  background1.addImage(backgroundImage);
    background1.x=background1.width/2;
  background1.velocityX=-4;
 
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
 
  FoodGroup=new Group();
  ObstaclesGroup= new Group();
   score=0;
}

function draw() {
background(255);
 
   
 
   if (ground.x < 0){
       ground.x = ground.width/2;
    }
  
  //scrolling effect for the background
    if (background1.x < 200){
       background1.x = background1.width/2;
    }
  
 
 
  if(FoodGroup.isTouching(monkey))
  {
     FoodGroup.destroyEach();
     monkey.scale=0.3;
     score=score+2;
     
    switch(score){ 
    case 10:monkey.scale=0.12;
      break;
      case 20:monkey.scale=0.14;
      break;
      case 30:monkey.scale=0.16;
      break;
      case 40:monkey.scale=0.18;
      break;
      default:break;
   
     
     }
 }
    if(keyDown("space")) {
      monkey.velocityY = -12;
    }
  
  
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
   spawnFood();
  spawnObstacles();
   ground.visible=false;
   
if(monkey.isTouching(ObstaclesGroup)){
   monkey.scale=0.08;  
}
   
   
    
  
   
   drawSprites();
  
    stroke("white");
    textSize(20);
    fill("white");
    text("Score "+ score, 500,50);
 
   

  
}
function spawnFood() {
    //write code here to spawn the clouds
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.addImage(bananaImage)
     
      
    banana.y = Math.round(random(120,200))
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 900;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
    }
}

function spawnObstacles(){
   if (frameCount % 200 === 0){
   var Obstacle = createSprite(800,320,10,40);
   Obstacle.velocityX = -(3+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
    
   
    //assign scale and lifetime to the obstacle           
    Obstacle.scale = 0.15;
    Obstacle.lifetime = 800;
   
   //add each obstacle to the group
    Obstacle.addImage(ObstacleImage);
  
    ObstaclesGroup.add(Obstacle);
}

}