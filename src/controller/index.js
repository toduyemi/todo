import { baseAppHtml, AppView } from '../view/baseView.js';
import { UserDataModel } from "../model/model.js";

import '../../style.css';

// const startApp = new AppView;
// baseAppHtml.init();


function addProjectHandler(projectObject) {
    let projectTitle = baseAppHtml.projectForm.value;
    console.log(projectTitle);
}

class AppController {
    constructor(/*AppView, AppModel*/) {
        this.appView = new AppView();
        this.appModel = new UserDataModel();

        //add DOM event listeners to bind event listener to project form
        this.appView.addChangeListener(() => this.appView.bindAddProjectForm(this.handleAddProject.bind(this)));

        //refresh list sidenav project list
        this.appView.addChangeListener(() => this.newProjectDomTrigger(this.appModel.projectsList));

        //display initial project list
        this.newProjectDomTrigger(this.appModel.projectsList);
    }

    //trigger for things going to DOM
    newProjectDomTrigger(projectsList) {
        this.appView.displayProjectList(projectsList);
    }

    //handle for things incoming from DOM
    handleAddProject(projectTitle) {
        console.log(projectTitle)
        this.appModel.addProject(projectTitle)
    }
    _observeProjectState() {
        //everytime a project is clicked store its index number from data index
    }
}

const startApp = new AppController(/* new AppView, new UserDataModel */);