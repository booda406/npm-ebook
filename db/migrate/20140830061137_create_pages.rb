class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :title
      t.string :word
      t.string :image
      t.integer :book_id

      t.timestamps
    end
  end
end
