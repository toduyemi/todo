import userData from './model.js';
import Model from './model.js'
export default class Task extends Model {

    /* valid values for prioties; 
    0 => No Deadline/urgency;
    1 => Needs to be done but not urgent;
    2 => Urgent and deadline imminent */

    priorities = [0, 1, 2];
    /**
     * 
     * @param {string} title 
     * @param {string} description 
     * @param {Date} dueDate 
     * @param {Date} currentDate 
     * @param {string} priority 
     * @param {string} status 
     */
    constructor(title, description, dueDate, currentDate, priority) {
        super();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.datePosted = currentDate;
        this.priority = priority;
        this.status = false;
    }

    get title() {
        return this.title;
    }

    set title(value) {
        if (!value) {
            throw new Error('Title is required.');
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
        if (!value instanceof Date) {
            throw new Error('Date input invalid.')
        }
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
        if (priorities.includes(value)) {
            this.priority = value;
        }
    }

    get status() {
        return this.status;
    }

    toggleStatus() {
        this.status = !this.status;
    }

    setId() {
        this.id = userData.tasks.indexOf(this);
    }
}
