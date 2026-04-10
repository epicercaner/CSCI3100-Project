require 'rails_helper'

RSpec.describe PriceHistory, type: :model do
  let(:seller) { create(:user, verified_at: Time.current) }
  let(:product) { create(:product, seller_id: seller.id) }

  subject(:price_history) { described_class.new(product: product, price: 99.5, date: Time.current) }

  it { is_expected.to belong_to(:product) }
  it { is_expected.to validate_presence_of(:product_id) }
  it { is_expected.to validate_presence_of(:price) }

  it 'is valid with product and price' do
    expect(price_history).to be_valid
  end
end
