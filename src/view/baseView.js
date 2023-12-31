import { ProjectView, projectView } from './projectViewComponent';
import { Listener } from '../helper/parent-class';
import Menu from '../icons/menu-hamburger-nav-svgrepo-com.svg'
import Check from '../icons/done-all-svgrepo-com.svg'


export class AppView extends Listener {
    constructor() {
        super();
        this.body = document.body;


        this.sideNavSvgCtr = this.createElement('div');




        this.displayHeader = this.createElement('h1');


        //task form elements

        this.taskForm = this.createElement('form', 'add-task-form');
        this.createInput({
            key: 'taskTitleInput',
            name: 'title',
            type: 'text',
            placeholder: 'Task Title',
            className: 'task-title',
            required: 1
        });
        this.descriptionText = this.createElement('textarea', 'description-input');
        this.descriptionText.setAttribute('placeholder', 'Description...');
        this.descriptionText.setAttribute('name', 'description')

        this.createInput({
            key: 'taskDueDateInput',
            name: 'due-date',
            type: 'date',
            placeholder: 'Task Title',
            className: 'task-date',
            required: 1
        });

        this.priorityFieldset = this.createElement('fieldset');
        this.priorityLegend = this.createElement('legend', 'priority-legend', 'Priority:');
        this.createInput({
            key: 'priorityHigh',
            name: 'priority',
            type: 'radio',
            className: 'task-priority',
            id: 'high-priority',
            required: 1,
            value: 3
        });

        this.createInput({
            key: 'priorityMed',
            name: 'priority',
            type: 'radio',
            className: 'task-priority',
            id: 'med-priority',
            value: 2

        });
        this.createInput({
            key: 'priorityLow',
            name: 'priority',
            type: 'radio',
            className: 'task-priority',
            id: 'low-priority',
            value: 1
        });

        this.submitTaskBtn = this.createElement('button', 'task-btn', 'Add');
        this.cancelTaskBtn = this.createElement('button', 'task-btn', 'Cancel');

        //project form elements
        this.addProjectBtn = this.createElement('button', 'nav-btn', 'Add Project');
        this.projectForm = this.createElement('form', 'add-project-form');
        this.createInput({
            key: 'projectTitleInput',
            type: 'text',
            placeholder: 'Project Title',
            className: 'project-title',
            name: 'title',
            required: 1

        });
        this.projectTitleInput.required = true;
        this.addButton = this.createElement('button', 'project-btn', 'Add');
        this.cancelButton = this.createElement('button', 'project-btn', 'Cancel');

        this.createApp();

        this.tempHtmlInit();
        // this.addChangeListener(this.bindAddProjectForm.bind(this));

        this.bindEvents();

    }

    bindEvents() {
        this.addProjectBtn.addEventListener('click', this._buildProjectForm.bind(this));
        this.addTaskBtn.addEventListener('click', this._buildAddTaskForm.bind(this));
        this.tasksUl.addEventListener('click', (e) => this._buildEditProjectForm(e));

    }

    tempHtmlInit() {



        this.appCtr.append(this.tasksUl, this.addTaskBtn)

        //task
        this.priorityFieldset.append(this.priorityLegend, this.priorityLow, this.priorityMed, this.priorityHigh);
        this.taskForm.append(this.taskTitleInput, this.descriptionText, this.taskDueDateInput, this.priorityFieldset, this.submitTaskBtn, this.cancelTaskBtn);



    }

    createInput({ key, type, placeholder, className, id, required, name, value }) {
        this[key] = this.createElement('input');
        this[key].type = type;
        this[key].className = className;
        this[key].name = name;
        this[key].placeholder = placeholder;
        if (value) this[key].value = value;
        if (id) this[key].id = id;
        if (required) this[key].required = true;
    }

    createElement(tag, className, childHTML) {
        const element = document.createElement(tag);

        if (className) element.className = className;

        if (childHTML) element.innerHTML = childHTML;
        return element;
    }

    createApp() {
        //header
        this.appMenuIcon = new Image();
        this.appMenuIcon.src = Menu;

        this.appCheckIcon = new Image();
        this.appCheckIcon.src = Check;

        this.appTitle = this.createElement('h1', '', 'get \'er done');
        this.appTitleCtr = this.createElement('div', 'title-ctr');
        this.appTitleCtr.append(this.appCheckIcon, this.appTitle)

        this.appHeader = this.createElement('header');

        this.appHeader.append(this.appMenuIcon, this.appTitleCtr);

        //sideNav
        this.sideNav = this.createElement('nav');
        this.projectsDiv = this.createElement('div', '', '<h2>Projects</h2>');
        this.projectsUl = this.createElement('ul', 'project-list');
        this.homeUl = this.createElement('ul');
        this.inboxLi = this.createElement('li', '', '<h3 id="inbox">Inbox</h2>')
        this.homeDiv = this.createElement('div', '', '<h2>Home</h2>');
        this.addTaskBtn = this.createElement('button', 'app-btn', 'Add Task');
        this.homeUl.append(this.inboxLi);
        this.homeDiv.append(this.homeUl);
        this.projectsDiv.append(this.projectsUl);
        this.sideNav.append(this.homeDiv, this.projectsDiv, this.addProjectBtn);
        this.projectForm.append(this.projectTitleInput, this.addButton, this.cancelButton);

        //app or tasks
        this.appCtr = this.createElement('div', 'app-ctr');
        this.tasksUl = this.createElement('ul', 'task-list');


        this.body.append(this.appHeader, this.sideNav, this.appCtr);
    }

