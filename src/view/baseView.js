
import { addProjectController } from '../controller/index';
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
        this.appTitle.textContent = 'get \'er done';
        this.body.append(this.appHeader, this.sideNav, this.appCtr);

        //sideNav
        this.homeDiv.innerHTML = `
        <h2>Home</h2>
        `;

        this.projectsDiv.innerHTML = `
        <h2>Projects</h2>
        `;

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

export class UserView {
    constructor() {
        this.body = document.body;
        this.appHeader = this.createElement('header');
        this.appTitle = this.createElement('h1');
        this.sideNavSvgCtr = this.createElement('div');
        this.sideNav = this.createElement('nav');
        this.appCtr = this.createElement('div');
        this.projectsDiv = this.createElement('div');
        this.projectsUl = this.createElement('ul');
        this.homeUl = this.createElement('ul');
        this.homeDiv = this.createElement('div');
        this.addTaskBtn = this.createElement('button');
        this.addProjectBtn = this.createElement('button', 'nav-btn', 'Add Project');
        this.displayHeader = this.createElement('h1');
        this.projectForm = this.createElement('form');
        this.createInput({
            key: 'projectTitleInput',
            type: 'text',
            placeholder: 'Project Title',
            name: 'project-title'
        });
        this.addButton = document.createElement('button', 'project-btn', 'Add');
        this.cancelButton = document.createElement('button', 'project-btn', 'Add Task');
        this.tempHtmlInit();

    }

    tempHtmlInit() {
        this.projectForm.append(this.projectTitleInput, this.addButton, this.cancelButton);
        this.body.append(this.addProjectBtn)
    }

    createInput({ key, type, placeholder }) {
        this[key] = this.createElement('input');
        this[key].type = type;
        this[key].placeholder = placeholder;
    }

    createElement(tag, className, childHTML) {
        const element = document.createElement(tag);

        if (className) element.classList.add(className);

        if (childHTML) element.innerHTML = childHTML;
        return element;
    }

    buildProjectForm() {
        this.projectsUl.appendChild(this.projectFormLi);
        this.addProjectBtn.remove();

    }

    buildProjectForm() {
        this.projectsUl.appendChild(this.projectFormLi);
        this.addProjectBtn.remove();

    }
}