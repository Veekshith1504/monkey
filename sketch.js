var playState 
var endState
var gameState = "playState"
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground
var FoodGroup, obstacleGroup
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
 
  score = 0;
}



function setup() {
createCanvas(600, 200);  

monkey = createSprite(50, 160, 20, 50);   
monkey.addAnimation("monkeyRunning", monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(300, 200, 600, 10); 
ground.x = ground.width/2;


//monkey.setCollider("circle", 0, 0, 40); 
  
FoodGroup = createGroup();
obstacleGroup = createGroup();  
}


function draw() {
background(180);

if (gameState === "playState") {
if (keyDown("space"))  {
monkey.velocityY = -12;
}  
monkey.velocityY = monkey.velocityY + 0.8;     

   bananas(); 
obstacles();
  
 survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50); 
  
    
 if (monkey.isTouching(FoodGroup)) {    
FoodGroup.destroyEach();  
}   
if (obstacleGroup.isTouching(monkey)) {
  gameState = endState;  
  obstacleGroup.setVelocityXEach  (0); 
 FoodGroup.setVelocityXEach (0); 
 monkey.velocityY = 0;
}      
}
else if(gameState === "endState") {
text("GAME OVER!", 250, 100);  
text("press R to restart", 200, 150);  
   
if (keyDown("r") && gameState === endState) {
 gameState = play;
 survivalTime = 0;  
}  
} 

monkey.collide(ground); 
  
drawSprites();
 
}

function bananas() {
if (frameCount%200 ===0){
var banana = createSprite(600, 120, 40, 10); 
banana.y = Math.round(random(50, 70));
banana.addImage(bananaImage);
banana.scale = 0.1
banana.velocityX = -3;
banana.lifetime = -1;
FoodGroup.add(banana);  
}
}

function obstacles() {
if (frameCount%300 === 0) {  
obstacle = createSprite(600,170, 40, 10);
obstacle.addImage(obstacleImage);
obstacle.scale = 0.1;
obstacle.velocityX = -3;
obstacle.lifetime = -1;
obstacleGroup.add(obstacle);  
}
}
