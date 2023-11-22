import { baseAppHtml, AppView } from '../view/baseView.js';
import { UserDataModel } from "../model/model.js";

import '../../style.css';
import 'normalize.css/'



class AppController {
    constructor(/*AppView, AppModel*/) {
        this.appView = new AppView();
        this.appModel = new UserDataModel();
        this.currentProjectIndex = null;

        //add DOM event listeners to bind event listener to forms
        this.appView.addChangeListener(() => this.appView.bindAddProjectForm(this.handleAddProject.bind(this)));
        this.appView.addChangeListener(() => this.appView.bindAddTaskForm(this.handleAddTask.bind(this)));

        //refresh list sidenav project list
        this.appView.addChangeListener(() => this.appView.displayProjectList(this.appModel.projectsList));

        //refresh task list
        this.appView.addChangeListener(() => this.appView.displayTaskList(this.getTaskList()));

        //get current id clicked on
        this.appView.bindProjectList(this.handleObserveProjectState.bind(this));

        //display initial app data
        this.appView.raiseChange();
    }

    //'trigger' for things going to DOM

    newProjectDomTrigger(projectsList) {
        this.appView.displayProjectList(projectsList);
    }

    newTaskTrigger(taskList) {

    }

    //'handle' for things incoming from DOM

    handleAddProject(projectTitle) {
        console.log(projectTitle)
        this.appModel.addProject(projectTitle);
    }

    handleAddTask(taskData) {
        console.log(taskData);
        this.appModel.addTask(taskData);
    }

    //everytime a project is clicked store its index number from data index
    handleObserveProjectState(target) {
        console.log(target.id)
        this.currentProjectIndex = target.id;
    }

    getTaskList() {
        if (!this.currentProjectIndex) return this.appModel.tasksList;

        else {
            return this.appModel.getProject();
        }
    }
}

const startApp = new AppController(/* new AppView, new UserDataModel */);