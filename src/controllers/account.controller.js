const accountController = {
    get: (request, response, next) => {
        const {update} = request.params;
        
        if (update) return response.render('account', {update: true, message: null});
        response.render('account', {update: false, message: null});
    }
}

module.exports = accountController;