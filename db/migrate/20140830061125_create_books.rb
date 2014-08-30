class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :index_word
      t.string :index_image
      t.string :second_weather
      t.string :second_mood
      t.string :second_friend
      t.string :together_photo
      t.string :creator
      t.string :last_image

      t.timestamps
    end
  end
end
