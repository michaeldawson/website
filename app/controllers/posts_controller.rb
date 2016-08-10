class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def create
    if post.save
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
      render :edit
    end
  end

  def destroy
    if post.destroy
      flash[:success] = 'Done deal.'
      redirect_to posts_path
    else
      flash[:error] = "Sorry, that didn't work."
    end
  end

  private

  helper_method :posts
  def posts
    @posts ||= Post.all
  end

  helper_method :post
  def post
    @post ||= params.key?(:id) ? Post.find_by!(slug: params[:id]) : Post.new(post_params)
  end

  def post_params
    @post_params ||= params.require(:post).permit! if params.key?(:post)
  end
end
