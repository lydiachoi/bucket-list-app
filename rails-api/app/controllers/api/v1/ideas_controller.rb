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
    
    # for deleting an idea
    # if idea.destroy works, then status is ok and no content in head
    # otherwise status = unprocessable_entity and render error
    def destroy
      @idea = Idea.find(params[:id])
      if @idea.destroy 
        head :no_content, status: :ok
      else
        render json: @idea.errors, status: :unprocessable_entity
      end
    end 

    private 

    def idea_params
      params.require(:idea).permit(:title, :body)
    end
  end
end