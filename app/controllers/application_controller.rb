class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, if: :json_request?

  helper_method :current_user

  def current_user
  	@current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  protected

  def json_request?
  	request.format.json?
  end

end
