class Product < ApplicationRecord
    belongs_to :buyer, class_name: 'User', foreign_key: 'buyer_id'
    belongs_to :seller, class_name: 'User', foreign_key: 'seller_id'
    belongs_to :category, optional: true

    has_many :interests, class_name: 'Interest', foreign_key: 'item_id', dependent: :destroy
    has_many :price_histories, class_name: 'PriceHistory', foreign_key: 'product_id', dependent: :destroy
    has_many :chats, foreign_key: 'item_id', dependent: :destroy

    has_many_attached :image

    include PgSearch::Model

    pg_search_scope :search_by_name, against: :name, using: { trigram: { threshold: 0.2 } }
    # Adjust the threshold from 0 to 1 for strictness
end
end
