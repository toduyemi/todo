
import { userData } from './model.js'
import Task from './tasksObject.js';
import Project from './projectsObject.js';


function createExample() {
    const sampleTask = new Task("");

}

const toDoApp = {

    addNewTaskHandler() {

        let NewTask = new Task(this.title, this.description, this.dueDate, new Date(), this.currentDate, this.priority, this.status);
        userData.addTask(NewTask);
    },

    addNewProjectHandler(title) {
        let NewProject = new Project(this.title)
        userData.addProject

    },

    //replace all info of selected object with input
    editTaskHandler() {

    },

}
