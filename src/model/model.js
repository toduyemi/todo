import { Project } from "./projectsObject";
import { Task } from "./tasksObject";
import { Listener } from '../helper/parent-class';



// create an object of all appData with methods to CRUD data structure
export class UserDataModel extends Listener {
    constructor() {
        super();
        this._tasks = [];
        this._projects = [];
    }

    //TASK CRUD METHODS

    get tasksList() {
        // let allTasks = this.projects.map(project => project.slice());
        return this._tasks.slice();
    }

    getTask(taskId) {
        for (let i = 0; i < this._tasks.length; i++) {
            if (taskId == this._tasks[i].id) {
                return this._tasks[i];
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
            this.raiseChange();

            //logic to push to project array as well 
            if (!Number.isNaN(projectState)) {
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
        for (let i = 0; i < this._tasks.length; i++) {
            if (taskId == this._tasks[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this._tasks.splice(i, 1);
            }
        }
        this.raiseChange();
    }

    //use listeners for models
    setTaskIds() {
        this._tasks.forEach(task => {
            task.id = this._tasks.indexOf(task)
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