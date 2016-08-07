# -------------------------------------------------
#  Picture Tag
# -------------------------------------------------
#  Adds support for the picture tag.
#
#  The picture tag is a draft spec for specifying
#  an image with multiple sources, each with a
#  media query.
#
#  We also add support for relative sizing (based
#  on aspect ratio) and flash-in upon async load.
# -------------------------------------------------

module PictureTagHelper

  def picture_tag(source, options = {})

    # Whitelist the options
    options = options.slice(:alt, :title, :class, :id, :circle)
    options[:class] = Array.wrap(options[:class])
    options[:class] << 'square' if options[:class].empty?
    options[:class] << 'circle' if options[:circle]
    options.delete :circle

    # Grab the sources - can be provided as a hash
    # with the media query as the key and the src
    # as the value, or as a single string.
    sources = {}
    sources = source if source.is_a?(Hash)
    sources = { default: source } if source.is_a?(String) && source.present?

    # Create a fallback image element for when JS
    # isn't available
    default_source = sources.any? ? (sources.key?(:default) ? sources[:default] : sources.values.first) : nil
    noscript = if default_source.nil? then '' else
      content_tag(:noscript) do
        content_tag(:div, class: 'img-wrapper') do
          content_tag(:img, nil, options.merge(src: default_source))
        end
      end
    end

    # Create the picture tag
    content_tag(:picture, options) do
      concat("<!--[if IE 9]><video style='display: none;'><![endif]-->".html_safe).concat(
        sources.map do |media,src|
          content_tag(:source, nil, src: src, media: media)
        end.inject(&:concat) || ''
      ).concat(content_tag(:div, nil, class: 'img-wrapper'))
       .concat("<!--[if IE 9]></video><![endif]-->".html_safe)
       .concat(noscript)
    end

  end

end
