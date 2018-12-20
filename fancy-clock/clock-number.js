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