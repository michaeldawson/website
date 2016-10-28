require 'rails_helper'

RSpec.describe Category, type: :model do
  let(:category) { Category.new(valid_attributes) }
  let(:valid_attributes) {
    {
      name: 'some name'
    }
  }

  describe 'Validation' do
    it 'is valid with valid attributes' do
      expect(category).to be_valid
    end

    it "isn't valid without a name" do
      valid_attributes[:name] = nil
      expect(category).not_to be_valid
    end
  end
end
