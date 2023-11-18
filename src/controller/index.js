import { baseAppHtml, AppView } from '../view/baseView.js';
import { UserDataModel } from "../model/model.js";

import '../../style.css';



class AppController {
    constructor(/*AppView, AppModel*/) {
        this.appView = new AppView();
        this.appModel = new UserDataModel();
        this.currentProjectIndex = null;

        //add DOM event listeners to bind event listener to forms
        this.appView.addChangeListener(() => this.appView.bindAddProjectForm(this.handleAddProject.bind(this)));
        this.appView.addChangeListener(() => this.appView.bindAddTaskForm(this.handleAddTask.bind(this)));

        //refresh list sidenav project list
        this.appView.addChangeListener(() => this.newProjectDomTrigger(this.appModel.projectsList));

        //get current id clicked on
        this.appView.bindProjectList(this.handleObserveProjectState.bind(this));

        //display initial project list
        this.newProjectDomTrigger(this.appModel.projectsList);
    }

    //'trigger' for things going to DOM

    newProjectDomTrigger(projectsList) {
        this.appView.displayProjectList(projectsList);
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

        this.currentProjectIndex = target.id;
        console.log(this.currentProjectIndex);
    }
}

const startApp = new AppController(/* new AppView, new UserDataModel */);