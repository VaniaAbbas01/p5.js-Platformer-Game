/*

Final Game Project Submission 

Candidate No: EX0124
Module Code: CM1005
Module Title: Introduction to Prgramming 1

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var tree;
var mountain;
var cloud;

var worms;
var canyons;

var score;
var flagpole;
var lives;
var platforms;
var enemies;

var cameraPosX;

var backSound;
var bounceSound;
var screechSound;
var gameOver;
var chew;
var victorySound;
var swordSound;



function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    backSound = loadSound('assets/back.wav');
    backSound.setVolume(0.9);
    
    bounceSound = loadSound('assets/wing.mp3');
    bounceSound.setVolume(0.9);
    
    screechSound = loadSound('assets/screech.wav');
    screechSound.setVolume(0.9);
    
    gameOver = loadSound('assets/gameOver.wav');
    gameOver.setVolume(0.9);
    
    chew = loadSound('assets/Chew.wav');
    chew.setVolume(0.9);
    
    victorySound = loadSound('assets/victorySound.wav');
    victorySound.setVolume(0.5); 
    
    swordSound = loadSound('assets/enemy.wav');
    swordSound.setVolume(0.5);
    
}

function setup()
{   
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
	
    
    lives = 3;
    
    startGame();
}

function startGame()
{
        backSound.loop();
        gameChar_x = width/2;
        gameChar_y = floorPos_y;
    
         isLeft = false;
         isRight = false;
         isFalling = false;
         isPlummeting = false;

         score = 0;
        platforms = [];
        platforms.push(createPlatforms(680, floorPos_y - 90, 210));
        platforms.push(createPlatforms(900, floorPos_y - 170, 200));
        platforms.push(createPlatforms(1800, floorPos_y - 90, 200));
        platforms.push(createPlatforms(1970, floorPos_y - 170, 200));
        platforms.push(createPlatforms(2150, floorPos_y - 250, 200));
        platforms.push(createPlatforms(2300, floorPos_y - 130, 200));
        platforms.push(createPlatforms(2500, floorPos_y - 210, 200));
    

    worms = [
        {x_pos: 500, y_pos: floorPos_y - 340, size: 50, isFound: false},
        {x_pos: 750, y_pos: floorPos_y - 430, size: 50, isFound: false},
        {x_pos: 900, y_pos: floorPos_y - 510, size: 50, isFound: false},
        {x_pos: 1100, y_pos: floorPos_y - 340, size: 50, isFound: false},
        {x_pos: 1300, y_pos: floorPos_y - 340, size: 50, isFound: false},
        {x_pos: 1850, y_pos: floorPos_y - 430, size: 50, isFound: false},
        {x_pos: 2000, y_pos: floorPos_y - 510, size: 50, isFound: false},
        {x_pos: 2200, y_pos: floorPos_y - 590, size: 50, isFound: false},
        {x_pos: 2350, y_pos: floorPos_y - 470, size: 50, isFound: false},
        {x_pos: 2500, y_pos: floorPos_y - 550, size: 50, isFound: false},
        ];
    
    canyons = [
        {x_pos: 640, y_pos: 100, width: 200},  
        {x_pos: 940, y_pos: 100, width: 40},
        {x_pos: 1240, y_pos: 100, width: 50}, 
        {x_pos: 1540, y_pos: 100, width: 60},
        {x_pos: 1800, y_pos: 100, width: 90},
        {x_pos: 2100, y_pos: 100, width: 100},
        {x_pos: 2400, y_pos: 100, width: 100},
        ];
    
    tree = [
        {x: 200, y: height/1.54},
        {x: 600, y: height/1.54},
        {x: 1200, y: height/1.54},
        {x: 1400, y: height/1.54},
        {x: 1700, y: height/1.54},
        {x: 2900, y: height/1.54}
    ];
    
    cloud = [
        {x: 100, y: 110},
        {x: 300, y: 110},
        {x: 100, y: 110},
        {x: 300, y: 110},
        {x: 1200, y: 110}
    ];

    mountain = [
        {x: 300, y: height/1.54 - 90},
        {x: 800, y: height/1.54 - 90},
        {x: 1300, y: height/1.54 - 90},
        {x: 1800, y: height/1.54 - 90},
        {x: 2300, y: height/1.54 - 90},
        {x: 2800, y: height/1.54 - 90}
    ];
    
    flagpole = {
        isReached: false,
        x_pos: 3100,
    }
    
    enemies = [];
    enemies.push(new Enemy(910, floorPos_y - 50, 100));
    enemies.push(new Enemy(1040, floorPos_y - 50, 120));
    enemies.push(new Enemy(1960, floorPos_y - 50, 190));
    enemies.push(new Enemy(2200, floorPos_y - 50, 200));
    enemies.push(new Enemy(2700, floorPos_y - 50, 100));
    cameraPosX = 0;
} // end of startGame 

function draw()
{
    cameraPosX = gameChar_x - width/2;

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue
    
    noStroke();
	fill(255,255,255);
    rect(0, floorPos_y - 16, width, height - (floorPos_y - 50) );
    
    fill(150,0,0);
    rect(0,floorPos_y, width, height - (floorPos_y));
    
    fill(0,150,0);
    rect(0,floorPos_y - 5,width,height - (floorPos_y + 125) );//draw some ground
    
    push();
    translate(-cameraPosX,0);
    
    //mountain loop
    locateMountains();
    
    //tree loop
    locateTrees();
    
    //cloud loop
    locateClouds();
    
    //flagpole
    locateFlagpole();
    
    //platforms 
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }
    
    //draw the worm and worm consumption
    for(var i = 0; i < worms.length; i++)
        {
            if(!worms[i].isFound)
                {
                    locateWorm(worms[i]);
                    checkWorm(worms[i]);
                }
        }
    
    
	//draw the canyon and canyon interaction
    for (var i = 0; i < canyons.length; i++)
        {
            locateCanyon(canyons[i]);
            checkCanyon(canyons[i]);
        }
    
    if(flagpole.isReached == false)
        {
            checkFlagpole();
        }
    
	//the game character
    locateCharacter();
   
    //enemies
    for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
            
            var isContact = enemies[i].checkContact(gameChar_x,gameChar_y);
            if(isContact)
                {
                    if(lives > 0)
                        {
                            swordSound.play();
                            startGame();
                            break; 
                        }
                }
        }
     
   pop();
    
   //lives  
   checkPlayerDie();
   
   //lives counter
   for( var i = 0; i < lives; i++)
        {
            fill(255);
            stroke(5);
            strokeWeight(2);
            line(20 + i * 30,
                 50,
                 20 + i * 30,
                 40);
            noStroke();
            fill(150,0,0);
            ellipse(20 + i * 30, 35, 10, 15 );
        }
    
    fill(255);
    noStroke();
    text(' Score: ' + score, 20, 15);
    
    if(lives < 1 )
        {
            fill(0,100,0);
            textFont('Helevetica');
            textSize(25);
            text('Game Over! Press Space to Continue', width/2 - 150, height/2);
            screechSound.stop();
            gameOver.play();
            return;
        }
    
    if(flagpole.isReached == true)
        {
            fill(0,100,0);
            textFont('Helevetica');
            textSize(25);
            text('Yay! Level Complete! Press Space to Continue', width/2 - 150, height/2);
            victorySound.play();
            return;
        }
    

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    //moving left
    if ( isLeft == true )
        {
            gameChar_x -= 5;      
        }
    
    //moving right
    if ( isRight == true )
        {
            gameChar_x += 5;
        }
    
    //falling down after jumping and platforms jumping
    if ( gameChar_y < floorPos_y )
        {
            var isContact = false;
            
            for(var i = 0; i < platforms.length; i++)
                {
                    if (platforms[i].checkContact(gameChar_x,gameChar_y))
                        {
                            isContact = true;
                            isPlummeting = false; 
                            isFalling = false;
                            break;
                        }
                }
            if(isContact == false)
                {
                    isFalling = true;
                    gameChar_y += 5;
                    isPlummeting = true;   //preventing double jump
                }
        }
   else
        {
            isFalling = false;
            isPlummeting = false;
        
        }
    console.log(isPlummeting);
    
    
} // end of draw


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    //moving right
    if( keyCode == 68)
        {
            isRight = true;
        }
    //moving left
    if( keyCode == 65)
        {
            isLeft = true;
        }
    //jumping
    if( keyCode == 87 && isPlummeting == false )
        {
            gameChar_y -= 100;
            bounceSound.play();
        }
    
} // end of keyPressed

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
    
    //moving right
    if( keyCode == 68 )
        {
            isRight = false;
        }
    
    //moving left
    if( keyCode == 65 )
         {
             isLeft = false;
         }

} // end of keyReleased
    
function locateClouds()
{
   for(i = 0; i < cloud.length; i++)
        {
            fill(255,255,255);
            ellipse(cloud[i].x, cloud[i].y, 60,60);
            ellipse(cloud[i].x - 40, cloud[i].y + 10, 60,60);
            ellipse(cloud[i].x + 40, cloud[i].y + 10, 60,60);
            ellipse(cloud[i].x + 350, cloud[i].y - 80, 60,60);
            ellipse(cloud[i].x + 310, cloud[i].y - 70, 60,60);
            ellipse(cloud[i].x + 390, cloud[i].y - 70, 60,60);
            ellipse(cloud[i].x + 700, cloud[i].y, 60,60);
            ellipse(cloud[i].x + 660, cloud[i].y + 10, 60,60);
            ellipse(cloud[i].x + 740, cloud[i].y + 10, 60,60); 

            
        } 
}//end of renderClouds

function locateMountains()
{
    for(i = 0; i < mountain.length; i++)
        {
            fill(110,0,0);
            triangle(mountain[i].x, mountain[i].y,
                     mountain[i].x - 200, mountain[i].y + 132,
                     mountain[i].x + 200, mountain[i].y + 132);
            triangle(mountain[i].x + 200, mountain[i].y + 50,
                     mountain[i].x,mountain[i].y +132, 
                     mountain[i].x + 400, mountain[i].y +132);
            triangle(mountain[i].x - 200, mountain[i].y + 80,
                     mountain[i].x - 450, mountain[i].y + 132,
                     mountain[i].x, mountain[i].y + 132);
            fill(255,255,255);
            triangle(mountain[i].x,mountain[i].y,
                     mountain[i].x - 30, mountain[i].y + 20,
                     mountain[i].x + 30, mountain[i].y + 20);
            triangle(mountain[i].x + 200, mountain[i].y + 50, 
                     mountain[i].x + 150, mountain[i].y + 70,
                     mountain[i].x + 250, mountain[i].y + 70);
            triangle(mountain[i].x - 200, mountain[i].y + 80,
                     mountain[i].x - 250, mountain[i].y + 90,
                     mountain[i].x - 160, mountain[i].y + 90);
            
        }
} // end of renderMountains
function locateTrees()
{
   for (var i = 0; i < tree.length; i++ )
        {
            noStroke();
            fill(210,105,30);
            rect(tree[i].x,tree[i].y - 100,25,141);
            fill(0,175,0);
            ellipse(tree[i].x + 10, tree[i].y - 141, 100,100);
            ellipse(tree[i].x - 10, tree[i].y - 190, 90,100);
            ellipse(tree[i].x + 30, tree[i].y - 170, 90,100);
            fill(205,0,0);
            ellipse(tree[i].x + 20, tree[i].y - 150, 15,15);
            ellipse(tree[i].x , tree[i].y - 110, 15,15);
            ellipse(tree[i].x + 13 , tree[i].y - 200, 15,15);
            ellipse(tree[i].x - 18 , tree[i].y - 180, 15,15);

        } 
} // end of renderTrees

function locateCharacter()
{
    if(isLeft && isFalling)
	{
		// add your jumping-left code
        noStroke();
        fill(0,255,127);
        arc(gameChar_x + 5,
            gameChar_y - 37,
            30,30,20,PI + 20); //body
        ellipse(gameChar_x - 7,
                gameChar_y - 55,
                15,15);  //head
        fill(0);
        stroke(2);
        line(gameChar_x + 3,
             gameChar_y - 22,
             gameChar_x + 3,
             gameChar_y - 17); //leg
        line(gameChar_x + 1,
             gameChar_y - 23,
             gameChar_x + 1,
             gameChar_y - 17); //leg
        triangle(gameChar_x - 21,
                 gameChar_y - 52,
                 gameChar_x - 14,
                 gameChar_y - 53,
                 gameChar_x - 14,
                 gameChar_y - 54); //beak
        stroke(20);
        point(gameChar_x - 7,
              gameChar_y - 55); //eye
        noStroke();
        fill(255,160,122);
        triangle(gameChar_x,
                 gameChar_y - 47,
                 gameChar_x + 15,
                 gameChar_y - 57,
                 gameChar_x + 22,
                 gameChar_y - 29);  //wing1
        triangle(gameChar_x, 
                 gameChar_y - 47,
                 gameChar_x + 15,
                 gameChar_y - 57,
                 gameChar_x + 25,
                 gameChar_y - 32);  //wing2

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        noStroke();
        fill(0,255,127);
        arc(gameChar_x - 5,
            gameChar_y - 37,
            30,30,20 - 90,PI/1.37 ); //body
        ellipse(gameChar_x + 7 ,
                gameChar_y - 52,
                15,15);  //head
        fill(0);
        stroke(2);
        line(gameChar_x,
             gameChar_y - 23,
             gameChar_x,
             gameChar_y - 17); //leg
        line(gameChar_x - 2,
             gameChar_y - 22,
             gameChar_x - 2,
             gameChar_y - 17);  //leg
        triangle(gameChar_x + 14,
                 gameChar_y - 49,
                 gameChar_x + 14.5,
                 gameChar_y - 50,
                 gameChar_x + 22,
                 gameChar_y - 48); //beak
        stroke(40);
        point(gameChar_x + 7,
              gameChar_y - 52); //eye
        noStroke();
        fill(255,160,122);
        triangle(gameChar_x + 1,
                 gameChar_y - 44,
                 gameChar_x - 14,
                 gameChar_y - 55,
                 gameChar_x - 25,
                 gameChar_y - 27); //wing 1 
        triangle(gameChar_x + 1,
                 gameChar_y - 44,
                 gameChar_x - 14,
                 gameChar_y - 55,
                 gameChar_x - 28,
                 gameChar_y - 31); //wing 2 

	}
	else if(isLeft)
	{
		// add your walking left code
        noStroke();
           fill(0,255,127);
        arc(gameChar_x + 4,
            gameChar_y - 37,
            30,30,20,PI + 20);  //body  
        ellipse(gameChar_x - 7.75,
                gameChar_y - 55,
                15,15);  //head
        fill(0);
        stroke(2);
        line(gameChar_x,
             gameChar_y - 22,
             gameChar_x,
             gameChar_y - 17); //leg
        line(gameChar_x - 2,
             gameChar_y - 23,
             gameChar_x - 2,
             gameChar_y - 17); //leg
        triangle(gameChar_x - 15,
                 gameChar_y - 54,
                 gameChar_x - 15,
                 gameChar_y - 53,
                 gameChar_x -  22,
                 gameChar_y - 53); //beak
        stroke(20);
        point(gameChar_x - 7.75,
              gameChar_y - 55);  //eye
     

	}
	else if(isRight)
	{
		// add your walking right code
        noStroke();
        fill(0,255,127);
        arc(gameChar_x - 10,
            gameChar_y - 37,
            30,30,20 - 90,PI/1.37 ); //body
        ellipse(gameChar_x + 6,
                gameChar_y - 52,
                15,15);   //head
        fill(0);
        stroke(2);
        line(gameChar_x - 5,
             gameChar_y - 22,
             gameChar_x - 5,
             gameChar_y - 17); //leg
        line(gameChar_x - 3,
             gameChar_y - 23,
             gameChar_x - 3,
             gameChar_y - 17); //leg
        triangle(gameChar_x + 14,
                 gameChar_y - 50,
                 gameChar_x + 14,
                 gameChar_y - 51,
                 gameChar_x + 22,
                 gameChar_y - 50); //beak
        stroke(40);
        point(gameChar_x + 6,
              gameChar_y - 52); //eye

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        noStroke();
            fill(0,255,127);
        ellipse(gameChar_x,
                gameChar_y - 59,
                15,15); //head
        ellipse(gameChar_x,
                gameChar_y - 37,
                15,30); //body
        fill(255,160,122);
        triangle(gameChar_x + 5,
                 gameChar_y - 47,
                 gameChar_x + 5,
                 gameChar_y - 27,
                 gameChar_x + 20,
                 gameChar_y - 47); //wings 1
        triangle(gameChar_x - 5,
                 gameChar_y - 47,
                 gameChar_x - 5,
                 gameChar_y - 27,
                 gameChar_x - 20,
                 gameChar_y - 47); //wings 2
         
        fill(150,0,0);
        stroke(2);
        line(gameChar_x - 1 ,
             gameChar_y - 22,
             gameChar_x - 1,
             gameChar_y - 17); //legs
        line(gameChar_x + 1,
             gameChar_y - 22,
             gameChar_x + 1 ,
             gameChar_y - 17); //legs
        point(gameChar_x - 3,
              gameChar_y - 60); //eye
        point(gameChar_x + 3,
              gameChar_y - 60); //eye
        point(gameChar_x,
              gameChar_y - 59); //nose

	}
	else
	{
		// add your standing front facing code
        noStroke();
        fill(0,255,127);
        ellipse(gameChar_x,
                gameChar_y - 59,
                15,15); //head
        fill(0,255,127);
        ellipse(gameChar_x,
                gameChar_y - 37,
                15,30); //body
        fill(255,160,122);
        ellipse(gameChar_x + 4,
                gameChar_y - 37,
                5,17);  //wings 1 
        ellipse(gameChar_x - 4,
                gameChar_y - 37,
                5,17);  //wings 2
        fill(150,0,0);
        stroke(2);
        line(gameChar_x - 1,
             gameChar_y - 22,
             gameChar_x - 1,
             gameChar_y - 17);   //legs
        line(gameChar_x + 1,
             gameChar_y - 22,
             gameChar_x + 1,
             gameChar_y - 17);   //legs
        fill(20);
        point(gameChar_x - 3,
              gameChar_y - 60);  //eyes 1 
        point(gameChar_x + 3,
              gameChar_y - 60);  //eyes 2 
        point(gameChar_x,
              gameChar_y - 58);  // nose


	}
} // end of renderCharacter
function locateWorm(t_worm)  //t for temporary
{
     if(t_worm.isFound == false)
         {
             fill(0);
             ellipse(t_worm.x_pos + 100,
                     t_worm.y_pos + 320,
                     t_worm.size - 35,
                     t_worm.size - 45);
             fill(200,0,0);
             ellipse(t_worm.x_pos + 109,
                     t_worm.y_pos + 318,
                     7,7);
         }
} // end of renderWorm

function locateCanyon(t_canyon)
{
      fill(100,0,0);
    rect(t_canyon.x_pos + 70,
         t_canyon.y_pos + 316,
         t_canyon.width,160);
    fill(0,0,150);
    rect(t_canyon.x_pos + 70,
         t_canyon.y_pos + 400,
         t_canyon.width,160);
} // end of renderCanyon

function checkWorm(t_worm)
{ 
    if( dist(gameChar_x,
             gameChar_y,
             t_worm.x_pos + 100,
             t_worm.y_pos + 320) < 30 )
         {
             t_worm.isFound = true;
             score += 1;
             chew.play();
         }
} // end of checkWorm

function checkCanyon(t_canyon)
{
    if((gameChar_x > (t_canyon.x_pos + 70))  &&
       gameChar_x < (t_canyon.x_pos + 70) + t_canyon.width &&
       gameChar_y >= floorPos_y)
        {
            isPlummeting = true;
            gameChar_y += 200;
            screechSound.play();
        }
    if(isPlummeting == true && gameChar_y > floorPos_y)
        {
            isLeft = false;
            isRight = false;
            isfalling = false;
        }    //to prevent character from moving while in the canyon
} //end of checkCanyon
function locateFlagpole()
{
    push();
    fill(100,0,0);
    stroke(50);
    strokeWeight(5);
    line(flagpole.x_pos, floorPos_y - 17, flagpole.x_pos, floorPos_y - 200);
    fill(150,0,0);
    noStroke();

    if(flagpole.isReached)
        {
            rect(flagpole.x_pos, floorPos_y - 200, 50, 50);
        }
    else
        {
            rect(flagpole.x_pos, floorPos_y - 70, 50, 50);
        }

    pop();
} //end of renderFlagpole
    
    
function checkFlagpole()
{
    var d = abs(gameChar_x - flagpole.x_pos);
    console.log(d);
    if( d < 12)
        {
            flagpole.isReached = true;
        }
} // end of checkFlagpole

function checkPlayerDie()
{
    if(gameChar_y > height )
        {
            lives -= 1;
            
                if(lives > 0)
                {
                    startGame();
                }
        }
    
    
} // end of checkPlayerDie
 
function createPlatforms(x,y,length)
{
    var p = {
        
        x: x,
        y: y,
        length: length,
        draw: function()
        {
            fill(150,0,0);
            rect(this.x,this.y - 17,this.length,12);
            fill(0,150,0);
            rect(this.x - 5, this.y - 5,this.length + 10, 10);
            fill(255,255,255);
            rect(this.x - 10, this.y - 10,this.length + 20,8);
        },
        checkContact: function(gc_x, gc_y)
        {
           if(gc_x > this.x && gc_x < this.x + this.length)
               {
                   var d = this.y - gc_y;
                   if( d >= 0 && d < 5)
                       {
                           return true;
                       }
               }
            return false;
        }
    }
    return p;
}

function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range; 
    
    this.currentX = x;
    this.inc = 1; 
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        else if(this.currentX < this.x)
            {
                this.inc = 1; 
            }
    },
    
    this.draw = function()
    {
        this.update();
        fill(220,220,220);
        noStroke();
         arc(this.currentX,
            this.y + 10,
            30,30,20 - 90,PI/1.37 );
        stroke(2);
        strokeWeight(4);
        line(this.currentX - 10, this.y + 29, this.currentX - 2, this.y + 20);
        
    },
    
    this.checkContact = function(gc_x, gc_y)
    {
        var d = dist(gc_x, gc_y, this.currentX, this.y);
        console.log(d);
        if(d < 60)
            {
                return true; 
            }
        return false; 
        
    }
    
}