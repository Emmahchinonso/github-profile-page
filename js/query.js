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

const body = JSON.stringify(query);

export const options = {
	method: "post",
	headers: {
		"Content-Type": "application/json",
		Authorization: "bearer de5f7d3d03ee9a8fee75164d55e92ae032d39484",
	},
	body: body,
};

