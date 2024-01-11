import { id } from 'date-fns/locale';
import { ProjectView, projectView } from './projectViewComponent';
import { Listener } from '../helper/parent-class';
import Menu from '../icons/menu-hamburger-nav-svgrepo-com.svg'
import Check from '../icons/done-all-svgrepo-com.svg'
import Trash from '../icons/trash-svgrepo-com.svg';


export class AppView extends Listener {
    constructor() {
        super();
        this.body = document.body;


        // task form elements

        this.taskForm = this.createElement('form', 'add-task-form');
        this.createInput({
            key: 'taskTitleInput',
            name: 'title',
            type: 'text',
            placeholder: 'Task Title',
            className: 'task-title',
            required: 1
        });
        this.taskTitleInput.maxLength = '100';
        this.taskTitleLabel = this.createElement('label', 'form-label', 'Title:');
        this.taskTitleLabel.append(this.taskTitleInput);

        this.descriptionText = this.createElement('textarea', 'description-input');
        this.descriptionText.setAttribute('placeholder', 'Description...');
        this.descriptionText.setAttribute('name', 'description');
        this.descriptionLabel = this.createElement('label', 'form-label', 'Description:');
        this.descriptionLabel.append(this.descriptionText);

        this.createInput({
            key: 'taskDueDateInput',
            name: 'due-date',
            type: 'date',
            className: 'task-date',
            required: 1,
        });

        this.taskDateLabel = this.createElement('label', 'form-label', 'Due Date:');
        this.taskDateLabel.append(this.taskDueDateInput);

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
        this.priorityHighLabel = this.createElement('label', 'radio-label', '!!!');
        this.priorityHighDiv = this.createElement('div', 'radio-ctr');

        this.createInput({
            key: 'priorityMed',
            name: 'priority',
            type: 'radio',
            className: 'task-priority',
            id: 'med-priority',
            value: 2

        });
        this.priorityMedLabel = this.createElement('label', 'radio-label', '!!');
        this.priorityMedDiv = this.createElement('div', 'radio-ctr');

        this.createInput({
            key: 'priorityLow',
            name: 'priority',
            type: 'radio',
            className: 'task-priority',
            id: 'low-priority',
            value: 1
        });
        this.priorityLowLabel = this.createElement('label', 'radio-label', '!');
        this.priorityLowDiv = this.createElement('div', 'radio-ctr');

        this.submitTaskBtn = this.createElement('button', 'task-btn', 'Submit');
        this.cancelTaskBtn = this.createElement('button', 'task-btn', 'Cancel');

        // project form elements
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

        this.projectBtnCtr = this.createElement('div', 'project-btn-ctr');
        this.taskBtnCtr = this.createElement('div', 'task-btn-ctr');
        this.addButton = this.createElement('button', 'add-btn', 'Add');
        this.cancelButton = this.createElement('button', 'cancel-btn', 'Cancel');

        this.sideNavCollapse = false;
        this.createApp();
        this.bindEvents();

    }

    bindEvents() {
        this.addProjectBtn.addEventListener('click', this._buildProjectForm.bind(this));
        this.addTaskBtn.addEventListener('click', this._buildAddTaskForm.bind(this));
        this.tasksUl.addEventListener('click', e => this._buildEditProjectForm(e));
        this.tasksUl.addEventListener('click', e => this._expandTask(e));
        this.appMenuIcon.addEventListener('click', () => {
            this.sideNavCollapse ? this._openNav() : this._closeNav();
            this.sideNavCollapse = !this.sideNavCollapse;
        });
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
        // header
        this.appMenuIcon = new Image();
        this.appMenuIcon.src = Menu;

        this.appCheckIcon = new Image();
        this.appCheckIcon.src = Check;

        this.appTitle = this.createElement('h1', '', 'get \'er done');
        this.appTitleCtr = this.createElement('div', 'title-ctr');
        this.appTitleCtr.append(this.appTitle, this.appCheckIcon,)

        this.appHeader = this.createElement('header');

        this.appHeader.append(this.appMenuIcon, this.appTitleCtr);

        // sideNav
        this.sideNav = this.createElement('nav');
        this.projectsDiv = this.createElement('div', '', '<h2>Projects</h2>');
        this.projectsUl = this.createElement('ul', 'project-list');
        this.homeUl = this.createElement('ul');
        this.inboxLi = this.createElement('li', '', '<h3 id="inbox">Inbox</h2>')
        this.homeDiv = this.createElement('div', 'home-div', '<h2>Home</h2>');
        this.addTaskBtn = this.createElement('button', 'app-btn', 'Add Task');
        this.homeUl.append(this.inboxLi);
        this.homeDiv.append(this.homeUl);
        this.projectsDiv.append(this.projectsUl);
        this.sideNav.append(this.homeDiv, this.projectsDiv, this.addProjectBtn);

        this.projectBtnCtr.append(this.addButton, this.cancelButton)
        this.projectForm.append(this.projectTitleInput, this.projectBtnCtr);

        // app or tasks
        this.appCtr = this.createElement('div', 'app-ctr');
        this.displayHeader = this.createElement('h2', 'project-title', 'Inbox')
        this.tasksUl = this.createElement('ul', 'task-list');
        this.appCtr.append(this.displayHeader, this.tasksUl, this.addTaskBtn)

        // task
        this.priorityHighDiv.append(this.priorityHigh, this.priorityHighLabel);
        this.priorityMedDiv.append(this.priorityMed, this.priorityMedLabel);
        this.priorityLowDiv.append(this.priorityLow, this.priorityLowLabel);

        this.priorityFieldset.append(this.priorityLegend, this.priorityLowDiv, this.priorityMedDiv, this.priorityHighDiv);

        this.taskDiv = this.createElement('div', 'form-div');
        this.taskBtnCtr.append(this.submitTaskBtn, this.cancelTaskBtn);
        this.taskDiv.append(this.priorityFieldset, this.taskBtnCtr);
        this.taskForm.append(this.taskTitleLabel, this.descriptionLabel, this.taskDateLabel, this.taskDiv);

        this.body.append(this.appHeader, this.sideNav, this.appCtr);
    }

