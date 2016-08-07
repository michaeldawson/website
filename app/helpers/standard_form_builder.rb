# -------------------------------------------------
#  Standard Form Builder
# -------------------------------------------------
#
#  Adds a couple of useful helpers to building
#  forms:
#
#   * Automatically outputs a matching label
#
#   * Sets autofocus on the first element, or the
#     first with an error if there are errors
#     present
#
#   * Sets a `maxlength` attribute if a
#     LengthValidation is applied to the method
#
# -------------------------------------------------

class StandardFormBuilder < ActionView::Helpers::FormBuilder
  include PictureTagHelper

  # All of these have the same method signature -
  # (method, options = {}), so we can override
  # these in bulk. Note, we don't bother
  # overriding hidden_field or file_field, as
  # these require no special rendering. We also
  # override other helpers (such as select)
  # further down, because they have unique
  # signatures.
  FIELD_HELPERS = %w{color_field date_field datetime_field datetime_local_field
    email_field month_field number_field password_field phone_field
    range_field search_field telephone_field text_area text_field time_field
    url_field week_field}

  # These also have the same signature (as above,
  # but with html_options) and can be overridden
  # together.
  DATE_SELECT_HELPERS = %w{date_select time_select datetime_select}

  # Whether we've already set autofocus on an
  # element
  @autofocus_set = false

  delegate :content_tag, :capture, :concat, to: :@template

  # For each of the standard field helpers (with
  # the (method, options = {}) signatures),
  # override them, but preserve the old methods
  # via an alias - we sometimes need them.
  FIELD_HELPERS.each do |method_name|
    alias_method "old_#{method_name}".to_sym, method_name
    define_method(method_name) do |method, options = {}|
      form_group(method_name, method, options) do
        super(method, options)
      end
    end
  end

  # Same with the date helpers
  DATE_SELECT_HELPERS.each do |method_name|
    alias_method "old_#{method_name}".to_sym, method_name
    define_method(method_name) do |method, options = {}, html_options = {}|
      form_group(method_name, method, options, html_options) do
        super(method, options, html_options)
      end
    end
  end

  alias_method :datetime_field, :datetime_local_field

  alias_method :old_select, :select
  def select(method, choices = nil, options = {}, html_options = {})
    form_group('select', method, options, html_options) do
      old_select(method, choices, options, html_options)
    end
  end

  alias_method :old_check_box, :check_box
  def check_box(method, options = {}, checked_value = "1", unchecked_value = "0", &block)
    options[:label] = capture(&block) if block.present?
    form_group('check-box', method, options) do
      old_check_box(method, options.except(*label_options), checked_value, unchecked_value)
    end
  end

  alias_method :old_collection_check_boxes, :collection_check_boxes
  def collection_check_boxes(method, collection, value_method, text_method, options = {}, html_options = {}, &block)
    label_tag('collection-check-boxes', options) +
    old_collection_check_boxes(method, collection, value_method, text_method, options, html_options) do |builder|
      ix = collection.map(&value_method).index(builder.value)
      group_classes = ['collection-check-box']
      group_classes << 'first-check-box' if ix == 0
      group_classes << 'last-check-box' if ix == collection.size - 1
      form_group('check-box', method, options.merge(for: nil, label: builder.text, group_class: group_classes), html_options) do
        builder.check_box(html_options)
      end
    end
  end

  alias_method :old_radio_button, :radio_button
  def radio_button(method, tag_value, options = {}, &block)
    options[:label] = capture(&block) if block.present?
    form_group('radio-button', method, options) do
      old_radio_button(method, tag_value, options.except(*label_options))
    end
  end

  def money_field(method, options = {})
    options.merge!(prepend: '$')
    form_group('money-field', method, options) do
      old_phone_field(method, options)
    end
  end

  def percent_field(method, options = {})
    options.merge!(append: '%')
    form_group('percent-field', method, options) do
      old_phone_field(method, options)
    end
  end

  def number_field(method, options = {})
    form_group('number-field', method, options) do
      old_phone_field(method, options)
    end
  end

  def code_field(method, options = {})
    form_group('code-field', method, options) do
      old_text_field(method, options)
    end
  end

  def image_upload(method, options={})
    options[:label] = false
    form_group('image-upload', method, options) do
      picture_tag(object.send(method).url, class: options[:picture_class]) +
      file_field(method, options)
    end
  end

  def email_editor(method, options={})
    content_tag(:div, class: 'email-editor-container') do
      old_text_area(method, options)
    end
  end

  # -----------------------------------------------
  #  select2
  # -----------------------------------------------
  #  Enhanced select control using Select2 JS
  #  library, featuring a search function, tag
  #  support and optional images. Options:
  #
  #    path:            if provided, will use AJAX
  #                     for searching, posting the
  #                     queries to this endpoint
  #
  #    images:          allows results to show
  #                     images if true
  #
  #    default_image:   the default image to use
  #                     if no result-specific
  #                     image is available
  #
  #    allow_others:    allows new items to be
  #                     created beyond the
  #                     whitelist or what's
  #                     returned via AJAX
  #
  #    multiple:        whether to allow multiple
  #                     selections
  #
  #    search:          whether to include
  #                     searching
  # -----------------------------------------------

  def select2(method, whitelist = [], options = {})
    whitelist, options = [], whitelist if whitelist.is_a?(Hash)
    form_group('select2', method, options) do

      # Add some of the options to the element data
      # attribute
      data_attributes = %i{ path images default_image search }
      options[:data] = {} unless options[:data]
      options[:data].merge!(options.slice(*data_attributes))
      data_attributes.each{|a| options.delete a }

      # Grab the existing value(s) from the field -
      # we'll need to make sure they're in the
      # whitelist if it's empty
      existing_items = []
      if whitelist.empty?
        association = method.to_s.chomp('_ids').chomp('_id')
        existing_items = object.respond_to?(association) ? Array.wrap(object.send(association)).compact : []
      end

      # Create a hash of whitelist values, with key
      # as the index
      items = {}
      (whitelist + existing_items).each do |obj|
        k,v = if obj.is_a?(Array)
          [ obj[1], obj ]
        elsif obj.is_a?(ActiveRecord::Base)
          [ obj.id, [ obj.name, obj.id, obj.respond_to?(:small_image) ? { 'data-image' => obj.small_image.url } : nil ].compact ]
        else
          [ obj, [ obj, obj ]]
        end
        items[k] = v
      end

      old_select(method, items.values, {}, options)
    end
  end

  # Aliases - makes the form declarations more
  # readable
  def select_one(method, whitelist = [], options = {})
    select2(method, whitelist, options)
  end

  def select_many(method, whitelist = [], options = {})
    select2(method, whitelist, options.merge(multiple: true))
  end

  def phone_select(method, whitelist = [], options = {})
    select_one(method, whitelist, options.merge(
      allow_others: true,
      class: [options[:class], 'phone-field'].compact,
      group_class: [options[:group_class], 'phone-field'].compact)
    )
  end

  def tag_field(method, options = {})
    select2(method, [], options.merge(multiple: true, allow_others: true, search: false))
  end

  alias_method :old_fields_for, :fields_for
  def fields_for(method, object = nil, options = {}, &block)
    old_fields_for(method, object, self.options.merge(options)) do |subform|
      capture(subform, &block)
    end
  end

  def collection_fields(method, options = {}, &block)
    content_tag(:div, class: 'standard-form-collection-fields') do
      old_fields_for(method, options) do |subform|
        content_tag(:div, class: 'standard-form-collection-fieldset') do
          capture(subform, &block) +
          content_tag(:button, nil, type: :button, class: 'standard-form-collection-fieldset-remove')
        end
      end +
      content_tag(:button, options[:add_link_text] || "Add another #{method.to_s.singularize}...", type: :button, class: 'standard-form-collection-fields-add-button')
    end
  end

  def medium_editor(method, options = {})
    options[:class] = Array.wrap(options[:class])
    options[:class] << 'medium-editor'
    old_text_area(method, options)
  end

  # Override submit to produce a button
  alias_method :old_submit, :submit
  def submit(text, options = {})
    options[:type] = "submit"
    @template.content_tag(:button, text, options)
  end

  def radio_button_section(method, tag_value, label, options={}, &block)
    radio_button(method, tag_value, options.merge(label: label, autofocus: false)) +
    content_tag(:div, capture(&block), class: 'standard-form-radio-button-section')
  end

  def errors_for(method, options = {})
    error_tag(errors: error_message(method)) if has_error?(method)
  end

  # Used for the 'sectioned' and 'ios' layouts.
  # Defines a grouping of form controls by passing
  # in a block.
  def section(options = {}, &block)

    # Just render the contents as normal if this
    # form layout doesn't support sections
    unless sectioned? || ios?
      capture(&block)
    else

      # Create a form section div ...
      content_tag(:fieldset, class: ['standard-form-section', options[:title].present? ? options[:title].parameterize : nil].flatten.compact.uniq) do

        # ... and within it, render the inner block
        # contents based on the layout
        if sectioned?

          # Sectioned layout
          content_tag(:div, class: 'standard-form-section-left-column') do
            title_tag = content_tag(:h3, options[:title], class: 'standard-form-section-title')
            hint_tag = content_tag(:p, options[:hint].html_safe, class: 'standard-form-section-hint') if options[:hint].present?
            concat(title_tag) + concat(hint_tag)
          end +
          content_tag(:div, class: 'standard-form-section-right-column') do
            concat(capture(&block))
          end

        elsif ios?

          # iOS layout
          capture(&block)

        end
      end
    end
  end

  private

    # This is the main worker method. It creates a
    # group of the control, errors, hints etc. The
    # final structure should be:
    #
    #   .standard-form-group                <-- the main layout group
    #     .standard-form-label              <-- label
    #       .standard-form-label-text       <-- text of the label
    #       .standard-form-label-hint       <-- label hint
    #     .standard-form-control-container  <-- wraps prepend, the control and append (using table layout)
    #       .standard-form-control-prepend  <-- prepended add-ons (like '$')
    #       .standard-form-control-wrapper  <-- wraps the control and error icon
    #         .standard-form-control        <-- control (e.g. input, select etc.)
    #         .standard-form-error-icon     <-- error icon
    #       .standard-form-control-append   <-- appended add-ons (like '.00')
    #     .standard-form-error-message      <-- the error message
    #     .standard-form-hint               <-- the main control hint
    #
    def form_group(helper, method, options, html_options = nil)
      options.symbolize_keys!
      html_options.symbolize_keys! if html_options

      # Sometimes options is passed to us
      # containing HTML options (e.g. text_field)
      # and sometimes they're separated out (e.g.
      # select). Either way, add the control class
      # to one of them.
      html_options = html_options || options
      html_options[:class] = [html_options[:class], 'standard-form-control'].flatten.compact.uniq
      # Create a random ID if one isn't provided.
      # We want control of IDs because we use it to
      # set the 'for' attribute of the label.
      id = html_options[:id].presence || SecureRandom.uuid
      html_options[:id] = id

      # Maintain an array of classes to apply to
      # the group.
      group_classes = ['standard-form-group', method.to_s.parameterize, helper.parameterize.gsub(/_/, '-'), options[:group_class]].flatten.compact.uniq

      # If this is the first element, or the first
      # with an error, set autofocus to true
      unless @autofocus_set || options[:autofocus] === false || self.options[:disable_autofocus] || (object_has_error? && !has_error?(method, options))
        html_options[:autofocus] = true
        @autofocus_set = true
      end

      # Add a maxlength attribute if a
      # LengthValidator exists for this method
      max_length = max_length_for(method)
      html_options[:maxlength] = max_length unless max_length.nil?

      # Add error options
      options[:errors] = error_message(method, options) if has_error?(method, options)

      # Create the structure
      label_opts = options.slice(*label_options).reverse_merge(for: id, label: method.to_s.humanize)
      options = options.except(*label_options)
      control = yield
      div_tag(class: group_classes) do

        if horizontal?

          # If this is a horizontal layout, the
          # label goes in the left column, and
          # everything else in the right
          concat div_tag(label_tag(helper, label_opts), class: 'standard-form-horizontal-left-column')
          concat div_tag(control_error_hint_tags(control, options), class: 'standard-form-horizontal-right-column')

        else

          if contain_control_within_label?(helper)

            # Check box, radio button etc - wrap
            # the controls in the label. Doing this
            # as `concat (label_tag do end)` breaks
            # the unicorn renderer
            controls = label_tag(helper, label_opts) do
              concat label_text_tag(label_opts)
              concat label_hint_tag(label_opts)
              concat control_error_hint_tags(control, options)
            end
            concat controls

          else

            # Everything else - text inputs,
            # selects etc. Just render the label
            # above the other tags.
            concat label_tag(helper, label_opts)
            concat control_error_hint_tags(control, options)

          end
        end
      end
    end

    def label_tag(helper, options, &block)
      return nil unless show_label?(options) || contain_control_within_label?(helper)
      options[:class] = [options[:class], 'standard-form-label'].flatten.compact.uniq
      content_tag(:label, options) do
        concat label_text_tag(options)
        concat capture(&block) if block
        concat label_hint_tag(options)
      end
    end

    def div_tag(contents, options = nil, &block)
      options, contents = contents, nil if options.nil?
      content_tag(:div, contents, options, &block)
    end

    def control_error_hint_tags(control, options)
      capture do
        concat control_container_tag(control, options)
        concat error_tag(options)
        concat hint_tag(options)
      end
    end

    def control_container_tag(control, options)
      content_tag(:div, class: 'standard-form-control-container') do
        concat prepend_tag(options)
        concat control_wrapper_tag(control, options)
        concat append_tag(options)
      end
    end

    def error_tag(options)
      return nil unless options[:errors].present?
      content_tag(:div, options.delete(:errors), class: 'standard-form-error-message')
    end

    def hint_tag(options)
      return nil unless options[:hint].present?
      content_tag(:div, options.delete(:hint), class: 'standard-form-hint')
    end

    def control_wrapper_tag(control, options)
      content_tag(:div, class: 'standard-form-control-wrapper') do
        concat control
        concat error_icon_tag(options)
      end
    end

    def prepend_tag(options)
      return nil unless options[:prepend].present?
      content_tag(:span, options.delete(:prepend), class: 'standard-form-prepend')
    end

    def append_tag(options)
      return nil unless options[:append].present?
      content_tag(:span, options.delete(:append), class: 'standard-form-append')
    end

    def error_icon_tag(options)
      return nil unless options[:errors].present?
      content_tag(:i, nil, class: 'standard-form-error-icon')
    end

    def label_text_tag(options)
      return nil unless options[:label].present?
      content_tag(:span, options.delete(:label), class: 'standard-form-label-text')
    end

    def label_hint_tag(options)
      return nil unless options[:label_hint].present?
      content_tag(:span, options.delete(:label_hint), class: 'standard-form-label-hint')
    end

    def show_label?(options)
      !options.key?(:label) || options[:label].present?
    end

    # Helpers for which we want to wrap the controls
    # in a label e.g. check boxes
    def contain_control_within_label?(helper)
      %w{ check-box radio-button }.include?(helper)
    end

    # Query methods for the different form layouts
    def horizontal?
      self.options[:layout].to_s == 'horizontal'
    end

    def sectioned?
      self.options[:layout].to_s == 'sectioned'
    end

    def ios?
      self.options[:layout].to_s == 'ios'
    end

    def label_options
      %i{ label label_hint for }
    end

    # Does this particular attribute have errors?
    def has_error?(method, options={})
      (options[:errors].present? && options[:errors].any?) || (
        object.respond_to?(:errors) &&
        method.present? &&
        object.errors[method].any?
      )
    end

    # Does the object have any errors?
    def object_has_error?
      object.respond_to?(:errors) &&
      object.errors.any?
    end

    # Determine the error message for a given
    # method
    def error_message(method, options={})
      base_message = (options[:errors] || object.errors[method].presence).to_sentence
      needs_method_prepended = base_message.blank? || base_message[0] != base_message[0].upcase
      "#{needs_method_prepended ? method.to_s.humanize.titleize + ' ' : ''}#{base_message}".html_safe
    end

    # Given a method, determine the maximum length
    # for the field, based upon the presence and
    # configuration of a LengthValidator
    def max_length_for(method)
      return nil unless method.present?
      return nil unless object.present?
      return nil unless object.respond_to?(method)
      v = object.class.validators_on(method).select{|v| v.is_a?(ActiveModel::Validations::LengthValidator) }.first
      return nil unless v.present?
      v.options[:maximum]
    end

end
