Rails.application.routes.draw do
  root 'home#index'
  get 'home/about'
  get 'home/newsolar'
  get 'home/service'
  get 'home/upgrades'

  get 'resources/batteries'
  get 'resources/solarpower'
  get 'resources/monitoring'
end
