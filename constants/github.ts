import { GithubVersion } from "../interfaces/GitHubVersion";

export const getEmptyGithubVersion = (): GithubVersion => ({
    url:              '',
    assets_url:       '',
    upload_url:       '',
    html_url:         '',
    id:               0,
    author:           null,
    node_id:          '',
    tag_name:         '',
    target_commitish: '',
    name:             '',
    draft:            false,
    prerelease:       false,
    created_at:       new Date(),
    published_at:     new Date(),
    assets:           [],
    tarball_url:      '',
    zipball_url:      '',
    body:             ''
})