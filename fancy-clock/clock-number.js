// NOTE: This class requires ClockComponent

// class for full clock numbers (made up of clock components)
function ClockNumber(targetId) {

    // properties
    this.id = targetId;
    this.clocks = [];
    this.table = document.createElement("table");
    this.positions = []; // 4-dimension array, (number, row, column, hour/minute)

    // methods
    this.changeNumber = function(number) {

        var config = this.positions[number];
        for(var row = 0; row < this.clocks.length; row++){
            for(var col = 0; col < this.clocks[row].length; col++){
                this.clocks[row][col].setPositions(config[row][col][0], config[row][col][1]);
            }
        }

    }

    this.transitionToNumber = function(number, duration) {
        var config = this.positions[number];
        for(var row = 0; row < this.clocks.length; row++){
            for(var col = 0; col < this.clocks[row].length; col++){
                this.clocks[row][col].transitionTo(config[row][col][0], config[row][col][1], duration);
            }
        }
    }

    this.scramble = function() {
        for(var row = 0; row < this.clocks.length; row++){
            for(var col = 0; col < this.clocks[row].length; col++){
                var hour = Math.floor(Math.random() * 360);
                var minute = Math.floor(Math.random() * 360);
                this.clocks[row][col].setPositions(hour, minute);
            }
        }
    }

    this.scrambleTransition = function(duration) {
        for(var row = 0; row < this.clocks.length; row++){
            for(var col = 0; col < this.clocks[row].length; col++){
                var hour = Math.floor(Math.random() * 360);
                var minute = Math.floor(Math.random() * 360);
                this.clocks[row][col].transitionTo(hour, minute, duration);
            }
        }
    }

    // initialization
    this.initPositions = function() {
        this.positions = new Array(10);

        this.positions[0] = [
            [[0,270],[0,180],[180,0],[180,270]],
            [[90,270],[270,0],[270,180],[90,270]],
            [[270,90],[270,90],[270,90],[270,90]],
            [[90,270],[90,270],[90,270],[90,270]],
            [[270,90],[90,0],[90,180],[270,90]],
            [[0,90],[0,180],[0,180],[180,90]]
        ];

        this.positions[1] = [
            [[270,0],[0,180],[270,180],[60,30]],
            [[0,90],[270,180],[270,90],[-30,-60]],
            [[120,150],[270,90],[270,90],[15,-15]],
            [[230,200],[90,270],[90,270],[120,150]],
            [[0,270],[90,180],[90,0],[180,270]],
            [[0,90],[0,180],[0,180],[180,90]]
        ];

        this.positions[2] = [
            [[0,270],[0,180],[180,0],[180,270]],
            [[0,90],[180,0],[270,180],[270,90]],
            [[0,270],[180,0],[90,180],[90,270]],
            [[270,90],[270,0],[0,180],[180,90]],
            [[90,270],[90,0],[0,180],[180,270]],
            [[0,90],[0,180],[180,0],[180,90]]
        ];

        this.positions[3] = [
            [[0,270],[0,180],[180,0],[180,270]],
            [[0,90],[180,0],[270,180],[270,90]],
            [[0,270],[180,0],[90,180],[90,270]],
            [[0,90],[180,0],[270,180],[270,90]],
            [[0,270],[180,0],[90,180],[90,270]],
            [[0,90],[0,180],[180,0],[180,90]]
        ];

        this.positions[4] = [
            [[0,270],[270,180],[270,0],[180,270]],
            [[270,90],[90,270],[90,270],[270,90]],
            [[90,270],[0,90],[180,90],[90,270]],
            [[0,90],[180,0],[270,180],[270,90]],
            [[240,210],[260,290],[90,270],[90,270]],
            [[150,120],[200,230],[0,90],[180,90]]
        ];

        this.positions[5] = [
            [[0,270],[0,180],[180,0],[180,270]],
            [[270,90],[270,0],[0,180],[180,90]],
            [[90,270],[90,0],[0,180],[180,270]],
            [[0,90],[180,0],[270,180],[270,90]],
            [[0,270],[180,0],[90,180],[90,270]],
            [[0,90],[0,180],[180,0],[180,90]]
        ];

        this.positions[6] = [
            [[0,270],[0,180],[180,0],[180,270]],
            [[270,90],[270,0],[0,180],[180,90]],
            [[90,270],[90,0],[0,180],[180,270]],
            [[270,90],[270,0],[270,180],[270,90]],
            [[90,270],[90,0],[90,180],[90,270]],
            [[0,90],[0,180],[180,0],[180,90]]
        ];

        this.positions[7] = [
            [[0,270],[0,180],[180,0],[180,270]],
            [[0,90],[180,0],[270,180],[90,270]],
            [[180,210],[140,170],[270,90],[270,90]],
            [[250,280],[100,130],[90,270],[90,270]],
            [[140,170],[220,250],[270,90],[270,90]],
            [[300,270],[170,200],[0,90],[180,90]]
        ];

        this.positions[8] = [
            [[0,270],[0,180],[180,0],[180,270]],
            [[90,270],[270,0],[270,180],[90,270]],
            [[90,315],[90,0],[90,180],[90,225]],
            [[270,45],[270,0],[270,180],[270,135]],
            [[270,90],[90,0],[90,180],[270,90]],
            [[0,90],[0,180],[0,180],[180,90]]
        ];

        this.positions[9] = [
            [[0,270],[0,180],[180,0],[180,270]],
            [[270,90],[270,0],[270,180],[90,270]],
            [[90,270],[90,0],[90,180],[270,90]],
            [[0,90],[180,0],[270,180],[90,270]],
            [[140,170],[220,250],[270,90],[270,90]],
            [[300,270],[170,200],[0,90],[180,90]]
        ];

    }

    this.init = function() {

        // initialize table and generate clocks
        for(var row = 0; row < 6; row++){
            //var rowClocks = [];
            var rowEl = document.createElement("tr");
            for(var col = 0; col < 4; col++){

                var colEl = document.createElement("td");
                colEl.setAttribute("id", this.id + "-table-td-" + row + "-" + col);
                rowEl.appendChild(colEl);

                //rowClocks.push(new ClockComponent(colEl.getAttribute("id")));

            }
            //this.clocks.push(rowClocks);
            this.table.appendChild(rowEl);
        }

        document.getElementById(this.id).appendChild(this.table);

        // generate clocks
        this.clocks = [];
        for(var row = 0; row < 6; row++){
            this.clocks.push([]);
            for(var col = 0; col < 4; col++){
                this.clocks[row].push(new ClockComponent(this.id + "-table-td-" + row + "-" + col));
            }
        }

        // initialize position presets for different numbers
        this.initPositions();
    }

    this.init();

    return this;

}