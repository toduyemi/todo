import { Project } from "./projectsObject";
import { Task } from "./tasksObject";

export class Model {
    constructor() {
        this.listeners = [];
    }

    addListeners(listener) {
        this.listeners.push(listener)
    }

    triggerListener(listener) {

    }
}


// create an object of all appData with methods to CRUD data structure
export class UserDataModel {
    constructor(params) {
        this._tasks = [];
        this._projects = [];
    }

    //TASK CRUD METHODS

    get tasksList() {
        // let allTasks = this.projects.map(project => project.slice());
        return this._tasks.slice();
    }

    getTask(taskId) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (taskId == this.tasks[i].id) {
                return this.tasks[i];
            }
        }

    }

    addTask(taskObject, projectState) {
        if (!taskObject instanceof FormData) {
            throw new Error('401 - Not a task object');
        }

        else {
            let newTask = new Task(taskObject);
            newTask.id = this._tasks.length;
            this._tasks.push(newTask);
            console.log(this._tasks)
            console.log('200');


            //logic to push to project array as well 
            if (projectState) {
                for (let i = 0; i < this._projects.length; i++) {
                    if (projectState === this._projects[i].id) {
                        this._projects[i].tasks = newTask;
                        console.log(this._projects[i]);
                    }
                }
            }
        }
    }


    editTask(taskId, taskUpdate) {
        //find task in array


        for (let i = 0; i < this.tasks.length; i++) {
            if (taskId == this.tasks[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this.tasks[i] = taskUpdate;
            }
        }

    }
    deleteTask(taskId) {
        //find task in array
        for (let i = 0; i < this.tasks.length; i++) {
            if (taskId == this.tasks[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this.tasks.splice(i, 1);
            }
        }
    }

    //use listeners for models
    setTaskIds() {
        this._tasks.forEach(task => {
            task.setId();
        });
    }

    //PROJECT CRUD METHODS

    get projectsList() {
        return this._projects.slice();
    }

    getProject(projectState) {
        console.log(projectState)
        for (let i = 0; i < this._projects.length; i++) {
            if (projectState == this._projects[i].id) {
                return this._projects[i].tasks.slice();
            }
        }
    }

    addProject(projectObject) {

        if (!projectObject instanceof Object) {
            throw new Error('401 - Not a project project');
        }

        else {
            this._projects.push(new Project({ title: projectObject.title, id: this._projects.length }));

            console.log(this._projects)
            console.log('200');
        }

    }
    editProject(projectId, projectUpdate) {
        for (let i = 0; i < this.projects.length; i++) {
            if (projectId == this.project[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this.project[i] = projectUpdate;
            }

        }

    }
    deleteProject() {

    }
    setProjectIds() {

    }

}