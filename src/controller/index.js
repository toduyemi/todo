import { baseAppHtml, UserView } from '../view/baseView.js';
const startApp = new UserView;
// baseAppHtml.init();


export function addProjectController(projectObject) {
    let projectTitle = baseAppHtml.projectForm.value;
    console.log(projectTitle);
}