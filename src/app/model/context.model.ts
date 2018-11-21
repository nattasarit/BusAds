export class ContextModel {
    commandList: Array<any>;

    public getMinX() {
        let min_x = this.commandList[0]['x'];
        this.commandList.forEach(commandSet => {
            if (commandSet['x']) {
                if (commandSet['x'] < min_x) {
                    min_x = commandSet['x'];
                }
            }
        });
        return min_x;
    }

    public getMinY() {
        let min_y = this.commandList[0]['y'];
        this.commandList.forEach(commandSet => {
            if (commandSet['y']) {
                if (commandSet['y'] < min_y) {
                    min_y = commandSet['y'];
                }
            }
        });
        return min_y;
    }

    public getMaxX() {
        let max_x = 0;
        this.commandList.forEach(commandSet => {
            if (commandSet['x']) {
                if (commandSet['x'] > max_x) {
                    max_x = commandSet['x'];
                }
            }
        });
        return max_x;
    }

    public getMaxY() {
        let max_y = 0;
        this.commandList.forEach(commandSet => {
            if (commandSet['y']) {
                if (commandSet['y'] > max_y) {
                    max_y = commandSet['y'];
                }
            }
        });
        return max_y;
    }
}

