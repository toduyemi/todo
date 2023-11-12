import trashSvg from './src/icons/trash-svgrepo-com.svg'
import dotSvg from './src/icons/dots-3-horizontal-svgrepo-com.svg';

export class TaskView {

    constructor(task) {
        this._task = task;
    }


    renderTask(task) {
        let taskList = document.querySelector('.project');

        /* use innerhtml to create task object for readability; inject task title 
        from use via textContent to prevent malicious injection*/
        let taskTemplate = `
            <ul class="task-ctr" data-taskId="${this._task.id}">
                <li class="task-check" ><input type="checkbox" name="check-toggle" id=""></li>
                <li class="task-title"></li>
                <li class="task-deadline">${this._task.dueDate}</li>
                <li class="task-delete">${trashSvg}</li>
                <li class="task-edit">${dotSvg}</li>
            </ul >`;

        taskList.innerHTML = taskTemplate;
        document.querySelector('.task-title').textContent = this._task.title;

    }
}