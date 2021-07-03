//Create variables here
var dog, happyDog, milk;
var database;
var foodS, foodStock;
var dogImg, milkImg;
var lastFed, foodObj, lastfed;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

function preload()
{
	//load images here
  dogImg=loadImage("images/dog.png");
  happyDog=loadImage("images/happyDog.png");
  milkImg=loadImage("images/Milk.png")
}

function setup() {
  
	createCanvas(1300, 580);


  database = firebase.database();

  ground=createSprite(200,600,5555,300)
  ground.shapeColor="lightgreen"

  dog=createSprite(1049,375);
  dog.addImage(dogImg);
  dog.scale = 0.3;


  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
 // foodStock.set(20);

food=new Food()

  fedTime=database.ref('fedTime')
  fedTime.on("value",function(data){
    fedTime=data.val()
  })

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  

 
 
  feedFood=createButton('Feed 🥛')
  feedFood.position(1000,100)
  feedFood.mousePressed(feedDog)
  addfood=createButton('add 🥛')
  addfood.position(900,100)
  addfood.mousePressed(addFood)

  milk=createSprite(940,430)
  milk.addImage(milkImg)
  milk.scale=0.15

  input = createInput("Name of your Pet");
  input.position(600,200)
  button = createButton('Play');
  button.position(650,240)
  greeting = createElement('h3');
  button.mousePressed(()=>{
    input.hide()
    button .hide()
    name = input.value();
    greeting.html("Hello I am your Pet"+name+"🐶")
   greeting .position(500,100)
    
  })
 

}



function draw() {  
background(49,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

background("pink");
  
  currentTime = hour();

  food.display()


  drawSprites();
  fill ("red")
  textSize(30)
  if(fedTime>=12){
    text("last feed:"+fedTime%12 +"pm",350,30)
  }else if(fedTime==0){
    text("last fed: 12 am",350,30)
  }
  else{
    text("last feed: "+fedTime+"am",350,30)
  }
 

  drawSprites();
  //add styles here
  fill("black");
  textSize(16);
  text("Note:Press UP ARROW to feed Drago milk",100,50);

  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastfed+ "AM",350,30);
  }
}


  


function readStock(data)
{
  foodS = data.val();
  food.updateFoodStock(foodS);
}



function feedDog()
{
    dog.addImage(happyDog);
    foodS--;
  
    milkImg.visible=true
    database.ref('/').update({
      Food : foodS
    })
    fedTime = hour(); 
}
function addFood()
{
  dogImg.addImage(dogImg);
  milkImg.visible=false
  foodS++;
  
  database.ref('/').update({
    Food:foodS
  })
  
}
