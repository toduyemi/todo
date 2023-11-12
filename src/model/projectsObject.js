import Model from './model.js';
export default class Project extends Model {
    constructor(project) {
        super();
        this.title = project.title;
        this.tasks = [];
    }

    get title() {
        return this.title;
    }

    set title(value) {
        this.title = value;
    }

    get tasks() {
        return this.tasks.slice();
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

