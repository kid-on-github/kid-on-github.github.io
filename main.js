updateLink = (id, url) => {
    console.log(id,url)
    //document.getElementById(id).text = url
    document.getElementById(id).href = url


}

buildTop = (user) => {
    // update profile image
    document.getElementById('profileImg').setAttribute('src', user['avatar_url'])

    // update title and name based on user info (in case someone else want's to use this as a template)
    document.getElementById('name').innerHTML = document.title = user['name']

    // update urls
    // updateLink('githubUrl', user['html_url'])
    // updateLink('linkedinUrl', 'https://www.linkedin.com/in/mike-pete/')
    // updateLink('instagramUrl', 'https://www.instagram.com/mik.pete/')
}

buildPage = (repos) => {
    // loop through repos
    for (let i = 0; i < repos.length; i++){
        
        // only show repos with descriptions
        if (!repos[i]['description']) continue

        // exclude repos with [x] at the end of the description
        let descLen = repos[i]['description'].length
        let exclude = repos[i]['description'].substring(descLen - 3).toLowerCase() == '[x]'
        if (exclude) continue

        // title
        let title = document.createElement('h5')
        title.textContent = repos[i]['name']
        
        // description
        let desc = document.createElement('p')
        desc.textContent = repos[i]['description']

        // language
        let lang = document.createElement('h6')
        lang.textContent = repos[i]['language']
        lang.setAttribute('type', repos[i]['language'])
        lang.setAttribute('class', 'lang');
        
        // inner container
        let inner = document.createElement('div')
        inner.setAttribute('class', 'inner');
        inner.appendChild(title)
        inner.appendChild(desc)
        inner.appendChild(lang)

        // a (make tiles clickable)
        let a = document.createElement('a')
        a.appendChild(inner)
        a.href = repos[i]['html_url']

        // outer container
        let outer = document.createElement('div')
        outer.setAttribute('class', 'col-lg-3 col-md-4');
        outer.appendChild(a)
        
        // add container
        document.getElementById('main').appendChild(outer)
    }
}

async function getUser(){
    let api = 'https://api.github.com/users/AshWithGithub'
    //let api = './user.json'
    let user = await fetch(api)
    buildTop(await user.json())
}

async function getRepos(){
    let api = 'https://api.github.com/users/AshWithGithub/repos?sort=created'
    //let api = './repos.json'
    let repos = await fetch(api)
    buildPage(await repos.json())
}

getUser()
getRepos()
