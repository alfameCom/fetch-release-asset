const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/core');
const fs = require('fs');

async function run() {
	try {
		const owner = core.getInput('owner');
		const repo = core.getInput('repo');
		const tag = core.getInput('tag');
		const filename = core.getInput('filename');
		const token = core.getInput('token');
		const output = core.getInput('output');

		const oktokit = new Octokit(token ? { auth: token } : null);

		const release = await octokit.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
			owner,
			repo,
			tag
		});

		const asset = release.assets.find(asset => {
			return asset.name === filename;
		});

		const binary = await octokit.request('GET /repos/{owner}/{repo}/releases/{asset_id}', {
			owner,
			repo,
			asset_id: asset.id
		});

		core.setOutput('content', binary);

		console.log(binary);

		fs.writeFile(filename, binary);
	} catch (error) {
		core.setFailed(error.message);
	}
}
