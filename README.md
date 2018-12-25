# Tools used: # 
Backend | Rails 
Front end | React

---- 

# Details on Tools used #

## Ruby on Rails ## 
- Rails API server on port 3001:
- Curl: `curl -G http://localhost:3001/api/v1/ideas`

## React ##
- Listening to Port 3000
- The following methods are called in the following order when an instance of a component is being created and inserted into the DOM:
  1. constructor()
  2. static getDerivedStateFromProps()
  3. render()
  4. componentDidMount()

## Axios ##
- JavaScript Library used to perform promise-based HTTP client for the browser and node.js
- Used to make API calls (can be replaced with JQuery or fetch
- Specific notes on resolving Cross Origin Resource Sharing (CORS) errors below

---- 

## Programming Specific Notes ## 

### Enabling Cross Origin Resource Sharing (CORS) ###
-  “No Access-Control-Allow-Origin header present” error triggered because the API is on a different port, must enable Cross Origin Resource Sharing (CORS) to ensure both ports "talk to each other".

#### Steps to Enable CORS using the [rack-cors gem](https://github.com/cyu/rack-cors) ####
1. Add the gem to the Gemfile `gem 'rack-cors', :require => 'rack/cors'`
2. Install it using `bundle install` within the rails-api directory
3. Add the middleware configuration to config/application.rb file
- - restrict the origins to our specific front-end app and allow standard access to the REST API endpoint methods for all resources
4. Restart the Rails server and the browser


### JSX Notes: ###
- JSX: statically-typed, object-oriented programming language designed to run on modern web browsers
- Specifically in the project, the `Idea` tiles were  refactored into its own separate component called Idea. This is a **stateless functional component** (AKA a “dumb” component), which means that it doesn’t handle any state. It’s a pure function that accepts some data and returns JSX.
- Stateless components have no state (duh!), which simply takes props as an argument and returns a react element - you cannot reach `this.state` within it. 
- More on benefits to using stateless functional components [here](https://www.google.com/search?q=why+use+stateless+functional+components&oq=why+use+stateless+&aqs=chrome.0.0j69i57j0l4.2269j0j7&sourceid=chrome&ie=UTF-8).