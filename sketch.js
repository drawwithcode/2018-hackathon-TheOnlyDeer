let theme;

function preload(){
    theme = loadSound('assets/Hanazuki - Full.flac');
}

let maxWS;
let minWS;
let startTime;
let fft;

function setup() {
    let can = createCanvas(windowWidth,windowHeight);
    theme.play();
    amplitude = new p5.Amplitude();
    fft = new p5.FFT(0.8,32);
    textSize(32);
    fill(255);
    width > height ? maxWS = width : maxWS = height;
    width < height ? minWS = width : minWS = height;
    angleMode(DEGREES);
    startTime = new Date();
}

let stars = [];
let rColors = ['#f60633','#f5c51f','#f2f624','#ddf62d','#4bcb95','#91e0d7','#75ceee','#7954bc','#f098e4'];
function draw() {
    let time = new Date() - startTime;
    background(0);
    text(time, 10, 30);
    let level = amplitude.getLevel();
    let size = map(level, 0, 1, 0, height*5);
    if (time < 5200){
        ellipse(width/2, height/2, size);
    } else if (time < 18500){
        noStroke();
        if (stars.length == 0){
            for (let i = 0; i< 300 ; i++){
                stars.push([random(0, width*4), random(0, height*4), random(2,5)]);
            }
        }
        for (let i = 0; i< stars.length ; i++){
            ellipse(stars[i][0]-map(time,5000,7000,0,minWS*2),stars[i][1]-map(time,5000,7000,0,minWS*2),stars[i][2]);
        }
        ellipse(width/2, height/2, map(time, 5200, 10000, height/1.5, height/5));
        if (time > 8000){
            for(let i = 0 ; i < ~~(time/10) - 800; i++){
                if (i > 50) break;
                push();
                translate(0,height/2);
                for (let j = 0; j<9;j++){
                    fill(rColors[j]);
                    ellipse(map(i,0,50,0,width),(cos(map(i,0,50,0,90))*height/2)+30*j,map(level,0,0.3,10,30));
                }
                translate(width,0);
                rotate(180);
                for (let j = 0; j<9;j++){
                    fill(rColors[j]);
                    ellipse(map(i,0,50,0,width),(cos(map(i,0,50,0,90))*height/2)+30*j,map(level,0,0.3,10,30));
                }
                pop();
            }
        }
        if (time > 9000){
            strokeWeight(30);
            for(let i = 0 ; i < ~~(time/10) - 900; i++){
                if (i > 50) break;
                push();
                translate(0,height/2);
                for (let j = 0; j<9;j++){
                    fill(rColors[j]);
                    ellipse(map(i,0,50,0,width),(sin(map(i,0,50,0,90))*height/2)+30*j,map(level,0,0.3,10,30));
                }
                translate(width,0);
                rotate(180);
                for (let j = 0; j<9;j++){
                    fill(rColors[j]);
                    ellipse(map(i,0,50,0,width),(sin(map(i,0,50,0,90))*height/2)+30*j,map(level,0,0.3,10,30));
                }
                pop();
            }
        }
        if (time > 10000){
            var spectrum = fft.analyze();
            push();
            translate(width/2,height/2);
            for (let i = 0; i< spectrum.length; i++){
                let l = map(spectrum[i], 0, 255, 0, minWS/2);
                stroke(255);
                if (time > 14000)
                    stroke(rColors[i%9])
                strokeWeight(map(level,0,1,2,500));
                line(0,0,l*cos(map(i, 0, spectrum.length, 0, 360*3)),l*sin(map(i, 0, spectrum.length, 0, 360*3)))
            }
            pop();
        }
    }
    if (time > 17000){
        push();
        translate(width/2,height/2);
        strokeWeight(3);
        for(let i = 0 ; i < time - 17000; i++){
            if (i > 1000) break;
            stroke(rColors[i%9])
            line(0,0,cos(map(i,0,1000,0,360))*maxWS,sin(map(i,0,1000,0,360))*maxWS);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    width > height ? maxWS = width : height;
    width < height ? minWS = width : height;
}
