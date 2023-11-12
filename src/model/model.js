import Project from "./projectsObject";
import Task from "./tasksObject";

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
export const userData = {
    tasks: [],
    projects: [],

    //TASK CRUD METHODS

    getTasks() {
        // let allTasks = this.projects.map(project => project.slice());
        return this.tasks;
    },
    getTask(taskId) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (taskId == this.tasks[i].id) {
                return this.tasks[i];
            }
        }

    },
    addTask(taskObject) {
        if (!taskObject instanceof Task) {
            throw new Error('401 - Not a task object');
        }
        else {
            this.tasks.push(taskObject);
            console.log('200');
            //logic to push to project array as well 
        }
    },


    editTask(taskId, taskUpdate) {
        //find task in array


        for (let i = 0; i < this.tasks.length; i++) {
            if (taskId == this.tasks[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this.tasks[i] = taskUpdate;
            }
        }

    },
    deleteTask(taskId) {
        //find task in array
        for (let i = 0; i < this.tasks.length; i++) {
            if (taskId == this.tasks[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this.tasks.splice(i, 1);
            }
        }
    },

    setTaskIds() {
        this.tasks.forEach(task => {
            task.setId();
        });
    },

    //PROJECT CRUD METHODS

    getProjects() {
        return this.projects;
    },

    getProject(projectId) {
        for (let i = 0; i < this.projects.length; i++) {
            if (projectId == this.proj[i]) {
                return this.project[i];
            }
        }
    },
    addProject(projectObject) {

        if (!projectObject instanceof Project) {
            throw new Error('401 - Not a project project');
        }
        else {
            this.projects.push(projectObject);
            console.log('200');
        }

    },
    editProject(projectId, projectUpdate) {
        for (let i = 0; i < this.projects.length; i++) {
            if (projectId == this.project[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this.project[i] = projectUpdate;
            }

        }

    },
    deleteProject() {

    }

}