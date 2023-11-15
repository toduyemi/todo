import { baseAppHtml, AppView } from '../view/baseView.js';
import { UserDataModel } from "../model/model.js";
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

    newProjectDomTrigger(projectsList) {
        this.appView.displayProjectList(projectsList);
    }

    handleAddProject(projectTitle) {
        console.log(projectTitle)
        this.appModel.addProject(projectTitle)
    }
}

const startApp = new AppController(/* new AppView, new UserDataModel */);