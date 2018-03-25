module.exports = (middleware) => {
    return  async(req, res, next) => {
        const { repo, branches, currentGitRepo } = middleware;

        const commits = await currentGitRepo.getCommits();

        res.render('commits.hbs', {
            repo,
            branches,
            commits,
        });
    }
};
