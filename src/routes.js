const oauthRouter = require('./api/auth/auth.router.js');
const customerRouter = require('./api/admin/customers/customer.router.js');
const adminVideoRouter = require('./api/admin/videos/video.router.js');
const userVideosRouter = require('./api/user/videos/videos.router.js');
const rentRequestsRouter = require('./api/admin/rent-requests/rentRequests.router.js');
const rentsUser = require('./api/user/rents/rents.router.js');
const rentsAdmin = require('./api/admin/rents/rents.router.js');

module.exports = function (app)
{
    app.get('/', (req, res) => {
        res.send('Welcome to Bogsy Video Store!');
    });
    
    app.use('/api/auth', oauthRouter.router);
    app.use('/api/admin', customerRouter.router);
    app.use('/api/admin', adminVideoRouter.router);
    app.use('/api/admin', rentRequestsRouter.router);
    app.use('/api/user', userVideosRouter.router);
    app.use('/api/user', rentsUser.router);
    app.use('/api/admin', rentsAdmin.router);
}


