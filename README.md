# fetch-release-asset

This action fetches an asset binary from a specified release.

## Inputs

### `owner`

**Required** The owner of the repository of the release.

### `repo`

**Required** The repository of the release.

### `tag`

The tag of the release.

### `filename`

**Required** Filename of the release asset.

### `token`

Personal access token for fetching from private repository. Create one [here](https://github.com/settings/tokens/new?scopes=repo).

### `output`

Output filename for fetched asset. Defaults to the original name.

## Outputs

### `content`

Contents of the fetched asset.

## Example usage

```yaml
uses: alfameCom/fetch-release-asset@1.0.0
with:
  owner: "alfameCom"
  repo: "a-private-repository"
  tag: "0.0.1"
  filename: "manifest.yml"
  token: ${{ secrets.REPO_TOKEN }}
  output: "downloaded_manifest.yml"
```
