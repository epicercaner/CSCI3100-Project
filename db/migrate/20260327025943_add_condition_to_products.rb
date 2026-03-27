class AddConditionToProducts < ActiveRecord::Migration[8.1]
  def change
    add_column :products, :condition, :string
  end
end
