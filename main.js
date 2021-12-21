song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;


function preload(){
song1=loadSound("song.mp3");
song2=loadSound("peter.mp3");
}

function setup(){
canvas=createCanvas(500,600);
canvas.center();

video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotposes);
}

function draw(){
    image(video,0,0,500,600);

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    fill("red");
    stroke("red");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="playing Harry Potter Song";

        }
    }

}

function play_song(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop_song(){
    song.stop();
}

function modelLoaded(){
    console.log("posenet is initialized");
}

function gotposes(results){
if(results.length>0){
    console.log(results);
scoreLeftWrist=results[0].pose.keypoints[9].score;
console.log(scoreLeftWrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("Left Wrist x ="+leftWristX+"left wrist y ="+leftWristY);
    console.log("right wrist x="+rightWristX+"right wrist y="+rightWristY);
}
}