import { AppView } from '../view/baseView.js';
import { UserDataModel } from "../model/model.js";
import 'normalize.css/'
import '../../style.css';


class AppController {
    constructor(/*AppView, AppModel*/) {
        this.appView = new AppView();
        this.appModel = new UserDataModel();
        this.currentProjectIndex = 'inbox';
        this.currentTaskIndex;

        //add DOM event listeners to bind event listener to components
        this.appView.addChangeListener(() => this.appView.bindAddProjectForm(this.handleAddProject.bind(this)));
        this.appView.addChangeListener(() => this.appView.bindAddTaskForm(this.handleAddTask.bind(this)));
        this.appView.addChangeListener(() => this.appView.bindEditTaskForm(this.handleEditTask.bind(this), this.handleObserveTaskState.bind(this)));
        this.appView.addChangeListener(() => this.appView.prefillEditTaskForm(this.handleGetTask(this.currentTaskIndex)));
        // this.appView.addChangeListener(() => this.appView.bindOpenTaskDescription.bind(this));
        //refresh list sidenav project list
        this.appView.addChangeListener(() => this.appView.displayProjectList(this.appModel.projectsList));

        //refresh task list
        this.appView.addChangeListener(() => this.appView.displayTaskList(this.getTaskListTrigger(), this.getPageTitleTrigger()));

        //get current id clicked on
        this.appView.bindNavList(this.handleObserveProjectState.bind(this));

        this.appView.bindDeleteTaskItem(this.handleDeleteTask.bind(this));
        this.appView.bindTaskToggle(this.handleTaskCheckToggle.bind(this));
        this.appView.bindEditProjectTitle(this.handleEditProject.bind(this));
        this.appView.bindDeleteProject(this.handleDeleteProject.bind(this));


        this.appModel.addChangeListener(this.appModel.commit.bind(this.appModel));
        //display initial app data
        this.appModel.raiseChange();
        this.appView.raiseChange();

    }

    //'trigger' for things going to DOM
    newProjectDomTrigger(projectsList) {
        this.appView.displayProjectList(projectsList);
    }

    getPageTitleTrigger() {
        if (this.currentProjectIndex === 'inbox') return 'Inbox';

        else {
            ;
            return this.appModel.getProject(this.currentProjectIndex)._title;
        }
    }

    getTaskListTrigger() {
        if (this.currentProjectIndex === 'inbox') return this.appModel.tasksList;

        else {
            return this.appModel.getProjectTasks(this.currentProjectIndex);
        }
    }

    //'handle' for things incoming from DOM

    handleAddProject(projectTitle) {
        console.log(projectTitle)
        this.appModel.addProject(projectTitle);
    }

    handleEditProject(projectTitle) {
        this.appModel.editProject(this.currentProjectIndex, projectTitle)
    }

    handleDeleteProject(projectId) {
        this.appModel.deleteProject(projectId);
    }
    handleGetTask(id) {
        return this.appModel.getTask(id);
    }
    handleAddTask(taskData) {
        this.appModel.addTask(taskData, this.currentProjectIndex);
    }

    handleDeleteTask(id) {
        this.appModel.deleteTask(id);
    }

    handleEditTask(taskData, id) {
        this.appModel.editTask(taskData, id);
    }

    //everytime a project is clicked store its index number from data index
    handleObserveProjectState(target) {
        this.currentProjectIndex = target.id;

        //to have page automatically revert to inbox after project is deleted
        //isNaN condition is to prevent valueof 0 from being caught in decision flow
        if (!this.currentProjectIndex) {
            this.currentProjectIndex = 'inbox'
        }
        this.appView.raiseChange();
    }

    handleObserveTaskState(id) {
        this.currentTaskIndex = id;
    }

    handleTaskCheckToggle(id) {
        this.appModel.toggleTaskStatus(id);
    }


}

const startApp = new AppController(/* new AppView, new UserDataModel */);