class ChangeMessagesTable < ActiveRecord::Migration[8.1]
  def change
    change_table :messages do |t|
      t.remove :seller_id, :interested_id, :item_id, :message
    end

    change_table :messages do |t|
      t.references :chat, null: false, foreign_key: { to_table: :chats }
      t.text :message
    end
  end
end
