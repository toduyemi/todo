import TaskView from './taskViewComponent';

class ProjectView {
    constructor(project, projects) {
        this._project = project;
        this._projects = [];
    }

    set projects(value) {

    }

    renderProjectContents() {
        this._project.map(task => {
            let taskItem = new TaskView(task);
            taskItem.renderTask();

        })
    }

    renderProjectListItem(project) {
        const projectLi =

    }
}