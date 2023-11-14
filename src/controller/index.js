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

        //add DOM event listener
        this.appView.addChangeListener(() => this.appView.bindAddProjectForm(this.handleAddProject.bind(this)));
    }

    handleAddProject(projectTitle) {
        console.log(projectTitle)
        this.appModel.addProject(projectTitle)
    }
}

const startApp = new AppController(/* new AppView, new UserDataModel */);