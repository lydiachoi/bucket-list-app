# Details on Tools used #

## Back-end: Ruby on Rails ## 
- Rails API server on port 3001:
- Curl: `curl -G http://localhost:3001/api/v1/ideas`

## Front-end: React ##
- Listening to Port 3000
- The following methods are called in the following order when an instance of a component is being created and inserted into the DOM:
  1. constructor()
  2. static getDerivedStateFromProps()
  3. render()
  4. componentDidMount()

### Tracking state changes in React Developer Tools ###
- Allows you to see state changes in action with the React Developer Tools Browser Extension directly as user types. 
- Install extension > refresh the app page > open developer console > should see new `React` tab
- In the tab, you'll be able to see components tree on the left and all the props and state associated with each component on the right.
- [For chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [For firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)


## Axios ##
- JavaScript Library used to perform promise-based HTTP client for the browser and node.js
- Used to make API calls (can be replaced with JQuery or fetch
- Specific notes on resolving Cross Origin Resource Sharing (CORS) errors below
- ` npm install axios --save` && `import axios from 'axios'`

## immutability-helper ##
- JavaScript library used to mutate a copy of data without changing the original source
- Only used the update functionality to use the response from `POST` call to update array of ideas in the state, so that when we add a new idea it appears on the page immediately.
- `npm install immutability-helper --save` && `import update from 'immutability-helper'`
- More information on immutability in React [here](https://blog.logrocket.com/immutability-in-react-ebe55253a1cc)

---- 

# Programming Specific Notes #

### JavaScript Notes ### 
- How to add In-line editing on forms 
- - utilize `onClick` and `onBlur` to respectively set state values (`onClick`) each time a form field is completed, and then save the state with `onBlur event` when user clicks out of the form.
- - - `onBlur` event - triggered when a user leaves an input field, or when an object loses focus - most often used for form validation code 
- - - `onClick` event - triggered when a button is clicked, when the user clicks on an element.

### Enabling Cross Origin Resource Sharing (CORS) ###
-  “No Access-Control-Allow-Origin header present” error triggered because the API is on a different port, must enable Cross Origin Resource Sharing (CORS) to ensure both ports "talk to each other".

#### Steps to Enable CORS using the [rack-cors gem](https://github.com/cyu/rack-cors) ####
1. Add the gem to the Gemfile `gem 'rack-cors', :require => 'rack/cors'`
2. Install it using `bundle install` within the rails-api directory
3. Add the middleware configuration to config/application.rb file
  - restrict the origins to our specific front-end app and allow standard access to the REST API endpoint methods for all resources
4. Restart the Rails server and the browser

### JSX Notes: ###
- JSX: statically-typed, object-oriented programming language designed to run on modern web browsers
- Specifically in the project, the `Idea` tiles were  refactored into its own separate component called Idea. This is a **stateless functional component** (AKA a “dumb” component), which means that it doesn’t handle any state. It’s a pure function that accepts some data and returns JSX.
- Stateless components have no state (duh!), which simply takes props as an argument and returns a react element - you cannot reach `this.state` within it. 
- More on benefits to using stateless functional components [here](https://www.google.com/search?q=why+use+stateless+functional+components&oq=why+use+stateless+&aqs=chrome.0.0j69i57j0l4.2269j0j7&sourceid=chrome&ie=UTF-8).

### Rails Notes: ###
- When creating `post` endpoint, we need to allow the endpoint to take in specific requirements (to post idea data and create new ideas)
  - Since Rails uses strong parameters, we define the private method idea_params to whitelist the params we need — title and body.


Credits to [Hrishi Mittal's SitePoint Tutorial](https://www.sitepoint.com/react-rails-5-1/)