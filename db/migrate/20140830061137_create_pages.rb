class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :word
      t.string :image

      t.timestamps
    end
  end
end
