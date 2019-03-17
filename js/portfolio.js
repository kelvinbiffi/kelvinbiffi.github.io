/**
 * Portfolio JavaScript
 */
(function () {
  const user = 'kelvinbiffi';

  const skills = {};
  
  /**
   * Elements Page
   */
  const elements = {
    skillSection: document.querySelector('main section.skills'),
    repoSection: document.querySelector('main section.coding')
  };
  
  /**
   * 
   * @param {Object} repo - Respository object
   */
  const handleRepository = async (repo) => {
    let languages = await (await (fetch(`https://api.github.com/repos/${user}/${repo.name}/languages`)
      .then(response => {
        return response.json()
      })
      .catch(error => {
        console.log('Error: ', error)
      })
    ));
    
    languages = Object.keys(languages).map((key) => {
      skills[key] = (skills[key] ? skills[key] + 1 : 1);
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

  const handleSkills = () => {
    const htmlSkills = Object.keys(skills).map((skill) => {
      return `<div class="skill">
                ${skill} 
                <div class="bullets">
                  ${new Array(skills[skill]+1).join('<span></span>')}
                </div>
              </div>`;
    }).join('');

    elements.skillSection.insertAdjacentHTML('beforeend', htmlSkills);
  };
  
  fetch(`https://api.github.com/users/${user}/repos`).then( async(response) => {
    const contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") > -1) {
      return response.json().then(async (json) => {
        let i = 0;
        for(; i < json.length; i++) {
          await handleRepository(json[i]);
        }

        handleSkills();
      });
    } else {
      console.warn("Oops, we haven't got JSON!");
    }
  });
  
})()