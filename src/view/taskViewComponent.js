// import trashSvg from './src/icons/trash-svgrepo-com.svg'
// import dotSvg from './src/icons/dots-3-horizontal-svgrepo-com.svg';

export class TaskView {

    constructor(task) {
        this._task = task;
        this.renderTask();
    }


    renderTask() {
        let taskList = document.querySelector('.task-list');


        /* use innerhtml to create task object for readability; inject task title 
        from use via textContent to prevent malicious injection*/
        let taskTemplate = `
        <li>
            <ul class="task-ctr" data-task-id="${this._task.id}">
                <li class="task-check" ><input type="checkbox" name="check-toggle" id=""></li>
                <li class="task-title"></li>
                <li class="task-deadline">${this._task.dueDate}</li>
                <li class="task-delete">~delete image~</li>
                <li class="task-edit">~edit image~</li>
            </ul>
        </li>`;

        taskList.innerHTML += taskTemplate;
        document.querySelector(`[data-task-id="${this._task.id}"] .task-title`).textContent = this._task.title;

    }
}