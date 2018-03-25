module.exports = (app) => {
    const GitRepo = require('../models/gitRepo');
    const { paths } = require('../config');

    const gitRepos = paths.reduce((obj, path) => {
        const gitRepo = new GitRepo(path);

        obj[gitRepo.getNameRepo()] = gitRepo;
        return obj;
    }, {});

    const middleware = {};

    const showListRepos = require('./showListRepos')(gitRepos);
    const getRepo = require('./getRepo')(middleware, gitRepos);
    const getBranch = require('./getBranch')(middleware);
    const showTreeRepo = require('./showTreeRepo')(middleware);
    const showFileRepo = require('./showFileRepo')(middleware);
    const showCommits = require('./showCommits')(middleware);
    const showNotFound = require('./showNotFound');

    app.get('/', showListRepos);
    app.use('/:repo', getRepo);
    app.use('/:repo/:branch', getBranch);
    app.use('/:repo/:branch/tree', showTreeRepo);
    app.use('/:repo/:branch/file', showFileRepo);
    app.use('/:repo/:branch/commits', showCommits);
    app.use(showNotFound);
};
