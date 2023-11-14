
export class Project {
    constructor(project) {
        // super();
        this._title = project.title;
        this._id = project.id;
        this._tasks = [];
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get tasks() {
        return this._tasks.slice();
    }

    set tasks(value) {

        //ensure input is a truthy object that is not an array
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            this._tasks.push(value);
        }

        if (value && value instanceof Task && !Array.isArray(value)) {
            this._tasks.push(value);
        }
    }
}

