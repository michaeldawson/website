module StandardFormHelper

  def standard_form_for(object, options = {}, &block)
    options.reverse_merge!({builder: StandardFormBuilder})

    # Set the classes
    layout = "standard-form-#{options[:layout]}" if options[:layout].present? && %i{ horizontal ios sectioned }.include?(options[:layout].to_sym)
    options[:html] ||= {}
    options[:html][:class] = [options[:html][:class], 'standard-form', layout].compact.uniq

    # Disable normal field error handling,
    # otherwise it wraps error fields in
    # .field_with_error and messes with our
    # styling.
    temporarily_disable_field_error_proc do

      # Add base errors at the top of the form (if
      # applicable)
      form_for(object, options) do |f|
        output = capture(f, &block)
        if object.respond_to?(:errors) && object.errors[:base].any? && !options[:override_base_error_rendering]
          content_tag(:div, object.errors[:base].to_sentence, class: 'standard-form-error-message base-error-message') + output
        else
          output
        end
      end
    end

  end

  def standard_form_tag(options = {}, &block)
    options[:acts_like_form_tag] = true
    standard_form_for("", options, &block)
  end

  # Temporarily disable the normal field error proc,
  # for all code within the given block.
  def temporarily_disable_field_error_proc
    original_proc = ActionView::Base.field_error_proc
    ActionView::Base.field_error_proc = proc { |input, instance| input }
    yield
  ensure
    ActionView::Base.field_error_proc = original_proc
  end

end
