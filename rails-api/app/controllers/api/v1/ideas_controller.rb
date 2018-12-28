module Api::V1
  class IdeasController < ApplicationController
    
    # show ideas
    def index            
      @ideas = Idea.order("created_at DESC") #order ideas in descending time by the created_at stamp
      render json: @ideas
    end 

    # create new ideas
    def create 
      @idea = Idea.create(idea_params)
      render json: @idea
    end

    # for updating an idea
    def update
    @idea = Idea.find(params[:id])
    @idea.update_attributes(idea_params)
    render json: @idea
    end
    
    private 

    def idea_params
      params.require(:idea).permit(:title, :body)
    end
  end
end