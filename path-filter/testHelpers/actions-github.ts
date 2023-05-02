let EVENT_NAME = "test_event"

export const mockActionGithub = function () {
  let pr_base_sha = "test_base_sha";
  let pr_head_sha = "test_head_sha";
  const pr_variables_update = (base: string,head: string) => {
    pr_base_sha = base;
    pr_head_sha = head;
  }
  const TAG_NAME = "betatest";

  const action_github_spy = {
    context: {
      get eventName () {
        return EVENT_NAME
      },
      repo: {
        repo: "smth",
        owner: "MrSdk"
      },
      payload: {
        pull_request: {
          base: {
            get sha () {
              return pr_base_sha
            }
          },
          head: {
            get sha () {
              return pr_head_sha
            }
          }
        },
        action: 'released',
        release: {
          prerelease: false,
          tag_name: TAG_NAME
        }
      }
    },
    getOctokit: jest.fn(function () {
      return {
        rest: {
          repos: {
            listReleases: {
              endpoint: {
                merge: jest.fn()
              }
            },
            compareCommits: {
              endpoint: {
                merge: jest.fn()
              }
            }
          }
        },
        paginate: async function* () {
          const get_promise_yield = ( tag: string ) => new Promise(r => {
            setTimeout(() => r({
              tag_name: tag,
              files: [
                { filename: 'README.md' },
                { filename: 'package.json' },
                { filename: 'src/index.js' }
              ] 
            }), 1000)
          })

          yield get_promise_yield( TAG_NAME );
          yield get_promise_yield( "smth" );
        }
      }
    })
  }
  const event_name_update = ( event: string ) => EVENT_NAME = event;
  
  jest.mock("@actions/github", function () {
    return action_github_spy;
  });

  return {
    action_github_spy,
    event_name_update,
    pr_variables_update
  };
}