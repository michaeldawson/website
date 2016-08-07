class HomeController < ApplicationController
  def index
  end

  private

  helper_method :posts
  def posts
    @posts ||= Post.all
  end
end
