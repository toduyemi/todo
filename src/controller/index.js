import { baseAppHtml, AppView } from '../view/baseView.js';
const startApp = new AppView;
// baseAppHtml.init();


function addProjectHandler(projectObject) {
    let projectTitle = baseAppHtml.projectForm.value;
    console.log(projectTitle);
}