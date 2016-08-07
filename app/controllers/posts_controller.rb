class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def create
    if success
      flash[:notice] = 'Success!'
      redirect_to post_path(post)
    else
      render :new
    end
  end

  def update
    if post.update(post_params)
      flash[:notice] = 'Success!'
      redirect_to post_path(post)
    else
      render :new
    end
  end

  private

  helper_method :posts
  def posts
    @posts ||= Post.all
  end

  helper_method :post
  def post
    @post ||= params.key?(:id) ? Post.find(params[:id]) : Post.new(post_params)
  end

  def post_params
    @post_params ||= params.require(:post).permit! if params.key?(:post)
  end
end
