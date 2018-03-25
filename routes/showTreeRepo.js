module.exports = (middleware) => {
    const helper = require('../helper');

    return async (req, res, next) => {
        const path = req.path;

        const {currentGitRepo, repo, branch, branches} = middleware;

        const tree = await currentGitRepo.getTree(path);

        tree.forEach(t => {
            const fileOrTree = t.isFile ? 'file' : 'tree';
            const fileOrFolder = t.isFile ? 'file.png' : 'folder.png';

            t['path'] = helper.join(repo, branch, fileOrTree, path.slice(1), t.name);
            t['img'] = helper.join('/img', fileOrFolder);
        });

        const pathBack = path === '/' ? '' : helper.join(repo, branch, 'tree', helper.cutOffPath(path.slice(1)));

        res.render('tree_repo.hbs', {
            repo,
            branch,
            branches,
            path,
            pathBack,
            tree,
        });
    }
};
