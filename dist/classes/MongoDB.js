"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongoDB {
    constructor() {
        this.projects = [];
    }
    static get instance() {
        return this._instace ? this._instace : this._instace = new MongoDB();
    }
    static saveDB(project) {
        this.instance.projects.push(project);
    }
    static updateDB(id, project) {
        const projectIndex = this.instance.projects.findIndex(item => item.id === id);
        if (projectIndex !== -1) {
            this.instance.projects[projectIndex] = project;
        }
    }
    static deleteDB(id) {
        const projectIndex = this.instance.projects.findIndex(item => item.id === id);
        if (projectIndex !== -1) {
            this.instance.projects.splice(projectIndex, 1);
        }
    }
    static get all_projects() {
        return this.instance.projects;
    }
}
exports.default = MongoDB;
