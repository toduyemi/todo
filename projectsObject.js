class Project {
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
        this.tasks.push(value);
    }
}