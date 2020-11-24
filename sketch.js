var monkey, monkey_running;
var banana, bananaImage, stone, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var stoneImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround;
var scene, sceneImage;
var score = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  sceneImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  stoneImage = loadImage("obstacle.png");
}



function setup() {

  createCanvas(600, 600);

  foodGroup = new Group();
  obstacleGroup = new Group();

  scene = createSprite(200, 200);
  scene.addImage(sceneImage);
  scene.x = scene.width / 2;

  monkey = createSprite(30, 350, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  invisibleGround = createSprite(30, 390, 800, 10);
  invisibleGround.visible = false;
}


function draw() {
  background("white");
  scene.velocityX = -5;
  text("Score: " + score, 350, 40);

  monkey.collide(invisibleGround);


  if (gameState === PLAY) {
    if (scene.x < 0) {
      scene.x = scene.width / 2;
    }

    if (keyDown("space")) {
      monkey.y = monkey.y - 5
    }
    monkey.y = monkey.y + 2.5

    createStone();
    createBanana();

    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score + 1;
      monkey.scale = monkey.scale + 0.05
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;

    }

  }

  if (gameState === END) {

    scene.velocityX = 0;
    monkey.velocityY = 0;

    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

  }


  drawSprites();

}

function createStone() {
  if (frameCount % 150 === 0) {
    stone = createSprite(550, 350, 10, 10);
    stone.scale = 0.15;
    stone.velocityX = -5;
    stone.addImage(stoneImage);
    monkey.depth = stone.depth;
    monkey.depth = monkey.depth + 1;
    obstacleGroup.add(stone);
  }

}

function createBanana() {
  if (frameCount % 200 === 0) {
    banana = createSprite(550, 550, 10, 10);
    banana.y = Math.round(random(220, 280))
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.addImage(bananaImage);
    foodGroup.add(banana);
  }

}