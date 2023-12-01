import { Project } from "./projectsObject";
import { Task } from "./tasksObject";
import { Listener } from '../helper/parent-class';



// create an object of all appData with methods to CRUD data structure
export class UserDataModel extends Listener {
    constructor() {
        super();
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this._tasks = tasks.map(task => new Task(task));
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        this._projects = projects.map(project => new Project(project));
    }

    //TASK CRUD METHODS
    commit() {
        localStorage.setItem('tasks', JSON.stringify(this._tasks));
        localStorage.setItem('projects', JSON.stringify(this._projects));
    }

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

            //logic to push to project array as well 
            if (!Number.isNaN(projectState)) {
                for (let i = 0; i < this._projects.length; i++) {
                    if (projectState === this._projects[i].id) {
                        this._projects[i].tasks = newTask;
                    }
                }
            }
            this.raiseChange();
        }
    }


    editTask(taskUpdate, taskId) {
        //find task in array
        for (let i = 0; i < this._tasks.length; i++) {
            if (taskId == this._tasks[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this._tasks[i].title = taskUpdate.get('title');
                this._tasks[i].description = taskUpdate.get('description');
                this._tasks[i].dueDate = taskUpdate.get('due-date');
                this._tasks[i].priority = +taskUpdate.get('priority');
            }
        }
        this.raiseChange();
    }
    deleteTask(taskId) {
        //find task in array
        for (let i = 0; i < this._tasks.length; i++) {
            if (taskId == this._tasks[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this._tasks.splice(i, 1);
            }
        }
        //find same task in relevant project
        for (let i = 0; i < this._projects.length; i++) {
            for (let j = 0; j < this._projects[i]._tasks.length; j++) {
                if (taskId == this._projects[i]._tasks[j].id) {
                    //replace that task info //task will lose id property etc, work out a different way
                    this._projects[i]._tasks.splice(j, 1);
                }
            }
        }
        this.raiseChange();
    }

    toggleTaskStatus(taskId) {
        for (let i = 0; i < this._tasks.length; i++) {
            if (taskId == this._tasks[i].id) {
                this._tasks[i].toggleStatus();
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

    getProjectTasks(projectState) {
        console.log(projectState)
        for (let i = 0; i < this._projects.length; i++) {
            if (projectState == this._projects[i].id) {
                return this._projects[i].tasks.slice();
            }
        }
    }

    getProject(projectState) {
        for (let i = 0; i < this._projects.length; i++) {
            if (projectState == this._projects[i].id) {
                return { ...this._projects[i] }
            }
        }
    }

    addProject(projectObject) {

        if (!projectObject instanceof Object) {
            throw new Error('401 - Not a project project');
        }

        else {
            this._projects.push(new Project({ title: projectObject.title, id: this._projects.length }));
        }
        this.raiseChange();
    }

    editProject(projectId, projectUpdate) {
        for (let i = 0; i < this._projects.length; i++) {
            if (projectId == this._projects[i].id) {
                //replace that task info //task will lose id property etc, work out a different way
                this._projects[i].title = projectUpdate;
            }
        }
        this.raiseChange();
    }

    deleteProject(projectId) {
        for (let i = 0; i < this._projects.length; i++) {
            if (projectId == this._projects[i].id) {
                this._projects.splice(i, 1);
            }
        }
        this.raiseChange();
    }

    setProjectIds() {
        this._projects.forEach(project => {
            project.id = this._projects.indexOf(project)
        });
    }



}