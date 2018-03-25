const fs = require('fs');

const helper = {
  isFile(path) {
      return new Promise((resolve, reject) => {
          fs.stat(path, (err, stats) => {
              if (err) {
                  reject(err);
              }

              if (stats) {
                  resolve(stats.isFile());
              } else {
                  reject();
              }
          })
      });
  },

  readdir(path) {
      return new Promise((resolve, reject) => {
          fs.readdir(path, (err, data) => {
              if (err) {
                  reject(err);
              }

              resolve(data);
          });
      });
  },

  readFile(path) {
      return new Promise((resolve, reject) => {
          fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
              if (err) {
                  reject(err);
              }

              resolve(data);
          })
      })
  },

  join(...arrayStr) {
      return arrayStr
          .filter(str => !!str)
          .join('/');
  },

  cutOffPath(path) {
      return path.split('/').slice(0, -1).join('/');
  },

  parseDate(date) {
      const d = new Date(date);

      d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
      return new Date(d);
  }
};

module.exports = helper;
