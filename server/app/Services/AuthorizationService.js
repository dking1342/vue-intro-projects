
class AuthorizationService {
    verifyPermission(resource,user,response) {
        if(!resource) {
            return response.status(404).json({
                error: 'the resource did not exist'
            })
        }
        if(resource.user_id !== user.id) {
            return response.status(403).json({
                error: 'invalid access to resource'
            }) 
        }
    }
}

module.exports = new AuthorizationService();