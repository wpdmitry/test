module.exports = (middleware) => {
    const helper = require('../helper');

    return async (req, res, next) => {
        const path = req.path;
        const {currentGitRepo, repo, branch, branches} = middleware;
        const pathBack = path === '/' ? '' : helper.join(repo, branch, 'tree', helper.cutOffPath(path.slice(1)));

        const content = await currentGitRepo.getReadFile(path);

        res.render('file_repo.hbs', {
            repo,
            branch,
            branches,
            path,
            pathBack,
            content,
        });
    }
};
