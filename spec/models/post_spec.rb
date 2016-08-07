require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:post) { Post.new(valid_attributes) }
  let(:valid_attributes) {
    {
      title: 'A post',
      body: 'Some body',
      slug: 'some-slug'
    }
  }

  describe 'Before validation' do
    context 'when the slug is present' do
      it "doesn't change the slug" do
        expect {
          post.valid?
        }.not_to change {
          post.slug
        }
      end
    end

    context 'when the slug is blank' do
      before :each do
        valid_attributes[:slug] = nil
        valid_attributes[:title] = 'Some fancy title with extra chars!'
      end

      it 'builds a valid slug from the title' do
        expect {
          post.valid?
        }.to change {
          post.slug
        }.from(nil).to('some-fancy-title-with-extra-chars')
      end
    end
  end

  describe 'Validation' do
    it 'should be valid with valid attributes' do
      expect(post).to be_valid
    end

    it "shouldn't be valid without a title" do
      valid_attributes[:title] = nil
      expect(post).not_to be_valid
    end

    it "shouldn't be valid without a body" do
      valid_attributes[:body] = nil
      expect(post).not_to be_valid
    end
  end
end
