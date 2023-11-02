import userData from './model.js';
export default class Task {
    status = false;
    /**
     * 
     * @param {string} title 
     * @param {string} description 
     * @param {Date} dueDate 
     * @param {Date} currentDate 
     * @param {string} priority 
     * @param {string} status 
     */
    constructor(title, description, dueDate, currentDate, priority, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.datePosted = currentDate;
        this.priority = priority;
        this.status = status;
    }

    get title() {
        return this.title;
    }

    set title(value) {
        if (!value) {
            throw 'Title is required';
        }
        this.title = value;
    }

    get description() {
        return this.description;
    }

    set description(value) {
        this.description = value;
    }

    get dueDate() {
        return this.description;
    }

    set dueDate(value) {
        this.dueDate = value;
    }

    get datePosted() {
        return this.datePosted;
    }

    //read only should not be able to change
    // set datePosted(value) { 
    //     this.datePosted = value;
    // }
    get priority() {
        return this.priority;
    }

    set priority(value) {
        this.priority = value;
    }

    get status() {
        return this.status;
    }

    set status(value) {
        this.status = value;
    }

    setId() {
        this.id = userData.tasks.indexOf(this);
    }
}
