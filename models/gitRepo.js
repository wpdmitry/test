const  process = require('child_process');
const helper = require('../helper');

class GitRepo {
    constructor(path) {
        this.path = path;
    }

    getNameRepo() {
        return this.path.split('/').slice(-1)[0];
    }

    async getBranches() {
        return await helper.readdir(`${this.path}/.git/refs/heads`);
    }

    async getCurrentBranch() {
        let allBranches = await this.gitCli('git branch', this.path);

        allBranches = allBranches.split('\n');

        for (let i = 0; i < allBranches.length; i++) {
            if (allBranches[i].indexOf('*') !== -1) {
                return allBranches[i].replace('* ', '').trim();
            }
        }
    }

    async switchBranch(branch) {
        return await this.gitCli(`git checkout ${branch}`);
    }

    async getTree(path) {
        const tree = (await helper.readdir(this.path + path))
            .filter(c => c !== '.git');

        const paths = tree
            .map(c => helper.isFile(this.path + (path === '/' ? path : path + '/') + c));

        const isFiles = await Promise.all(paths);

        return tree.map((c, i) => {
                return {
                    name: c,
                    isFile: isFiles[i],
                }
            })
    }

    async getReadFile(path) {
        const text = await helper.readFile(this.path + path);

        return {
            name: path.split('/').slice(-1),
            text: text.split('\n').slice(0, -1),
        };
    }

    async getCommits() {
        const commits = await this.gitCli('git log');

        return commits
            .match(/commit\s+(\w+)\sAuthor:\s+([^\n]*)\sDate:\s+([^\n]*)\s/g)
            .map(str => {
               const [commit, author, date] = str
                   .split('\n')
                   .map(s => {
                       const indexFirstSpace = s.indexOf(' ');
                       return s.slice(indexFirstSpace).trim();
                   });

               return {
                   commit,
                   shortCommit: commit.slice(0, 10),
                   author: author.split(' ', 2)[0],
                   date: helper.parseDate(date).toLocaleString(),
               };
            });
    }

    async gitCli(command) {
        return new Promise((resolve, reject) => {
            process.exec(command,  {cwd: this.path}, (err, stdout, stderr) => {
                if(err){
                    reject('exec error: ' + err);
                }

                if (stderr) {
                    resolve('exec stderr: ' + stderr);
                }

                resolve(stdout);
            });
        });
    }

    async isFile(path) {
        return await helper.isFile(this.path + path);
    }

    async readFile(path) {
        return await helper.readFile(this.path + path);
    }
}

module.exports = GitRepo;
