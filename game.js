var logs = [{speed: 2,init: -200,x: -200,y: 110},
{speed: 2,x: -450,y: 110},
{speed: 2,x: -650,y: 110},
{speed: 3,x: -225,y: 145},
{speed: 3,x: -500,y: 145},
{speed: 3,x: -730,y: 145},
{speed: 2,x: -450,y: 180},
{speed: 2,x: -200,y: 180},
{speed: 2,x: -180,y: 215},
{speed: 2,x: -380,y: 215},
{speed: 2,x: -620,y: 215},
{speed: 3,x: -500,y: 250},
{speed: 3,x: -750,y: 250},
{speed: 3,x: -200,y: 250},];

var car_inits_right = [-40, -170, -300, -430];
var car_inits_left = [440, 540, 640, 740, 840];
var cars_right_y = [355,425];
var cars_left_y = [320,390,460];
var home_loc = [10,95,180,265,350]

var frogger = {x:190,y:496};
var frog_w = 24;
var frog_h = 28;
var log_w = 180;
var log_h = 25;
var car_h = 29;
var level = 1;
var speed_limit = 1;
var lives = 5;
var score = 0;
var successes = 0;
var highscore = 0;
var score_increment = 10;
var bonus_life = 0;
var fly_life = 30;
var fly_count = 0;
var newRandLoc = true;
var randomX;
var randomY;
var fly_w = 30;
var fly_h = 29;

function start_game() { 
    canvas=document.getElementById("game");
	image = new Image();
	image.src="frogger_sprites.png";
	
	image.onload = function () {
		document.getElementById('start_sound').play();
		delay = 40;
		get_direction();
		draw();
		setInterval(draw,delay);
	}
}

function get_direction(){
	document.onkeydown = checkKey;
}
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        frogger.y-=35;
        score += score_increment;
        document.getElementById('jump_sound').play();
        fly_count+=1;
    }
    else if(e.keyCode == '37') {
	    if(frogger.x-frog_w > 0){
	    	frogger.x -= frog_w;
	    	document.getElementById('jump_sound').play();
	    	fly_count+=1;
	    }
    }
    else if (e.keyCode == '40') {
	    if(frogger.y+frog_w <496){
	        frogger.y+=35;
	        score-=score_increment;  // testttttttttttttttttttttttttttttttttttttttt
	        document.getElementById('jump_sound').play();
	        fly_count+=1;

	    }
	}
	else if(e.keyCode == '39'){
		if(frogger.x+frog_w < 380){
			frogger.x +=frog_w;
			document.getElementById('jump_sound').play();
			fly_count+=1;

		}
	}
}	

function draw() {
	ctx=canvas.getContext("2d");
			
    ctx.fillStyle = "#191970";
	ctx.fillRect (2,2,395,280);
	ctx.drawImage(image,0,9,399,98,2,6,395,91);
	ctx.fillStyle = "#000000";
	ctx.fillRect (2,280,395,282);
	ctx.drawImage(image,0,117,399,38,2,277,395,38);
	ctx.drawImage(image,0,117,399,38,2,490,395,38);
	
	ctx.fillStyle = "#76EE00";
	ctx.font="20px sans-serif";
	ctx.fillText("Level",320,542,100);
	ctx.fillText(level,370,542,100);
	
	ctx.font="14px sans-serif";
	ctx.fillText("Score: ",5,558,100);
	ctx.fillText(score,48,558,100);
	ctx.fillText("Highscore:",260,558,100);
	ctx.fillText(highscore,330,558,100);
	
	draw_log();
	draw_car();
	draw_frogger();
	detect_collision_log();
	detect_collision_car();
	draw_lives();
	draw_fly();
	
	if(successes==5){
		level_up();
	}
	if(score!=0 && score%10000==0 && bonus_life*10000+10000 == score){
		lives+=1;
		bonus_life+=1;
		//score+=
	}
	if(lives==-1){
		game_over();
		var player_name = prompt("Please enter your name!","YOUR NAME HERE");
		console.log(player_name);
	}
	
}

function draw_frogger(){
	ctx.drawImage(image,45,365,frog_w,frog_h,frogger.x,frogger.y,frog_w,frog_h);
}

