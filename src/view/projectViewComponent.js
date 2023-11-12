import TaskView from './taskViewComponent';

class ProjectView {
    constructor(project) {
        this._project = project;
    }

    render() {
        this._project.map(task => {
            let taskItem = new TaskView(task);
            taskItem.renderTask();

        })
    }
}