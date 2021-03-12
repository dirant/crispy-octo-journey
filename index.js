const simpleGit = require('simple-git');
const git = simpleGit();

const fs = require('fs');
const uuid = require('uuid');

const testCommit = (ts) => new Promise((res) => {
	fs.writeFileSync('./test.txt', uuid.v4());
	git.add(['./test.txt']).commit('Comment', {'--date': new Date(ts).toISOString()}, res);
	console.log(new Date(ts).toISOString());
});

(async () => {
	for (let i = 0; i < 365*10-65; i++) {
		await testCommit(Date.now() - Math.floor(Math.random() * 365 + 1) * 24*60*60e3)
	}
})();