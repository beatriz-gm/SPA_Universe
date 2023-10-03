export class Router {
  
  routes = {}
  
  add(routeName, page) {
    this.routes[routeName] = page
  }
  
  route(event) {
    event = event || window.event
    event.preventDefault()
    
    window.history.pushState({}, "", event.target.href)
    
    this.handle()
  }
  
  handle() {
    const {pathname} = window.location
    const route = this.routes[pathname] || this.routes[404]
    
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })

    if (pathname == "/universe") {
     document.documentElement.classList.add('universe')
     document.documentElement.classList.remove('explorer')
     document.documentElement.classList.remove('home')

    } 
    else if (pathname == "/explorer") {
      document.documentElement.classList.add('explorer')
      document.documentElement.classList.remove('universe')
      document.documentElement.classList.remove('home')
    }
    else {
      document.documentElement.classList.add('home')
      document.documentElement.classList.remove('explorer')
      document.documentElement.classList.remove('universe')
    }
  
  }
  
}

