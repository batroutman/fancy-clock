// NOTE: This class depends on ClockComponent and ClockNumber

// class for Fancy Clock
function FancyClock(targetId) {

    // properties
    this.id = targetId;
    this.table = document.createElement("table");
    this.hour = -1;
    this.minute = -1;
    this.numbers = [];
    this.numbersEl = [];
    this.layout = "inline";
    this.loopInterval;
    this.duration = 7000;


    // methods
    this.refreshTable = function() {

        this.table.innerHTML = "";
        if (this.layout == "inline") {
            var row = document.createElement("tr");
            for(var i = 0; i < this.numbersEl.length; i++) {
                row.appendChild(this.numbersEl[i]);
            }
            this.table.appendChild(row);
        } else {
            // (stacked)
            for(var row = 0; row < 2; row++) {
                var rowEl = document.createElement("tr");
                for(var col = 0; col < 2; col++) {
                    rowEl.apppendChild(this.numbersEl[row + col]);
                }
                this.table.appendChild(rowEl);
            }
        }

    }

    this.start = function() {

        var self = this;

        this.loopInterval = setInterval(function(){

            var date = new Date();
            var h = (date.getHours() % 12);
            h = (h == 0) ? 12 : h;
            var m = date.getMinutes();

            if (self.hour != h || self.minute != m) {
                self.hour = h;
                self.minute = m;
                self.transitionTime();
            }

        }, 1000);

    }

    this.transitionTime = function() {

        // calculate each digit
        var digits = [];
        digits.push(Math.floor(this.hour / 10));
        digits.push(this.hour % 10);
        digits.push(Math.floor(this.minute / 10));
        digits.push(this.minute % 10);

        // transition each number
        // for(var i = 0; i < 4; i++) {
        //     var self = this;
        //     this.numbers[i].scrambleTransition(this.duration / 4);
        // }

        for(var i = 0; i < 4; i++) {
            this.numbers[i].transitionToNumber(digits[i], this.duration);
        }

    }

    // initialization
    this.init = function() {

        // initialize table data elements
        for(var i = 0; i < 4; i++) {
            var td = document.createElement("td");
            td.setAttribute("id", this.id + "-num-" + i);
            this.numbersEl.push(td);
        }

        // setup table
        this.refreshTable();
        document.getElementById(this.id).appendChild(this.table);

        // generate numbers
        for(var i = 0; i < 4; i++) {
            this.numbers.push(new ClockNumber(this.id + "-num-" + i));
            this.numbers[i].scramble();
        }

        // start loop
        this.start();

    }

    this.init();

    return this;

}