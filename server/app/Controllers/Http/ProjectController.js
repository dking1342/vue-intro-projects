'use strict'

const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService');

class ProjectController {
    async index({ auth }) {
        try {
            const user = await auth.getUser();
            return await user.projects().fetch();            
        } catch (error) {
            return { message: error.message }
        }
    }

    async create({auth,request}) {
        try {
            const user = await auth.getUser();
            const { title } = request.all();
            const project = new Project();
            project.fill({
                title,
            })
            await user.projects().save(project);
            return project;
        } catch (error) {
            return { message: error.message };
        }
    }

    async destroy({ auth, params, response }) {
        try {
            const user = await auth.getUser();
            const { id } = params;
            const project = await Project.find(id);
            AuthorizationService.verifyPermission(project,user,response);
            await project.delete();
            return project;

        } catch (error) {
            console.log(error)
            return { message: error.message }            
        }


    }
}

module.exports = ProjectController
