import { TaskView } from './taskViewComponent';

export class ProjectView {
    constructor(project) {
        this._project = project;
        this.renderProjectContents();
    }

    renderProjectContents() {
        this._project.map(task => {
            new TaskView(task);
        })
    }

}