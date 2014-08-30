GepubTest::Application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create' # 登入
  get 'auth/failure', to: redirect('/') # 有error
  get 'signout', to: 'sessions#destroy', as: 'signout' # 登出
 
  resources :sessions, only: [:create, :destroy]
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'epub#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # 產生book model
  get 'books/new' => 'epub#book_new'
  post 'books' => 'epub#book_create'

  # 產生epub檔案
  get 'ebook' => 'epub#generate_ebook'

  # 觀看epub檔案
  get 'epub' => 'epub#index'

  # parse Epub
  get 'parse' => 'epub#parse_epub'

  # 素材庫
  get 'image_library' => 'epub#image_library', as: :image_library

  # upload image (棄用)
  get 'image_new' => 'epub#image_new', as: :image_new
  post 'image_new' => 'epub#image_create'

  # 下載素材褲圖片
  get 'download_image' => 'epub#download_image', as: :download_image

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
