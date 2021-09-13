'use strict'

const Project = use('App/Models/Project');

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
}

module.exports = ProjectController
