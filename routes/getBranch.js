module.exports = (middleware) => {
    return async (req, res, next) => {
        const branch = req.params.branch;
        const {currentGitRepo} = middleware;

        const branches = await currentGitRepo.getBranches();
        const currentBranch = await currentGitRepo.getCurrentBranch();

        if (branch !== currentBranch) {
            await currentGitRepo.switchBranch(branch);
        }

        middleware.branch = branch;
        middleware.branches = branches.map(b => {
            return {
                name: b,
                active: b === branch,
            }
        });

        next();
    }
};
