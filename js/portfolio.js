/**
 * Portfolio JavaScript
 */
(function () {
  /**
   * Elements Page
   */
  const elements = {
    repoSection: document.querySelector('main section.coding')
  };
  
  const handleRepository = async (repo) => {
    let languages = await (await (fetch(`https://api.github.com/repos/${repo.full_name}/languages`)
      .then(response => {
        return response.json()
      })
      .catch(error => {
        console.log('Error: ', error)
      })
    ));
    
    languages = Object.keys(languages).map(function(key) {
      return `<span class="lang">${key}</span>`;
    }).join('');
    
    const coding = `
      <article>
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : ''}</p>
        <a href="${repo.html_url}">GITHUB</a>
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">LIVE VIEW</a>` : ''}<br>
        ${languages != '' ? languages : ''}
      </article>
    `;
    elements.repoSection.insertAdjacentHTML('beforeend', coding);
  };
  
  fetch('https://api.github.com/users/kelvinbiffi/repos').then((response) => {
    const contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") > -1) {
      return response.json().then((json) => {
        let i = 0;
        for(; i < json.length; i++) {
          handleRepository(json[i]);
        }
      });
    } else {
      console.warn("Oops, we haven't got JSON!");
    }
  });
  
})()