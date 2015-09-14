class SessionsController < ApplicationController
  def create
    omniauth_hash = env['omniauth.auth']
    user = User.from_omniauth(omniauth_hash)
    session[:user_id] = user.id
    redirect_to '#/main'
  end

  def destroy
    session[:user_id] = nil
    redirect_to '#'
  end

end
