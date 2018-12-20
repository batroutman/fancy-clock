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
    this.canvasBackgroundColor = "white"
    this.clockBackgroundColor = "white";
    this.ringColor = "black";
    this.ringWeight = 5;
    this.hourColor = "black";
    this.minuteColor = "black";
    this.hourDirection = CLOCKWISE;
    this.minuteDirection = COUNTER_CLOCKWISE;
    this.hourPosition = 90;
    this.minutePosition = 0;
    this.hourWeight = 7;
    this.minuteWeight = 7;
    this.hourScale = 0.7;
    this.minuteScale = 0.9;
    this.frametime = 50; // (45 fps)

    // methods
    this.drawClock = function(){
        var ctx = this.canvas.getContext("2d");

        // clear
        ctx.fillStyle = this.canvasBackgroundColor;
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // draw ring
        this.drawRing();

        // draw hour hand
        this.drawHourHand();

        // draw minute hand
        this.drawMinuteHand();

    }

    this.drawRing = function() {
        var ctx = this.canvas.getContext("2d");
        ctx.lineWidth = this.ringWeight;
        ctx.beginPath();
        ctx.arc(this.canvasWidth / 2, this.canvasHeight / 2, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.ringColor;
        ctx.stroke();
    }

    this.drawHourHand = function() {
        var ctx = this.canvas.getContext("2d");
        ctx.lineWidth = this.hourWeight;
        ctx.beginPath();
        ctx.moveTo(this.canvasWidth / 2, this.canvasHeight / 2);
        var lineToX = this.hourScale * this.radius * Math.cos(this.degToRad(-this.hourPosition)) + this.canvasWidth / 2;
        var lineToY = this.hourScale * this.radius * Math.sin(this.degToRad(-this.hourPosition)) + this.canvasHeight / 2;
        ctx.lineTo(lineToX, lineToY);
        ctx.strokeStyle = this.hourColor;
        ctx.stroke();
    }

    this.drawMinuteHand = function() {
        var ctx = this.canvas.getContext("2d");
        ctx.lineWidth = this.minuteWidth;
        ctx.beginPath();
        ctx.moveTo(this.canvasWidth / 2, this.canvasHeight / 2);
        var lineToX = this.minuteScale * this.radius * Math.cos(this.degToRad(-this.minutePosition)) + this.canvasWidth / 2;
        var lineToY = this.minuteScale * this.radius * Math.sin(this.degToRad(-this.minutePosition)) + this.canvasHeight / 2;
        ctx.lineTo(lineToX, lineToY);
        ctx.strokeStyle = this.minuteColor;
        ctx.stroke();
    }

    this.degToRad = function(degrees) {
        return degrees * Math.PI / 180;
    }

    this.radToDeg = function(radians) {
        return radians * 180 / Math.PI;
    }

    this.setRadius = function(r) {
        this.radius = (r >= 5) ? r : 5;
        this.resetHeightWidth();
    }

    this.resetHeightWidth = function() {
        this.canvasHeight = 2 * this.radius + 2 * this.ringWeight;
        this.canvasWidth = 2 * this.radius + 2 * this.ringWeight;
    }

    this.setPositions = function(hour, minute) {
        this.hourPosition = hour;
        this.minutePosition = minute;
        this.drawClock();
    }

    this.mod = function(n, m) {
        return ((n % m) + m) % m;
    }

    this.setHourPosition = function(hour) {
        this.hourPosition = this.mod(hour, 360);
    }

    this.setMinutePosition = function(minute) {
        this.minutePosition = this.mod(minute, 360);
    }

    this.transitionTo = function(hour, minute, duration) {

        hour = this.mod(hour, 360);
        minute = this.mod(minute, 360);

        // change in hour
        if (this.hourDirection == COUNTER_CLOCKWISE) {
            var hourChange;
            if (hour < this.hourPosition) {
                hourChange = 360 - (this.hourPosition - hour);
            } else {
                hourChange = hour - this.hourPosition
            }
            var frameHourChange = hourChange * this.frametime / duration;
            this.setHourPosition(this.hourPosition + frameHourChange);
        } else {
            var hourChange;
            if (hour > this.hourPosition) {
                hourChange = 360 - (hour - this.hourPosition);
            } else {
                hourChange = this.hourPosition - hour;
            }
            var frameHourChange = hourChange * this.frametime / duration;
            this.setHourPosition(this.hourPosition - frameHourChange);
        }
        
        //change in minute
        if (this.minuteDirection == COUNTER_CLOCKWISE) {
            var minuteChange;
            if (minute < this.minutePosition) {
                minuteChange = 360 - (this.minutePosition - minute);
            } else {
                minuteChange = minute - this.minutePosition
            }
            var frameMinuteChange = minuteChange * this.frametime / duration;
            this.setMinutePosition(this.minutePosition + frameMinuteChange);
        } else {
            var minuteChange;
            if (minute > this.minutePosition) {
                minuteChange = 360 - (minute - this.minutePosition);
            } else {
                minuteChange = this.minutePosition - minute;
            }
            var frameMinuteChange = minuteChange * this.frametime / duration;
            this.setMinutePosition(this.minutePosition - frameMinuteChange);
        }

        // draw changes
        this.drawClock();

        //recursive call
        if (duration - this.frametime > this.frametime){

            var self = this;
            setTimeout(function(){
                self.transitionTo(hour, minute, duration - self.frametime);
            }, this.frametime);

        } else {
            this.setHourPosition(hour);
            this.setMinutePosition(minute);
            this.drawClock();
        }
        
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

/*
var clock = new ClockComponent("clock");

setTimeout(function(){
    clock.transitionTo(145, 98, 3000);
}, 1000);

console.log("hello there");
*/