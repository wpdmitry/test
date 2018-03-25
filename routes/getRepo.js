module.exports = (middleware, gitRepos) => {
    return (req, res, next) => {
        const repo = req.params.repo;

        const currentGitRepo = gitRepos[repo];

        middleware['repo'] = repo;
        middleware['currentGitRepo'] = currentGitRepo;
        console.log(middleware);
        next();
    };
};
