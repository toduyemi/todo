import { baseAppHtml, AppView } from '../view/baseView.js';
import { UserDataModel } from "../model/model.js";

import '../../style.css';
import 'normalize.css/'



class AppController {
    constructor(/*AppView, AppModel*/) {
        this.appView = new AppView();
        this.appModel = new UserDataModel();
        this.currentProjectIndex = 'inbox';

        //add DOM event listeners to bind event listener to forms
        this.appView.addChangeListener(() => this.appView.bindAddProjectForm(this.handleAddProject.bind(this)));
        this.appView.addChangeListener(() => this.appView.bindAddTaskForm(this.handleAddTask.bind(this)));
        this.appView.addChangeListener(() => this.appView.bindEditTaskForm(this.handleEditTask.bind(this)));
        //refresh list sidenav project list
        this.appView.addChangeListener(() => this.appView.displayProjectList(this.appModel.projectsList));

        //refresh task list
        this.appView.addChangeListener(() => this.appView.displayTaskList(this.getTaskList()));

        this.appModel.addChangeListener(this.appModel.setTaskIds.bind(this.appModel));

        //get current id clicked on
        this.appView.bindNavList(this.handleObserveProjectState.bind(this));
        this.appView.bindDeleteTaskItem(this.handleDeleteTask.bind(this));

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
        this.appModel.addTask(taskData, +this.currentProjectIndex);
    }

    handleDeleteTask(id) {
        this.appModel.deleteTask(id);
    }

    handleEditTask(taskData, id) {
        this.appModel.editTask(taskData, id);
    }
    //everytime a project is clicked store its index number from data index
    handleObserveProjectState(target) {
        this.currentProjectIndex = target.id;
        this.appView.raiseChange();
    }

    getTaskList() {
        if (this.currentProjectIndex === 'inbox') return this.appModel.tasksList;

        else {
            return this.appModel.getProject(this.currentProjectIndex);
        }
    }
}

const startApp = new AppController(/* new AppView, new UserDataModel */);