class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
  validates :slug, presence: true, format: { with: /\A[a-z|-]*\Z/ }

  before_validation :set_slug
  def set_slug
    self.slug ||= title.to_s.downcase.parameterize
  end
end
