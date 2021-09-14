'use strict'

const Task = use('App/Models/Task');
const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService');

class TaskController {
    async index({ auth, params, request, response }) {
        try {
            const user = await auth.getUser();
            const { id } = params;
            const project = await Project.find(id);
            AuthorizationService.verifyPermission(project,user,response);
            return await project.tasks().fetch();
        } catch (error) {
            return { error: error.message };
        }
    }
    async create({ auth, params, request, response }) {
        try {
            const user = await auth.getUser();
            const { description } = request.all();
            const { id } = params;
            const project = await Project.find(id);
            AuthorizationService.verifyPermission(project,user,response);
            const task = new Task();            
            task.fill({
                description,
            })
            await project.tasks().save(task);
            return task;
        } catch (error) {
            return { error: error.message };
        }
    }

}

module.exports = TaskController
