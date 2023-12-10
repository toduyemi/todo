
export class Task {

    /* valid values for prioties; 
    1 => No Deadline/urgency;
    2 => Needs to be done but not urgent;
    3 => Urgent and deadline imminent */


    /**
     * task argument is a FormData object
     * @param {string} title 
     * @param {string} description 
     * @param {Date} dueDate 
     * @param {Date} currentDate 
     * @param {string} priority 
     * @param {string} status 
     * @param {number} id
     */
    constructor(task) {
        // super();
        this.priorities = [1, 2, 3];
        //constructor from web form
        if (task instanceof FormData) {

            this._title = task.get('title');
            this._description = task.get('description');
            this._dueDate = task.get('due-date');
            this._datePosted = new Date();
            this._priority = +task.get('priority');
            this._status = false;
            this._id = crypto.randomUUID();
        }
        //constructor from local storage
        else {
            this._title = task._title;
            this._description = task._desscription;
            this._dueDate = task._dueDate;
            this._datePosted = task._datePosted;
            this._priority = task._priority;
            this._status = task._status;
            this._id = task._id;
        }
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if (!value) {
            throw new Error('Title is required.');
        }
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        if (!value instanceof Date) {
            throw new Error('Date input invalid.')
        }
        this._dueDate = value;
    }

    get datePosted() {
        return this._datePosted;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        if (this.priorities.includes(value)) {
            this._priority = value;
        }
    }

    get status() {
        return this._status;
    }
    get id() {
        return this._id;
    }

    toggleStatus() {
        this._status = !this._status;
        console.log(this._status);
    }


}
