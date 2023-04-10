import { Context } from "@actions/github/lib/context";
/**
 * https://docs.github.com/en/actions/learn-github-actions/contexts
 * https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_review
 */
const context: Context = {
  payload: {
    action: "submitted",
    review: {
      id: 237895671,
      node_id: "MDE3OlB1bGxSZXF1ZXN0UmV2aWV3MjM3ODk1Njcx",
      user: {
        login: "Codertocat",
        id: 21031067,
        node_id: "MDQ6VXNlcjIxMDMxMDY3",
        avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/Codertocat",
        html_url: "https://github.com/Codertocat",
        followers_url: "https://api.github.com/users/Codertocat/followers",
        following_url:
          "https://api.github.com/users/Codertocat/following{/other_user}",
        gists_url: "https://api.github.com/users/Codertocat/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/Codertocat/subscriptions",
        organizations_url: "https://api.github.com/users/Codertocat/orgs",
        repos_url: "https://api.github.com/users/Codertocat/repos",
        events_url: "https://api.github.com/users/Codertocat/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/Codertocat/received_events",
        type: "User",
        site_admin: false,
      },
      body: null,
      commit_id: "ec26c3e57ca3a959ca5aad62de7213c562f8c821",
      submitted_at: "2019-05-15T15:20:38Z",
      state: "commented",
      html_url:
        "https://github.com/Codertocat/Hello-World/pull/2#pullrequestreview-237895671",
      pull_request_url:
        "https://api.github.com/repos/Codertocat/Hello-World/pulls/2",
      author_association: "OWNER",
      _links: {
        html: {
          href: "https://github.com/Codertocat/Hello-World/pull/2#pullrequestreview-237895671",
        },
        pull_request: {
          href: "https://api.github.com/repos/Codertocat/Hello-World/pulls/2",
        },
      },
    },
    pull_request: {
      draft: false,
      url: "https://api.github.com/repos/Codertocat/Hello-World/pulls/2",
      id: 279147437,
      node_id: "MDExOlB1bGxSZXF1ZXN0Mjc5MTQ3NDM3",
      html_url: "https://github.com/Codertocat/Hello-World/pull/2",
      diff_url: "https://github.com/Codertocat/Hello-World/pull/2.diff",
      patch_url: "https://github.com/Codertocat/Hello-World/pull/2.patch",
      issue_url: "https://api.github.com/repos/Codertocat/Hello-World/issues/2",
      number: 2,
      state: "open",
      locked: false,
      title: "Update the README with new information.",
      user: {
        login: "Codertocat",
        id: 21031067,
        node_id: "MDQ6VXNlcjIxMDMxMDY3",
        avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/Codertocat",
        html_url: "https://github.com/Codertocat",
        followers_url: "https://api.github.com/users/Codertocat/followers",
        following_url:
          "https://api.github.com/users/Codertocat/following{/other_user}",
        gists_url: "https://api.github.com/users/Codertocat/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/Codertocat/subscriptions",
        organizations_url: "https://api.github.com/users/Codertocat/orgs",
        repos_url: "https://api.github.com/users/Codertocat/repos",
        events_url: "https://api.github.com/users/Codertocat/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/Codertocat/received_events",
        type: "User",
        site_admin: false,
      },
      body: "This is a pretty simple change that we need to pull into master.",
      created_at: "2019-05-15T15:20:33Z",
      updated_at: "2019-05-15T15:20:38Z",
      closed_at: null,
      merged_at: null,
      merge_commit_sha: "c4295bd74fb0f4fda03689c3df3f2803b658fd85",
      assignee: null,
      assignees: [],
      requested_reviewers: [],
      requested_teams: [],
      labels: [],
      milestone: null,
      commits_url:
        "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/commits",
      review_comments_url:
        "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/comments",
      review_comment_url:
        "https://api.github.com/repos/Codertocat/Hello-World/pulls/comments{/number}",
      comments_url:
        "https://api.github.com/repos/Codertocat/Hello-World/issues/2/comments",
      statuses_url:
        "https://api.github.com/repos/Codertocat/Hello-World/statuses/ec26c3e57ca3a959ca5aad62de7213c562f8c821",
      head: {
        label: "Codertocat:changes",
        ref: "changes",
        sha: "ec26c3e57ca3a959ca5aad62de7213c562f8c821",
        user: {
          login: "Codertocat",
          id: 21031067,
          node_id: "MDQ6VXNlcjIxMDMxMDY3",
          avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/Codertocat",
          html_url: "https://github.com/Codertocat",
          followers_url: "https://api.github.com/users/Codertocat/followers",
          following_url:
            "https://api.github.com/users/Codertocat/following{/other_user}",
          gists_url: "https://api.github.com/users/Codertocat/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/Codertocat/subscriptions",
          organizations_url: "https://api.github.com/users/Codertocat/orgs",
          repos_url: "https://api.github.com/users/Codertocat/repos",
          events_url:
            "https://api.github.com/users/Codertocat/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/Codertocat/received_events",
          type: "User",
          site_admin: false,
        },
        repo: {
          id: 186853002,
          node_id: "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
          name: "Hello-World",
          full_name: "Codertocat/Hello-World",
          private: false,
          owner: {
            login: "Codertocat",
            id: 21031067,
            node_id: "MDQ6VXNlcjIxMDMxMDY3",
            avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/Codertocat",
            html_url: "https://github.com/Codertocat",
            followers_url: "https://api.github.com/users/Codertocat/followers",
            following_url:
              "https://api.github.com/users/Codertocat/following{/other_user}",
            gists_url:
              "https://api.github.com/users/Codertocat/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/Codertocat/subscriptions",
            organizations_url: "https://api.github.com/users/Codertocat/orgs",
            repos_url: "https://api.github.com/users/Codertocat/repos",
            events_url:
              "https://api.github.com/users/Codertocat/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/Codertocat/received_events",
            type: "User",
            site_admin: false,
          },
          html_url: "https://github.com/Codertocat/Hello-World",
          description: null,
          fork: false,
          url: "https://api.github.com/repos/Codertocat/Hello-World",
          forks_url:
            "https://api.github.com/repos/Codertocat/Hello-World/forks",
          keys_url:
            "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
          collaborators_url:
            "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
          teams_url:
            "https://api.github.com/repos/Codertocat/Hello-World/teams",
          hooks_url:
            "https://api.github.com/repos/Codertocat/Hello-World/hooks",
          issue_events_url:
            "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
          events_url:
            "https://api.github.com/repos/Codertocat/Hello-World/events",
          assignees_url:
            "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
          branches_url:
            "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
          tags_url: "https://api.github.com/repos/Codertocat/Hello-World/tags",
          blobs_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
          git_tags_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
          git_refs_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
          trees_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
          statuses_url:
            "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
          languages_url:
            "https://api.github.com/repos/Codertocat/Hello-World/languages",
          stargazers_url:
            "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
          contributors_url:
            "https://api.github.com/repos/Codertocat/Hello-World/contributors",
          subscribers_url:
            "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
          subscription_url:
            "https://api.github.com/repos/Codertocat/Hello-World/subscription",
          commits_url:
            "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
          git_commits_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
          comments_url:
            "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
          issue_comment_url:
            "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
          contents_url:
            "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
          compare_url:
            "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
          merges_url:
            "https://api.github.com/repos/Codertocat/Hello-World/merges",
          archive_url:
            "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
          downloads_url:
            "https://api.github.com/repos/Codertocat/Hello-World/downloads",
          issues_url:
            "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
          pulls_url:
            "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
          milestones_url:
            "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
          notifications_url:
            "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
          labels_url:
            "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
          releases_url:
            "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
          deployments_url:
            "https://api.github.com/repos/Codertocat/Hello-World/deployments",
          created_at: "2019-05-15T15:19:25Z",
          updated_at: "2019-05-15T15:20:34Z",
          pushed_at: "2019-05-15T15:20:33Z",
          git_url: "git://github.com/Codertocat/Hello-World.git",
          ssh_url: "git@github.com:Codertocat/Hello-World.git",
          clone_url: "https://github.com/Codertocat/Hello-World.git",
          svn_url: "https://github.com/Codertocat/Hello-World",
          homepage: null,
          size: 0,
          stargazers_count: 0,
          watchers_count: 0,
          language: "Ruby",
          has_issues: true,
          has_projects: true,
          has_downloads: true,
          has_wiki: true,
          has_pages: true,
          forks_count: 0,
          mirror_url: null,
          archived: false,
          disabled: false,
          open_issues_count: 2,
          license: null,
          forks: 0,
          open_issues: 2,
          watchers: 0,
          default_branch: "master",
          allow_squash_merge: true,
          allow_merge_commit: true,
          allow_rebase_merge: true,
          delete_branch_on_merge: false,
        },
      },
      base: {
        label: "Codertocat:master",
        ref: "master",
        sha: "f95f852bd8fca8fcc58a9a2d6c842781e32a215e",
        user: {
          login: "Codertocat",
          id: 21031067,
          node_id: "MDQ6VXNlcjIxMDMxMDY3",
          avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/Codertocat",
          html_url: "https://github.com/Codertocat",
          followers_url: "https://api.github.com/users/Codertocat/followers",
          following_url:
            "https://api.github.com/users/Codertocat/following{/other_user}",
          gists_url: "https://api.github.com/users/Codertocat/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/Codertocat/subscriptions",
          organizations_url: "https://api.github.com/users/Codertocat/orgs",
          repos_url: "https://api.github.com/users/Codertocat/repos",
          events_url:
            "https://api.github.com/users/Codertocat/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/Codertocat/received_events",
          type: "User",
          site_admin: false,
        },
        repo: {
          id: 186853002,
          node_id: "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
          name: "Hello-World",
          full_name: "Codertocat/Hello-World",
          private: false,
          owner: {
            login: "Codertocat",
            id: 21031067,
            node_id: "MDQ6VXNlcjIxMDMxMDY3",
            avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/Codertocat",
            html_url: "https://github.com/Codertocat",
            followers_url: "https://api.github.com/users/Codertocat/followers",
            following_url:
              "https://api.github.com/users/Codertocat/following{/other_user}",
            gists_url:
              "https://api.github.com/users/Codertocat/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/Codertocat/subscriptions",
            organizations_url: "https://api.github.com/users/Codertocat/orgs",
            repos_url: "https://api.github.com/users/Codertocat/repos",
            events_url:
              "https://api.github.com/users/Codertocat/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/Codertocat/received_events",
            type: "User",
            site_admin: false,
          },
          html_url: "https://github.com/Codertocat/Hello-World",
          description: null,
          fork: false,
          url: "https://api.github.com/repos/Codertocat/Hello-World",
          forks_url:
            "https://api.github.com/repos/Codertocat/Hello-World/forks",
          keys_url:
            "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
          collaborators_url:
            "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
          teams_url:
            "https://api.github.com/repos/Codertocat/Hello-World/teams",
          hooks_url:
            "https://api.github.com/repos/Codertocat/Hello-World/hooks",
          issue_events_url:
            "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
          events_url:
            "https://api.github.com/repos/Codertocat/Hello-World/events",
          assignees_url:
            "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
          branches_url:
            "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
          tags_url: "https://api.github.com/repos/Codertocat/Hello-World/tags",
          blobs_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
          git_tags_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
          git_refs_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
          trees_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
          statuses_url:
            "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
          languages_url:
            "https://api.github.com/repos/Codertocat/Hello-World/languages",
          stargazers_url:
            "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
          contributors_url:
            "https://api.github.com/repos/Codertocat/Hello-World/contributors",
          subscribers_url:
            "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
          subscription_url:
            "https://api.github.com/repos/Codertocat/Hello-World/subscription",
          commits_url:
            "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
          git_commits_url:
            "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
          comments_url:
            "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
          issue_comment_url:
            "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
          contents_url:
            "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
          compare_url:
            "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
          merges_url:
            "https://api.github.com/repos/Codertocat/Hello-World/merges",
          archive_url:
            "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
          downloads_url:
            "https://api.github.com/repos/Codertocat/Hello-World/downloads",
          issues_url:
            "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
          pulls_url:
            "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
          milestones_url:
            "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
          notifications_url:
            "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
          labels_url:
            "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
          releases_url:
            "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
          deployments_url:
            "https://api.github.com/repos/Codertocat/Hello-World/deployments",
          created_at: "2019-05-15T15:19:25Z",
          updated_at: "2019-05-15T15:20:34Z",
          pushed_at: "2019-05-15T15:20:33Z",
          git_url: "git://github.com/Codertocat/Hello-World.git",
          ssh_url: "git@github.com:Codertocat/Hello-World.git",
          clone_url: "https://github.com/Codertocat/Hello-World.git",
          svn_url: "https://github.com/Codertocat/Hello-World",
          homepage: null,
          size: 0,
          stargazers_count: 0,
          watchers_count: 0,
          language: "Ruby",
          has_issues: true,
          has_projects: true,
          has_downloads: true,
          has_wiki: true,
          has_pages: true,
          forks_count: 0,
          mirror_url: null,
          archived: false,
          disabled: false,
          open_issues_count: 2,
          license: null,
          forks: 0,
          open_issues: 2,
          watchers: 0,
          default_branch: "master",
          allow_squash_merge: true,
          allow_merge_commit: true,
          allow_rebase_merge: true,
          delete_branch_on_merge: false,
        },
      },
      _links: {
        self: {
          href: "https://api.github.com/repos/Codertocat/Hello-World/pulls/2",
        },
        html: {
          href: "https://github.com/Codertocat/Hello-World/pull/2",
        },
        issue: {
          href: "https://api.github.com/repos/Codertocat/Hello-World/issues/2",
        },
        comments: {
          href: "https://api.github.com/repos/Codertocat/Hello-World/issues/2/comments",
        },
        review_comments: {
          href: "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/comments",
        },
        review_comment: {
          href: "https://api.github.com/repos/Codertocat/Hello-World/pulls/comments{/number}",
        },
        commits: {
          href: "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/commits",
        },
        statuses: {
          href: "https://api.github.com/repos/Codertocat/Hello-World/statuses/ec26c3e57ca3a959ca5aad62de7213c562f8c821",
        },
      },
      author_association: "OWNER",
    },
    repository: {
      id: 186853002,
      node_id: "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
      name: "Hello-World",
      full_name: "Codertocat/Hello-World",
      private: false,
      owner: {
        login: "Codertocat",
        id: 21031067,
        node_id: "MDQ6VXNlcjIxMDMxMDY3",
        avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/Codertocat",
        html_url: "https://github.com/Codertocat",
        followers_url: "https://api.github.com/users/Codertocat/followers",
        following_url:
          "https://api.github.com/users/Codertocat/following{/other_user}",
        gists_url: "https://api.github.com/users/Codertocat/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/Codertocat/subscriptions",
        organizations_url: "https://api.github.com/users/Codertocat/orgs",
        repos_url: "https://api.github.com/users/Codertocat/repos",
        events_url: "https://api.github.com/users/Codertocat/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/Codertocat/received_events",
        type: "User",
        site_admin: false,
      },
      html_url: "https://github.com/Codertocat/Hello-World",
      description: null,
      fork: false,
      url: "https://api.github.com/repos/Codertocat/Hello-World",
      forks_url: "https://api.github.com/repos/Codertocat/Hello-World/forks",
      keys_url:
        "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
      collaborators_url:
        "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
      teams_url: "https://api.github.com/repos/Codertocat/Hello-World/teams",
      hooks_url: "https://api.github.com/repos/Codertocat/Hello-World/hooks",
      issue_events_url:
        "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
      events_url: "https://api.github.com/repos/Codertocat/Hello-World/events",
      assignees_url:
        "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
      branches_url:
        "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
      tags_url: "https://api.github.com/repos/Codertocat/Hello-World/tags",
      blobs_url:
        "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
      git_tags_url:
        "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
      git_refs_url:
        "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
      trees_url:
        "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
      statuses_url:
        "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
      languages_url:
        "https://api.github.com/repos/Codertocat/Hello-World/languages",
      stargazers_url:
        "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
      contributors_url:
        "https://api.github.com/repos/Codertocat/Hello-World/contributors",
      subscribers_url:
        "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
      subscription_url:
        "https://api.github.com/repos/Codertocat/Hello-World/subscription",
      commits_url:
        "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
      git_commits_url:
        "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
      comments_url:
        "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
      issue_comment_url:
        "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
      contents_url:
        "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
      compare_url:
        "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
      merges_url: "https://api.github.com/repos/Codertocat/Hello-World/merges",
      archive_url:
        "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
      downloads_url:
        "https://api.github.com/repos/Codertocat/Hello-World/downloads",
      issues_url:
        "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
      pulls_url:
        "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
      milestones_url:
        "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
      notifications_url:
        "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
      labels_url:
        "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
      releases_url:
        "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
      deployments_url:
        "https://api.github.com/repos/Codertocat/Hello-World/deployments",
      created_at: "2019-05-15T15:19:25Z",
      updated_at: "2019-05-15T15:20:34Z",
      pushed_at: "2019-05-15T15:20:33Z",
      git_url: "git://github.com/Codertocat/Hello-World.git",
      ssh_url: "git@github.com:Codertocat/Hello-World.git",
      clone_url: "https://github.com/Codertocat/Hello-World.git",
      svn_url: "https://github.com/Codertocat/Hello-World",
      homepage: null,
      size: 0,
      stargazers_count: 0,
      watchers_count: 0,
      language: "Ruby",
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: true,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 2,
      license: null,
      forks: 0,
      open_issues: 2,
      watchers: 0,
      default_branch: "master",
    },
    sender: {
      login: "Codertocat",
      id: 21031067,
      node_id: "MDQ6VXNlcjIxMDMxMDY3",
      avatar_url: "https://avatars1.githubusercontent.com/u/21031067?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/Codertocat",
      html_url: "https://github.com/Codertocat",
      followers_url: "https://api.github.com/users/Codertocat/followers",
      following_url:
        "https://api.github.com/users/Codertocat/following{/other_user}",
      gists_url: "https://api.github.com/users/Codertocat/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/Codertocat/subscriptions",
      organizations_url: "https://api.github.com/users/Codertocat/orgs",
      repos_url: "https://api.github.com/users/Codertocat/repos",
      events_url: "https://api.github.com/users/Codertocat/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/Codertocat/received_events",
      type: "User",
      site_admin: false,
    },
  },
  eventName: "pull_request_review",
  sha: "c27d339ee6075c1f744c5d4b200f7901aad2c369",
  ref: "refs/heads/my_branch",
  workflow: "Context testing",
  action: "github_step",
  job: "dump_contexts_to_log",
  actor: "octocat",
  runNumber: 314,
  runId: 1536140711,
  apiUrl: "https://api.github.com",
  serverUrl: "https://github.com",
  graphqlUrl: "https://api.github.com/graphql",
  issue: {
    owner: "sre",
    repo: "ser",
    number: 123,
  },
  repo: {
    owner: "sre",
    repo: "ser",
  },
};
export default context;
