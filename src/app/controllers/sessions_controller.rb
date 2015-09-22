class SessionsController < ApplicationController
  def create
    omniauth_hash = env['omniauth.auth']
    user = User.from_omniauth(omniauth_hash)
    session[:user_id] = user.id
    redirect_to '#/location'
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end

  def signed_in
    render json: { user: session[:user_id] }
  end

end
