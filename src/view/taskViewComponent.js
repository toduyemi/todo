import trash from '../icons/trash-svgrepo-com.svg'
import threeDots from '../icons/dots-3-horizontal-svgrepo-com.svg';

export class TaskView {

    constructor(task) {
        this._task = task;
        this.deleteIcon = new Image();
        this.deleteIcon.src = trash;

        this.editIcon = new Image();
        this.editIcon.src = threeDots;

        this.renderTask();
        this.attachTaskIcons();
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
                <li class="task-delete"></li>
                <li class="task-edit"></li>
            </ul>
            <div class="task-description">
                <p>${this._task.description ? this._description : ""}</p>
            </div>
        </li>`;

        taskList.innerHTML += taskTemplate;
        document.querySelector(`[data-task-id="${this._task.id}"] .task-title`).textContent = this._task.title;

    }

    attachTaskIcons() {
        document.querySelector(`[data-task-id="${this._task.id}"] .task-delete`).append(this.deleteIcon);
        document.querySelector(`[data-task-id="${this._task.id}"] .task-edit`).append(this.editIcon);
    }


}