    _buildAddTaskForm() {
        this.taskForm.className = 'add-task-form';
        this.taskDueDateInput.valueAsDate = new Date();
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

        if (e.target.parentElement.className === 'task-edit' && !document.querySelector('.edit-task-form')) {
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

    _expandTask(e) {

        if (e.target.matches('.task-title') || e.target.matches('.task-deadline')) {
            ;
            e.target.closest('.task-ctr').nextElementSibling.classList.toggle('task-description-open');
        }
    }




    bindAddProjectForm(handler) {
        if (document.querySelector('.add-project-form')) {
            // add reference to anonymous arrow function so i can remove event Listener
            this.projectForm.addEventListener('submit', this.projectForm.binder = e => {
                e.preventDefault();

                if (this.projectTitleInput.value) {
                    handler({ title: this.projectTitleInput.value });

                    // clean up successful submit
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

    bindEditProjectTitle(handler) {
        this.displayHeader.addEventListener('input', () => {
            const newTitle = this.displayHeader.textContent;
            handler(newTitle);
            this.raiseChange();
        })
    }

    bindDeleteProject(handler) {
        this.projectsUl.addEventListener('click', e => {
            if (e.target.className == 'project-delete') {
                const projectId = e.target.closest('.project-list-item').id;
                handler(projectId);
                this.raiseChange();
            }
        })
    }

    bindEditTaskForm(handler, handler2) {

        if (document.querySelector('.edit-task-form')) {

            this.taskForm.addEventListener('submit', this.taskForm.binder = e => {
                e.preventDefault();
                const {taskId} = e.target.closest('.task-ctr').dataset;
                handler(new FormData(this.taskForm), taskId);
                this._removeTaskForm();

            });

            this.cancelTaskBtn.addEventListener('click', this.taskForm.cancel = e => {
                e.preventDefault();
                this._removeTaskForm();
            })
            // store id to retrieve info of task of interest 
            // having this shoved in here is givingme very spaghetti vibes, id like to implement somethign a bit more clean
            handler2(this.taskForm.closest('.task-ctr').dataset.taskId);
        }
    };




    bindNavList(handler) {
        // only run if a project has been added
        // stores data-index
        this.homeUl.addEventListener('click', e => {
            handler(e.target);
        })

        this.projectsUl.addEventListener('click', e => {
            if (document.querySelector('.project-list li')) {
                handler(e.target);
            }
        })

    }


    prefillEditTaskForm(task) {
        if (document.querySelector('.edit-task-form')) {
            this.taskForm.title.value = task.title;
            this.taskForm.description.value = task.description;
            
            this.taskForm['due-date'].value = task.dueDate;
            document.querySelector(`fieldset [value="${task.priority}"]`).checked = true;
        }
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

    bindDeleteTaskItem(handler) {
        this.tasksUl.addEventListener('click', e => {
            if (e.target.parentElement.className === 'task-delete') {
                const id = e.target.closest('.task-ctr').dataset.taskId;
                handler(id);
                this.raiseChange();
            }

        })
    }

    // bindOpenTaskDescription() {
    //     console.log(document.querySelector('.task-ctr'));
    //     if (document.querySelector('.task-ctr')) {
    //         document.querySelectorAll('.task-ctr').addEventListener('click', this._expandTask)
    //     }
    // }
    bindTaskToggle(handler) {
        this.tasksUl.addEventListener('click', e => {
            if (e.target.parentElement.className === 'task-check') {
                const id = e.target.closest('.task-ctr').dataset.taskId
                handler(id);
            }
        })
    }



    // listener function
    displayProjectList(projectsList) {

        while (this.projectsUl.firstChild) {
            this.projectsUl.textContent = '';
        }

        // show a default message
        if (projectsList.length === 0) {
            const def = this.createElement('li');
            def.innerHTML = '<p>No projects! Add new project!</p>';
            this.projectsUl.append(def);
        }

        // create project list item nodes
        else {
            ;
            projectsList.map(project => {
                const projectLi = this.createElement('li', 'project-list-item');
                projectLi.id = project.id;

                const spanTitle = this.createElement('span', 'project-title-span editable');
                // spanTitle.contentEditable = true;
                spanTitle.textContent = project.title;

                const deleteProjectIcon = new Image();
                deleteProjectIcon.src = Trash;
                deleteProjectIcon.className = 'project-delete'

                // because event targetting was seeing span for handleObserveProjectState
                spanTitle.id = project.id

                projectLi.append(spanTitle, deleteProjectIcon);

                this.projectsUl.append(projectLi);

            });
        }
    }


    // listener function
    displayTaskList(taskList, projectTitle) {
        // to prevent this function from replacing the edit-form while listener functions are being called to bind edit-form
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
            // display title of page
            if (projectTitle !== 'Inbox') {
                this.displayHeader.contentEditable = true;
            }

            else {
                this.displayHeader.contentEditable = false;
            }
            this.displayHeader.textContent = projectTitle;
        }
    }


    _openNav() {
        this.sideNav.classList.remove('close-nav');
        this.body.classList.remove('close-nav-body');
        this.appCtr.classList.remove('close-nav-app-ctr');
    }

    _closeNav() {
        this.sideNav.classList.add('close-nav');
        this.body.classList.add('close-nav-body');
        this.appCtr.classList.add('close-nav-app-ctr');
    }


}