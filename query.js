require("dotenv").config();

const query = {
	query: `{
      viewer {
        login
        avatarUrl
        bio
        followers {
          totalCount
        }
        following {
          totalCount
        }
        name
        repositories(affiliations: OWNER, last: 20) {
          totalCount
          edges {
            node {
              name
              updatedAt
              stargazerCount
              forkCount
              description
              url
              languages(first: 1) {
                edges {
                  node {
                   color
                   name
                  }
                }
              }
            }
          }
        }
        location
      }
    }`,
};

const ACCESS_TOKEN = process.env.GITHUB_TOKEN;

const body = JSON.stringify(query);

const options = {
	method: "post",
	headers: {
		"Content-Type": "application/json",
		Authorization: `bearer ${ACCESS_TOKEN}`,
	},
	body: body,
};

module.exports = options;
