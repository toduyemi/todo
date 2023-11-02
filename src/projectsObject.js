export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    get title() {
        return this.title;
    }

    set title(value) {
        this.title = value;
    }

    get tasks() {
        return this.tasks;
    }

    set tasks(value) {

        //ensure input is a truthy object that is not an array
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            this.tasks.push(value);
        }

        if (value && value instanceof Task && !Array.isArray(value)) {
            this.tasks.push(value);
        }
    }
}

