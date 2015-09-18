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
          get '/' => 'users#show'
          post '/' => 'users#create'
          delete '/' => 'users#destroy'
          scope '/credit' do
            put '/' => 'users#update_credit'
          end
        end
      end

      scope :sightings do
        get '/' => 'sightings#get_sighting'
        post '/' => 'sightings#post_sighting'
      end

      scope :locations do
        get '/' => 'locations#nearby'
      end
    end
  end

  # Authentication Routes
  scope :auth do
    scope '/:provider' do
      scope '/callback' do
        get '/' => 'sessions#create'
        post '/' => 'sessions#create'
      end
    end
    get '/failure' => redirect('#')
    get '/signed_in' => 'sessions#signed_in'
  end

  get 'signout' => 'sessions#destroy'
end
