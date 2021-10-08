//crear variables cat
var cat, cat_running;
var cat_collided;
var restart, gameOver, restart_Image, gameOver_Image;


var ground, groundImage;

var invisibleGround;

var salto;

var cloud, cloudImage;

var obstacles, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var rand;

var score;

var obstaclesGroup, cloudsGroup;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload() {
  cat_running = loadAnimation("source.gif");
  cat_collided = loadAnimation("cat_collided.gif");
  gameOver_Image = loadAnimation("gameOver.gif");
  restart_Image = loadImage("restart.png");

  //subir imagen del suelo
  groundImage = loadAnimation("ground.gif");

  cloudImage = loadAnimation("cloud.gif");

  obstacle1 = loadAnimation("obstacle1.png");

  obstacle2 = loadAnimation("obstacle2.gif");

  obstacle3 = loadAnimation("obstacle3.gif");

  obstacle4 = loadAnimation("obstacle4.gif");

  obstacle5 = loadAnimation("obstacle5.gif");

  obstacle6 = loadAnimation("obstacle6.gif");



}

function setup() {

  createCanvas(600, 200);

   //crear  suelo
   ground = createSprite(300, 180, 600, 20);
   ground.addAnimation("ground", groundImage);
   ground.x = ground.width / 2;
   ground.scale=3;

  cat = createSprite(50, 160, 20, 50);
  cat.addAnimation("running", cat_running);
  cat.addAnimation("collided", cat_collided);
  cat.scale = 0.2;

 

  //crear un sprite de suelo invisible
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  //var rand =Math.round(random(1,100));
  //console.log(rand);
  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  score = 0;

  cat.setCollider("rectangle", 80, 40, 200,40);
  cat.debug = true;

  gameOver = createSprite(300, 100);
  gameOver.addAnimation("gameOver",gameOver_Image);
  gameOver.scale=0.2;

  restart = createSprite(300, 140);
  restart.addImage(restart_Image);
  restart.scale=0.2;
}

function draw() {
  background("white");

  salto = 0;

  text("score:" + score, 500, 50);


  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / (60));
    //agregar el movimiento
    ground.velocityX = -2;

    if (ground.x < 0) {
      ground.x = ground.width/2;
    }
    //Salto
    if (cat.y < 160) salto = 1;
    if (cat.y > 160) salto = 0;

    if (keyDown("space") && (salto === 0)) {
      cat.velocityY = -10;
    }

    //le damos una velocidad de bajada "gravedad"
    cat.velocityY = cat.velocityY + 0.5;

    spawnClouds();

    spawnObstacles();

    gameOver.visible = false;
    restart.visible = false;


    if (obstaclesGroup.isTouching(cat)) {
      gameState = END;
    }

  } else if (gameState === END) {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cat.changeAnimation("collided", cat_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    cat.velocityY = 0;
    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset();
      }
  }


  //evita que el cat se caiga
  cat.collide(invisibleGround);


  //console.log(frameCount);

  drawSprites();

}

function spawnClouds() {
  //escribir el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addAnimation("clouds",cloudImage);
    cloud.scale = 0.05;
    cloud.y = Math.round(random(10, 100));
    cloud.velocityX = -3;

    //console.log(cat.depth, cloud.depth);

    cloud.depth = cat.depth;
    cat.depth = cat.depth + 1;

    //asignar un tiempo de vida a las nubes
    //lifetime = Distancia / velocidad
    cloud.lifetime = 200;

    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {

    obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -3;
    

    rand = Math.round(random(1, 6));

    switch (rand) {
      case 1: obstacle.addAnimation("obstacle1", obstacle1);
      obstacle.scale=0.05;
        break;

      case 2: obstacle.addAnimation("obstacle2", obstacle2);
      obstacle.scale=0.15;
        break;

      case 3: obstacle.addAnimation("obstacle3", obstacle3);
      obstacle.scale=0.15;
        break;

      case 4: obstacle.addAnimation("obstacle4", obstacle4);
      obstacle.scale=0.09;
        break;

      case 5: obstacle.addAnimation("obstacle5", obstacle5);
      obstacle.scale=0.15;
        break;

      case 6: obstacle.addAnimation("obstacle6", obstacle6);
      obstacle.scale=0.15;
        break;

      default:
        break;

    }

   
    obstacle.lifetime = 208;

    obstaclesGroup.add(obstacle);

  }
}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  cat.changeAnimation("running",cat_running);
  
  score = 0;
  
}