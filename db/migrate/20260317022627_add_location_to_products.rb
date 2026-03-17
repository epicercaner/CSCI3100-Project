class AddLocationToProducts < ActiveRecord::Migration[8.1]
  def change
    add_column :products, :location, :string
  end
end