function draw_log(log_posit){
	for(i = 0; i<logs.length; i++){
		ctx.drawImage(image,6,164,180,25,logs[i].x,logs[i].y,180,25); 	//draw one log
		logs[i].x+=logs[i].speed;
		if(logs[i].x > 400 + log_w){
			logs[i].x = -200;
		}		
	}
}
function draw_car(){
	for(i = 0; i<car_inits_left.length; i++){
		ctx.drawImage(image,8,265,33,29,car_inits_left[i],320,30,29);
		ctx.drawImage(image,83,263,24,29,car_inits_left[i],390,30,29);
		ctx.drawImage(image,45,263,24,29,car_inits_left[i],460,30,29);
		car_inits_left[i]-=speed_limit;
		if(car_inits_left[i] < -40){
			car_inits_left[i] = 440;
		}
	}
	for(j = 0; j<car_inits_right.length; j++){
		ctx.drawImage(image,103,299,39,29,car_inits_right[j],355,35,29);
		ctx.drawImage(image,103,299,39,29,car_inits_right[j],425,35,29);
		car_inits_right[j]+=speed_limit;
		if(car_inits_right[j] > 460){
			car_inits_right[j] = -60;
		}	
	}
}

function detect_collision_log(){
	var frog_center = new Object;
	frog_center.x = frogger.x+frog_w/2;
	frog_center.y = frogger.y+frog_h/2;
	for(i = 0; i<logs.length; i++){
		if(check_vert(frog_center.y, i)&&check_hor(frog_center.x, i)){
			frogger.x+=logs[i].speed;
			if(frogger.x>400){
				frogger.x = 190;
				frogger.y = 496;
				document.getElementById('die_sound').play();
				lives-=1;
			}
			return;
		}
	}
	if(frog_center.y < 280){
		if(frog_center.y<100){
			var win = check_home(frog_center.x);
			if(win){
				successes+=1;
			}
		}
		frogger.x = 190;
		frogger.y = 496;
		
		if(!win){
			document.getElementById('die_sound').play();
			lives-=1;
		}
	}
}

function detect_collision_car(){
	for(i = 0; i< car_inits_right.length; i++){
		for(j = 0; j < cars_right_y.length;j++){
			check_car(car_inits_right[i],cars_right_y[j],35);
			
		}
	}
	for(k = 0; k< car_inits_left.length; k++){
		for(l = 0; l < cars_left_y.length;l++){
			check_car(car_inits_left[k],cars_left_y[l],30);
		}
	}
}

function check_car(x, y, car_width){
	if( (((frogger.x +frog_w > x) && (frogger.x + frog_w < x + car_width)) ||
		((frogger.x > x)&&(frogger.x < x + car_width)))&&
		((frogger.y + frog_h/2 > y)&&(frogger.y +frog_h/2 < y + car_h))){
			console.log(x,y);
			frogger.x = 190;
			frogger.y = 496;
			document.getElementById('die_sound').play();
			lives-=1;
	}	
}

function check_vert(center, index){
	if(center>logs[i].y && center<logs[i].y+log_h){
		return true;
	}
}

function check_hor(center, index){
	if(center>logs[i].x && center<logs[i].x+log_w){
		return true;
	}
}

function check_home(x){
	console.log(x);

	for(i=0;i < home_loc.length;i++){
		if(x > home_loc[i] && x < home_loc[i] + 33){
			score +=50;
			return true;
		}
	}
	return false;

}
function draw_lives(){
	for(i = 0; i<lives; i++){
		temp = i*19+4;
		ctx.drawImage(image,267,406,34,30,temp,527,18,20);
	}
}
function game_over(){
	if(score>highscore){
		highscore = score;
	}
	score = 0;
	lives = 5;
	level = 1;
	score_increment = 10;
}

function level_up(){
	successes = 0;
	level +=1;
	score +=1000;
	score_increment=score_increment+10;
	increase_speed();
	
}
function increase_speed(){
	speed_limit+=1;
	for(i=0;i< logs.length;i++){
		logs[i].speed +=1;
	}
}
function draw_fly(){
	if(fly_count<fly_life){
		if(newRandLoc){
			randomX=Math.floor(Math.random()*370);
			randomY=Math.floor(Math.random()*350)+110;
			newRandLoc = false;
		}
		ctx.drawImage(image,144,232,25,24,randomX,randomY,30,29);
		
		if(((frogger.x +frog_w > randomX) && (frogger.x + frog_w < randomX+ fly_w)) ||
		((frogger.x > randomX) && (frogger.x < randomX+ fly_w))){
			var test1 = true;
		}
		if(((frogger.y +frog_h > randomY) && (frogger.y + frog_h < randomY+ fly_h)) ||
		((frogger.y > randomY) && (frogger.y < randomY+ fly_h))){
			var test2 =true;
		}
		if(test1&&test2){
			fly_count=fly_life;
			score+=200;
		}
	}
	if(fly_count>60){
		console.log(fly_count);
		fly_count =0;
		newRandLoc = true;
	}

}