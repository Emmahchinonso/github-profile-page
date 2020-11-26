import { options } from "./query.js";

const url = "https://api.github.com/graphql";

const getHtml = (selector) => document.querySelector(selector);

const convertToReadableDate = (isoString) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const date = new Date(isoString);
	return `${date.getDay()} ${monthNames[date.getMonth()]}`;
};

const renderProfileShortcut = (url) => {
	let profileShortcut = getHtml(".js-profile-btn");
	profileShortcut.src = url;
};

const renderUserSection = ({ avatarUrl, name, login, bio, location }) => {
	let column1 = getHtml(".js-flex-column-1");
	column1.innerHTML = `
    <div class="user">
      <div class="profile">
        <div class="profile__wrapper">
          <img src=${avatarUrl} class="profile__image" />
          <button class="profile__status"><i class="far fa-smile"></i></button>
        </div>
        <div class="profile__name-container">
          <h1>
            <span class="profile__name">${name}</span>
            <span class="profile__login">${login}</span>
          </h1>
        </div>
      </div>
      <button class="user__status"><i class="far fa-smile"></i></button>
      <p class="user__bio">${bio}<p>
      <p class="user__location"><i class="fas fa-map-marker-alt"></i>${location}<p>
    </div>
  `;
};

const renderRepoNumber = (count) => {
	let repoNumberContainer = document.querySelectorAll(".js-repo-count");
	repoNumberContainer.forEach((elem) => (elem.innerHTML = count));
};

const renderRepositories = (repositories) => {
	let repositoryWrapper = getHtml(".js-repo-container");
	let repositoryList = repositories.map((item) => {
		const {
			node: {
				name: repoName,
				description,
				forkCount,
				languages: {
					edges: [{ node: { color = "", name: languageName = "" } = {} } = {}],
				},
				updatedAt,
				stargazerCount,
				url,
			},
		} = item;

		return `
		  <li>
		      <section class="repo">
            <div class="repo__content flex-column--3">
              <h2 class="repo__title"><a href=${url}>${repoName}</a></h2>
              <p class="repo__description">${description ? description : ""}</p>
              <p class="repo__metadata">
                <span class="repo__language">
                  <span class="repo__language-color" style="background-color: ${color}"></span>
                  ${languageName}
                </span>
                <span class="repo__star-count"><i class="far fa-star"></i>${stargazerCount}</span>
                <span class="repo__fork-count"><i class="fas fa-code-branch"></i>${forkCount}</span>
                <span class="repo__date">Updated on ${convertToReadableDate(updatedAt)}</span>
              <p>
            </div>
            <div class="repo__btn-container flex-column--1">
              <button class="repo__star"><i class="far fa-star"></i>Star</button>
            </div>
            
		      </section>
		      
		  </li>
		`;
	});
	repositoryWrapper.innerHTML = repositoryList.join("");
};



const render = ({ data }) => {
	const {
		viewer: {
			login,
			avatarUrl,
			bio,
			name,
			repositories: { totalCount: repositoriesCount, edges: repositories },
			location,
		},
	} = data;
	renderProfileShortcut(avatarUrl);
	renderUserSection({ avatarUrl, name, login, bio, location });
	renderRepoNumber(repositoriesCount);
  renderRepositories(repositories)
};

fetch(url, options)
	.then((response) => response.json())
	.then((data) => render(data))
	.catch((err) => console.log(err));
