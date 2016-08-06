class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.datetime :posted
      t.string :category
      t.text :body, limit: 4294967295

      t.timestamps
    end
  end
end
