require 'rails_helper'

RSpec.describe PostsController, type: :controller do
  RSpec.shared_context 'with a post' do
    let(:post) { Post.new(id: 1) }

    before :each do
      allow(Post).to receive(:find).with(post.id).and_return(post)
    end
  end

  RSpec.shared_context 'when logged in' do
    let(:user) { User.new }

    before :each do
      allow(request.env['warden']).to receive(:authenticate!) { user }
      allow(controller).to receive(:current_user) { user }
    end
  end

  describe 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #new' do
    context 'when logged in' do
      include_context 'when logged in'

      it 'returns http success' do
        get :new
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe 'GET #edit' do
    include_context 'with a post'

    context 'when logged in' do
      include_context 'when logged in'

      it 'returns http success' do
        get :edit, params: { id: post.id }
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe 'GET #show' do
    include_context 'with a post'

    it 'returns http success' do
      get :show, params: { id: post.id }
      expect(response).to have_http_status(:success)
    end
  end
end
