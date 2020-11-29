var dog
var dog_Img
var happyDog_Img
var database
var foodS, foodStock

function preload(){
  dog_Img = loadImage('images/dogImg.png')
  happyDog_Img = loadImage('images/dogImg1.png')
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  database.ref('/').update({
    Food:20
  })
  dog = createSprite(250,250,50,50)
  dog_Img.resize(200,200)
  happyDog_Img.resize(200,200)
  dog.addImage(dog_Img)
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

}


function draw() {  
background(46, 139, 87)
if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dog.addImage(happyDog_Img)
}
  drawSprites();
  fill("black")
text("Milk Bottles Left -"+foodS,200,100)
text("Press UP_ARROW Key To Feed Milk",150,50)
}


function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }else{
    x = x-1
  }

  database.ref('/').update({
    Food:x
  })
}


