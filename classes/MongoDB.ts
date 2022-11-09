import { Project } from '../models/project';
import { ProjectType } from '../types';

export class MongoDB {

  constructor(){
    this.all_projects();
  }

  public async saveDB({ name,
    description,
    repo,
    imgUrl,
    tag,
    deploy,
    hashTags }: ProjectType) {
    const save_project = await new Project({
      name,
      description,
      repo,
      imgUrl,
      tag,
      deploy,
      hashTags
    });
    await save_project.save();
  }

  public async updateDB(id: string, project: Object) {
    await Project.findByIdAndUpdate(id,project);
  }

  public async deleteDB(id: string) {
   await Project.findByIdAndDelete(id);
  }

  public async all_projects(){
    const projects = await Project.find({});
    return projects;
  }

  public async projectID(id: string) {
    const project = Project.findById(id);
    return project;
  }
}