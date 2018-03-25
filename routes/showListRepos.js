module.exports = (gitRepos) => {
    return (req, res) => {
        res.render('list_repo.hbs', {listRepos: Object.keys(gitRepos)});
    };
};
