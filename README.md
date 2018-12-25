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

### Axios ###
- Used to make API calls (can be replaced with JQuery or fetch

### Enabling Cross Origin Resource Sharing (CORS) ###
-  “No Access-Control-Allow-Origin header present” error triggered because the API is on a different port, must enable Cross Origin Resource Sharing (CORS) to ensure both ports "talk to each other".

#### Steps to Enable CORS using the rack-cors gem ####
[rack-cors gem](https://github.com/cyu/rack-cors)
1. Add the gem to the Gemfile `gem 'rack-cors', :require => 'rack/cors'`
2. Install it using `bundle install` within the rails-api directory
3. Add the middleware configuration to config/application.rb file
  - restrict the origins to our specific front-end app and allow standard access to the REST API endpoint methods for all resources
4. Restart the Rails server and the browser