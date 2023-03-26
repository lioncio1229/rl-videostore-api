const oauthRouter = require('./api/auth/oauth.router.js');
const customerRouter = require('./api/admin/customers/customer.router.js');
const videoRouter = require('./api/admin/videos/video.router.js');
const userRentsRouter = require('./api/user/rents/rents.router.js');
const rentRequestsRouter = require('./api/admin/rent-requests/rentRequests.router.js');

module.exports = function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Video Store!');
    });
    
    app.use('/api/oauth', oauthRouter.router);
    app.use('/api/admin', customerRouter.router);
    app.use('/api/admin', videoRouter.router);
    app.use('/api/user', userRentsRouter.router);
    app.use('/api/admin', rentRequestsRouter.router);
}


