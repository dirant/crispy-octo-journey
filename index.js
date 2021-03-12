const fs = require('fs');
const uuid = require('uuid');

const simpleGit = require('simple-git');
const git = simpleGit();

/**
 * Generate a commit at timestamp `ts`
*/
const doCommit = async (ts) => {
	fs.writeFileSync('./test.txt', uuid.v4());
	await git.add(['./test.txt']).commit('Comment', {'--date': new Date(ts).toISOString()});
};

/**
 * Here's a cookie
*/
const attaboy = () => {
	const rand = Math.random();
	console.log(
		rand <= 1/3 ? "You get a commit!"
		: rand <= 2/3 ? "And YOU get a commit!"
		: "Everybody gets a commit!"
	);
}

(async () => {
	for (let i = 0; i < 365*10; i++) { // Do 10 contributions a day for one year, on average
		await doCommit(Date.now() - Math.floor(Math.random() * 365 + 1) * 24*60*60e3) // Pick any moment in the last year, even while you were sleeping
		attaboy(); // that was like, a tough second! Well deserved!
	}
	await git.push(); // And now become the guy she tells her bf not to worry about
})();
