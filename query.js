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



module.exports = query;
