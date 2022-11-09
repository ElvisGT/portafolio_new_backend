
export default class MongoDB {
  private projects: any[];
  private static _instace:MongoDB;

  private constructor(){
    this.projects = [];
  }

  private static get instance(){
    return this._instace ? this._instace : this._instace = new MongoDB();
  }

  public static saveDB(project: Object){

  }

  public static updateDB(id: string,project: Object){
    const projectIndex = this.instance.projects.findIndex(item => item.id === id);

    if(projectIndex !== -1 ){
      this.instance.projects[projectIndex] = project;
    }
  }

  public static deleteDB(id: string){
    const projectIndex = this.instance.projects.findIndex(item => item.id === id);

    if(projectIndex !== -1 ){
      this.instance.projects.splice(projectIndex,1);
    }
  }

  public static get all_projects(){
    return this.instance.projects;
  }
}