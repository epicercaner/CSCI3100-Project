class Message < ApplicationRecord
    belongs_to :chat_id, class_name: 'Chat'
end
