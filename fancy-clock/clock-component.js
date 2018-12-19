// class for clock components (little individual analog-style clocks)
function ClockComponent(targetId) {

    // useful constants
    var CLOCKWISE = 0;
    var COUNTER_CLOCKWISE = 1;

    // properties
    this.canvas = undefined;
    this.id = targetId;
    this.radius = 50;
    this.canvasHeight = 100;
    this.canvasWidth = 100;
    this.canvasBackgroundColor = "#eee"
    this.clockBackgroundColor = "white";
    this.ringColor = "black";
    this.ringWeight = 5;
    this.hourColor = "black";
    this.minuteColor = "black";
    this.hourDirection = CLOCKWISE;
    this.minuteDirection = COUNTER_CLOCKWISE;
    this.hourPosition = 0;
    this.minutePosition = 90;
    this.hourWeight = 5;
    this.minuteWeight = 5;

    // methods
    this.drawClock = function(){
        var ctx = this.canvas.getContext("2d");

        // clear
        ctx.fillStyle = this.canvasBackgroundColor;
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // draw ring
        ctx.lineWidth = this.ringWeight;
        ctx.beginPath();
        ctx.arc(this.canvasWidth / 2, this.canvasHeight / 2, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.ringColor;
        ctx.stroke();

        // draw hour hand
        
    }

    this.resetHeightWidth = function() {
        this.canvasHeight = 2 * this.radius + 2 * this.ringWeight;
        this.canvasWidth = 2 * this.radius + 2 * this.ringWeight;
    }

    // intitialization
    this.init = function() {
        this.canvas = document.createElement("canvas");

        this.resetHeightWidth();
        this.canvas.setAttribute("height", this.canvasHeight);
        this.canvas.setAttribute("width", this.canvasWidth);

        this.drawClock();

        document.getElementById(this.id).appendChild(this.canvas);
    }

    this.init();

    return this;

}

var clock = new ClockComponent("clock");

console.log("hello there");