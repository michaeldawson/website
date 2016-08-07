require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:post) { Post.new(valid_attributes) }
  let(:valid_attributes) {
    {
      title: 'A post',
      body: 'Some body'
    }
  }

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
