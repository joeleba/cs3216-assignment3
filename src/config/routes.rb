Rails.application.routes.draw do
  root to: 'main#index'

  # Put in /api namespace to make it clearer
  # /v1 indicate the api version. For maintainability.
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      scope :services do
        get '/' => 'services#index'
        scope '/:id' do
          get '/stops' => 'services#stops'
          get '/' => 'services#show'
        end
      end

      scope :stops do
        get '/' => 'stops#index'
        scope '/:id' do
          get '/services' => 'stops#services'
          get '/' => 'stops#show'
        end
      end

      scope :users do
        scope '/:id' do
          get '/' => 'user#show'
          post '/' => 'user#create'
          delete '/' => 'user#destroy'
          scope '/credit' do
            put '/' => 'users#update_credit'
          end
        end
      end
    end
  end
end
