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

		const octokit = new Octokit(token ? { auth: token } : null);

        const release = await octokit.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
            owner,
            repo,
            tag
        });

        const release_id = release.data.id;

        const assets = await octokit.request('GET /repos/{owner}/{repo}/releases/{release_id}/assets', {
            owner,
            repo,
            release_id
        });

        const asset = assets.data.find(asset => {
            return asset.name === filename;
        });

        const asset_id = asset.id;

		// Why is axios used here? https://github.com/octokit/rest.js/issues/967
        const binary = await axios.get(`https://api.github.com/repos/${owner}/${repo}/releases/assets/${asset_id}`, {
            headers: {
                Authorization: `Basic ${Buffer.from(token ? token : '').toString('base64')}`,
                Accept: "application/octet-stream"
            }
        });

        core.setOutput('content', binary.data);

		fs.writeFile(output ? output : filename, binary.data);
	} catch (error) {
		core.setFailed(error.message);
	}
}
