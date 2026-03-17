class User < ApplicationRecord
    has_many :buyer, class_name: 'Product', foreign_key: 'buyer_id'
    has_many :seller, class_name: 'Product', foreign_key: 'seller_id'

    has_many :sales, class_name: "Chat", foreign_key: 'seller_id'
    has_many :interested, class_name: "Chat", foreign_key: 'interested_id'
end
