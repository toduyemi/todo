import { Task } from "./tasksObject";
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

    get id() {
        return this._id;
    }

    get tasks() {
        return this._tasks.slice();
    }

    set tasks(value) {

        //ensure input is a truthy object that is not an array

        if (value instanceof Task) {
            this._tasks.push(value);
        }
    }
}

