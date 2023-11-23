import { ProjectView, projectView } from './projectViewComponent';
import Menu from '../icons/menu-hamburger-nav-svgrepo-com.svg'
import Check from '../icons/done-all-svgrepo-com.svg'
export const baseAppHtml = {
    body: document.body,
    appHeader: document.createElement('header'),
    appTitle: document.createElement('h1'),
    sideNavSvgCtr: document.createElement('div'),
    sideNav: document.createElement('nav'),
    appCtr: document.createElement('div'),
    projectsDiv: document.createElement('div'),
    projectsUl: document.createElement('ul'),
    homeUl: document.createElement('ul'),
    homeDiv: document.createElement('div'),
    addTaskBtn: document.createElement('button'),
    addProjectBtn: document.createElement('button'),
    displayHeader: document.createElement('h1'),

    //project form html nodes
    projectFormLi: document.createElement('li'),
    projectTitleInput: document.createElement('input'),
    projectForm: document.createElement('form'),
    addButton: document.createElement('button'),
    cancelButton: document.createElement('button'),




    init() {
        this.buildBaseHtml();
        this.bindEvents();
    },

    buildBaseHtml() {

        //app header bar
        this.appHeader.innerHTML = `
          <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg fill="#000000" width="100px" height="100px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M50,12.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z"/><path d="M50,28H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z"/><path d="M50,43.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z"/></svg>
           

            <!--Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools-->
            <svg fill="#000000" width="100px" height="100px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g data-name="Layer 2">
                    <g data-name="done-all">
                        <rect width="24" height="24" opacity="0" />
                        <path d="M16.62 6.21a1 1 0 0 0-1.41.17l-7 9-3.43-4.18a1 1 0 1 0-1.56 1.25l4.17 5.18a1 1 0 0 0 .78.37 1 1 0 0 0 .83-.38l7.83-10a1 1 0 0 0-.21-1.41z" />
                        <path d="M21.62 6.21a1 1 0 0 0-1.41.17l-7 9-.61-.75-1.26 1.62 1.1 1.37a1 1 0 0 0 .78.37 1 1 0 0 0 .78-.38l7.83-10a1 1 0 0 0-.21-1.4z" />
                        <path d="M8.71 13.06L10 11.44l-.2-.24a1 1 0 0 0-1.43-.2 1 1 0 0 0-.15 1.41z" />
                    </g>
                </g>
            </svg>`

        this.appHeader.appendChild(this.appTitle);

        this.body.append(this.appHeader, this.sideNav, this.appCtr);

        //sideNav


        this.addProjectBtn.textContent = 'Add Project';


        this.addTaskBtn.textContent = 'Add Task';

        this.homeDiv.appendChild(this.homeUl);
        this.projectsDiv.appendChild(this.projectsUl);
        this.sideNav.append(this.homeDiv, this.projectsDiv, this.addProjectBtn);


        this.appCtr.append(this.displayHeader, this.addTaskBtn);



        //build task form but do not add to dom
        this.projectTitleInput.setAttribute('placeholder', 'Project Title');
        this.addButton.textContent = 'Add';
        this.cancelButton.textContent = 'Cancel';
        this.projectForm.append(this.projectTitleInput, this.addButton, this.cancelButton);
        this.projectFormLi.appendChild(this.projectForm);

    },

    bindEvents() {
        this.addProjectBtn.addEventListener('click', this.buildProjectForm.bind(this));
        this.projectForm.addEventListener('submit', this.submitAddProjectEvent.bind(this));
    },

    buildProjectForm() {
        this.projectsUl.appendChild(this.projectFormLi);
        this.addProjectBtn.remove();

    },

    submitAddProjectEvent(e) {
        e.preventDefault();
        addProjectController();
        this.projectsUl.removeChild(this.projectFormLi);
        this.sideNav.appendChild(this.addProjectBtn);
    }



}
/**
 * Base class for dom view 
 */
class View {
    /**
     * listeners will listen for dom changes such as project or 
     * task form and then bind event listeners
     */
    constructor() {
        this._listeners = [];
    }

    addChangeListener(handler) {
        this._listeners.push(handler);
    }

    raiseChange() {
        this._listeners.forEach(listener => listener());
    }
}

export class AppView extends View {
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
            className: 'task-title add-task-form',
            required: 1
        });
        this.descriptionText = this.createElement('textarea', 'description-input add-task-form');
        this.descriptionText.setAttribute('placeholder', 'Description...');
        this.descriptionText.setAttribute('name', 'description')

        this.createInput({
            key: 'taskDueDateInput',
            name: 'due-date',
            type: 'date',
            placeholder: 'Task Title',
            className: 'task-date add-task-form',
            required: 1
        });

        this.priorityFieldset = this.createElement('fieldset');
        this.priorityLegend = this.createElement('legend', 'priority-legend add-task-form', 'Priority:');
        this.createInput({
            key: 'priorityHigh',
            name: 'priority',
            type: 'radio',
            className: 'task-priority add-task-form',
            id: 'high-priority',
            required: 1,
            value: 3
        });

        this.createInput({
            key: 'priorityMed',
            name: 'priority',
            type: 'radio',
            className: 'task-priority add-task-form',
            id: 'med-priority',
            value: 2

        });
        this.createInput({
            key: 'priorityLow',
            name: 'priority',
            type: 'radio',
            className: 'task-priority add-task-form',
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
        this.addTaskBtn.addEventListener('click', this._buildAddTaskForm.bind(this))

    }

    tempHtmlInit() {

        this.projectForm.append(this.projectTitleInput, this.addButton, this.cancelButton);

        this.appCtr.append(this.tasksUl, this.addTaskBtn)

        //task
        this.priorityFieldset.append(this.priorityLegend, this.priorityLow, this.priorityMed, this.priorityHigh);
        this.taskForm.append(this.taskTitleInput, this.descriptionText, this.taskDueDateInput, this.priorityFieldset, this.submitTaskBtn, this.cancelTaskBtn);

        this.body.append(this.sideNav, this.appCtr);


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
        this.homeDiv = this.createElement('div', '', '<h2>Home</h2>');
        this.addTaskBtn = this.createElement('button', 'app-btn', 'Add Task');
        this.homeDiv.append(this.homeUl);
        this.projectsDiv.append(this.projectsUl);
        this.sideNav.append(this.homeDiv, this.projectsDiv, this.addTaskBtn);

        //app or tasks
        this.appCtr = this.createElement('div', 'app-ctr');
        this.tasksUl = this.createElement('ul', 'task-list');


        this.body.append(this.appHeader, this.sideNav);
    }

    _buildAddTaskForm() {
        this.appCtr.append(this.taskForm);
        this.addTaskBtn.remove();
        this.raiseChange();

    }

    _buildProjectForm() {
        this.addProjectBtn.remove();
        this.sideNav.appendChild(this.projectForm);
        this.raiseChange();
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

    bindProjectList(handler) {
        //only run if a project has been added

        this.projectsUl.addEventListener('click', e => {
            //either stores data-index or outputs array; trigger and handle
            if (document.querySelector('.project-list li')) {
                handler(e.target);
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

    displayTaskList(taskList) {
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


class ToDo {
    constructor(params) {

    }
}
