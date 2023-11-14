import { baseAppHtml, AppView } from '../view/baseView.js';
import { UserDataModel } from "../model/model.js";
// const startApp = new AppView;
// baseAppHtml.init();


function addProjectHandler(projectObject) {
    let projectTitle = baseAppHtml.projectForm.value;
    console.log(projectTitle);
}

class AppController {
    constructor(AppView, AppModel) {
        this.appView = AppView;
        this.appModel = AppModel;
    }

    handleAddProject({ projectTitle }) {
        this.appModel.addProject({ title: projectTitle })
    }
}

const startApp = new AppController(new AppView, new UserDataModel);