class SessionsController < ApplicationController
  def create
    omniauth_hash = env['omniauth.auth']
    user = User.from_omniauth(omniauth_hash)
    session[:user_id] = user.id
    redirect_to '#/login'
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end

  def signed_in
    render json: { user: session[:user_id] }
  end

  # def validate_token
  #   validity = User.exists?(:uid => params[:session][:uid], :oath_token => params[:session][:oath_token])
  #   redenr json: {}
  # end

end
