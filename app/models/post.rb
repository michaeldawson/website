class Post < ApplicationRecord
  belongs_to :category

  validates :title, presence: true
  validates :body, presence: true
  validates :slug, presence: true, format: { with: /\A[a-z|-]*\Z/ }
  validates :category, presence: true

  before_validation :set_slug, if: -> { title.present? && slug.blank? }
  def set_slug
    self.slug = title.to_s.downcase.parameterize
  end

  def to_param
    slug
  end

  def parsed
    Nokogiri::HTML.fragment(body)
  end

  # Temp - take all quotes and cat their content together
  def summary
    parsed.css('blockquote').map do |c|
      "<blockquote>#{c.content}</blockquote>"
    end.join("\r\n")
  end
end
