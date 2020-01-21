buildPage = (repos) => {
    //console.log(repos)
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

        // outer container
        let outer = document.createElement('div')
        outer.setAttribute('class', 'col-lg-3 col-md-4');
        outer.appendChild(inner)
        
        // add container
        document.getElementById('main').appendChild(outer)
    }
}


async function getRepos() {
    let api = 'https://api.github.com/users/kid-on-github/repos?sort=updated'
    api = './repos.json'
    let repos = await fetch(api)
    buildPage(await repos.json())
    console.log('running')
}

getRepos()
console.log('hello')