    _buildAddTaskForm() {
        this.taskForm.className = 'add-task-form';
        this.appCtr.append(this.taskForm);
        this.addTaskBtn.remove();
        this.raiseChange();

    }

    _buildProjectForm() {
        this.addProjectBtn.remove();
        this.sideNav.appendChild(this.projectForm);
        this.raiseChange();
    }

    _buildEditProjectForm(e) {

        if (e.target.parentElement.className === 'task-edit') {
            this.taskForm.className = 'edit-task-form';
            e.target.closest('.task-ctr').replaceChildren(this.taskForm);
            this.raiseChange();
        }

    }

    _removeProjectForm() {
        this.projectForm.reset();
        this.projectForm.removeEventListener('submit', this.projectForm.binder);
        this.cancelButton.removeEventListener('click', this.projectForm.cancel);
        // this.projectTitleInput.value = "";
        this.projectForm.remove();
        this.sideNav.appendChild(this.addProjectBtn);
        this.raiseChange();

        // this.projectsUl.removeChild(this.projectFormLi);
        // this.sideNav.appendChild(this.addProjectBtn);
    }

    _removeTaskForm() {
        this.taskForm.reset();
        this.taskForm.removeEventListener('submit', this.taskForm.binder);
        this.cancelTaskBtn.removeEventListener('click', this.taskForm.cancel);
        this.taskForm.remove();
        this.appCtr.append(this.addTaskBtn);
        this.raiseChange();

    }

    bindAddTaskForm(handler) {
        if (document.querySelector('.add-task-form')) {

            this.taskForm.addEventListener('submit', this.taskForm.binder = e => {
                e.preventDefault();

                handler(new FormData(this.taskForm));
                this._removeTaskForm();

            });

            this.cancelTaskBtn.addEventListener('click', this.taskForm.cancel = e => {
                e.preventDefault();
                this._removeTaskForm();
            })
        }
    }



    bindAddProjectForm(handler) {
        if (document.querySelector('.add-project-form')) {
            //add reference to anonymous arrow function so i can remove event Listener
            this.projectForm.addEventListener('submit', this.projectForm.binder = e => {
                e.preventDefault();

                if (this.projectTitleInput.value) {
                    handler({ title: this.projectTitleInput.value });

                    //clean up successful submit
                    this._removeProjectForm();
                }

                else {
                    throw new Error("Title field input required!")
                }
            });

            this.cancelButton.addEventListener('click', this.projectForm.cancel = e => {
                e.preventDefault();
                this._removeProjectForm();
            });
        }
    }

    bindEditTaskForm(handler) {
        if (document.querySelector('.edit-task-form')) {

            this.taskForm.addEventListener('submit', this.taskForm.binder = e => {
                e.preventDefault();
                let taskId = e.target.closest('.task-ctr').dataset.taskId;
                handler(new FormData(this.taskForm), taskId);
                this._removeTaskForm();

            });

            this.cancelTaskBtn.addEventListener('click', this.taskForm.cancel = e => {
                e.preventDefault();
                this._removeTaskForm();
            })
        }
    };



    bindNavList(handler) {
        //only run if a project has been added

        this.homeUl.addEventListener('click', e => {
            //either stores data-index or outputs array; trigger and handle
            handler(e.target);
        })

        this.projectsUl.addEventListener('click', e => {
            //either stores data-index or outputs array; trigger and handle
            if (document.querySelector('.project-list li')) {
                handler(e.target);
            }
        })

    }

    bindDeleteTaskItem(handler) {
        this.tasksUl.addEventListener('click', e => {
            if (e.target.parentElement.className === 'task-delete') {
                const id = e.target.closest('.task-ctr').dataset.taskId;
                handler(id);
                this.raiseChange();
            }

        })
    }


    //listener function
    displayProjectList(projectsList) {

        while (this.projectsUl.firstChild) {
            this.projectsUl.textContent = '';
        }

        //show a default message
        if (projectsList.length === 0) {
            const def = this.createElement('p');
            def.textContent = 'No projects! Add new project!';
            this.projectsUl.append(def);
        }

        //create project list item nodes
        else {
            console.log(projectsList);
            projectsList.map(project => {
                const projectLi = this.createElement('li', 'project-list-item');
                projectLi.id = project.id;

                const spanTitle = this.createElement('span', 'project-title-span editable');
                // spanTitle.contentEditable = true;
                spanTitle.textContent = project.title;

                //because event targetting was seeing span for handleObserveProjectState
                spanTitle.id = project.id

                projectLi.append(spanTitle);

                this.projectsUl.append(projectLi);

            });
        }
    }


    //listener function
    displayTaskList(taskList) {
        //to prevent this function from replacing the edit-form while listener functions are being called to bind edit-form
        if (!document.querySelector('.edit-task-form')) {
            while (this.tasksUl.firstChild) {
                this.tasksUl.textContent = '';
            }

            if (taskList.length === 0) {
                const def = this.createElement('p');
                def.textContent = 'No tasks! Add new task!';
                this.tasksUl.append(def);
            }

            else {
                new ProjectView(taskList);
            }
        }
    }


}


class ToDo {
    constructor(params) {

    }
}
