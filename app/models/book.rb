class Book < ActiveRecord::Base
	has_many :pages
	belongs_to :user
  	mount_uploader :index_image, ImageUploader
  	mount_uploader :together_photo, ImageUploader
  	mount_uploader :last_image, ImageUploader
  	accepts_nested_attributes_for :pages, :allow_destroy => true
end
