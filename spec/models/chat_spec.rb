require 'rails_helper'

RSpec.describe Chat, type: :model do
  let(:seller) { create(:user, verified_at: Time.current) }
  let(:buyer) { create(:user, verified_at: Time.current) }
  let(:product) { create(:product, seller_id: seller.id) }

  subject(:chat) do
    build(:chat, item_id: product.id, seller_id: seller.id, interested_id: buyer.id)
  end

  it { is_expected.to belong_to(:product).with_foreign_key('item_id') }
  it { is_expected.to belong_to(:interested_user).with_foreign_key('interested_id').class_name('User') }
  it { is_expected.to belong_to(:seller).with_foreign_key('seller_id').class_name('User') }
  it { is_expected.to have_many(:messages).with_foreign_key('chat_id').dependent(:destroy) }

  it { is_expected.to validate_presence_of(:item_id) }
  it { is_expected.to validate_presence_of(:interested_id) }
  it { is_expected.to validate_presence_of(:seller_id) }

  it 'aliases product_id to item_id' do
    persisted_chat = create(:chat, item_id: product.id, seller_id: seller.id, interested_id: buyer.id)

    expect(persisted_chat.product_id).to eq(persisted_chat.item_id)
  end
end
