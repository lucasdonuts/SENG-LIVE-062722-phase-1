document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/';
// Fetch requests 
    // Function for making a GET request 
    function fetchResource(url){
        return fetch(url)
        .then(res => res.json())
    }

    // Function for making a POST request
      // invocation of fetch [X]
      // indicate method as POST [X]
      // indicate body of POST request [X]
      // parse body data with JSON.stringify(data) [X]
        // different from res.json(). Pretty much the opposite
        // sending OUT => JSON.stringify(data)
        // receiving IN => res.json()
        // JS <=> JSON <=> SQL(and others)
    function createResource(url, body) {
      // invocation of fetch
      // body parameter is an object
      return fetch(url, {
        // indicate method as POST
        method: 'POST',
        // indicate body of POST request
        headers: {
          'Content-Type': 'application/json'
        },
        // parse body data with JSON.stringify(data)
        body: JSON.stringify(body)
      })
      .then(res => res.json())
    }

// Rendering functions
    // Renders Header
    function renderHeader(store){
        document.querySelector('h1').textContent = store.name
    }
    // Renders Footer
    function renderFooter(store){
        const footerDivs = document.querySelectorAll('footer div')
        footerDivs[0].textContent = store.name
        footerDivs[1].textContent = store.address
        footerDivs[2].textContent = store.hours
    }

    function renderBookCard(cardData) {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const pAuthor = document.createElement('p')
        const pPrice = document.createElement('p')
        const img = document.createElement('img')
        const btn = document.createElement('button')

        h3.textContent = cardData.title
        pAuthor.textContent = cardData.author
        pPrice.textContent = `$${cardData.price}`
        btn.textContent = 'Delete'

        img.src = cardData.imageUrl
        li.className = 'list-li'

        //Event Listeners 
        btn.addEventListener('click',()=>li.remove())
    
        li.append(h3,pAuthor,pPrice,img,btn)
        document.querySelector('#book-list').append(li)
    }

// Event Handlers
    function handleForm(e){
        e.preventDefault()
        //Builds Book
        const book = {
            title: e.target.title.value,
            author:e.target.author.value,
            price: e.target.price.value,
            imageUrl: e.target.imageUrl.value,
            inventory:e.target.inventory.value,
            reviews:[]
        }

        createResource('http://localhost:3000/books', book)
          .then(renderBookCard)
          .catch(err => console.error(err))
    }

    function handleStoreForm(e) {
      e.preventDefault()

      const store = {
        location: e.target.location.value,
        address: e.target.address.value,
        number:e.target.number.value,
        name: e.target.name.value,
        hours: e.target.hours.value
      }
    }


// Invoking functions    
    fetchResource('http://localhost:3000/stores/1')
    .then(store => {
        renderHeader(store)
        renderFooter(store)
    })
    .catch(e => console.error(e))

    fetchResource('http://localhost:3000/books')
    .then(books => books.forEach(renderBookCard))
    .catch(e => console.error(e))

    document.querySelector('#book-form').addEventListener('submit', handleForm)

})