require 'rails_helper'

RSpec.describe Interest, type: :model do
  let(:seller) { create(:user, verified_at: Time.current) }
  let(:user) { create(:user, verified_at: Time.current) }
  let(:product) { create(:product, seller_id: seller.id) }

  subject(:interest) { described_class.new(interested_id: user.id, item_id: product.id) }

  it { is_expected.to belong_to(:interested_user).with_foreign_key('interested_id').class_name('User') }
  it { is_expected.to belong_to(:product).with_foreign_key('item_id') }

  it { is_expected.to validate_presence_of(:interested_id) }
  it { is_expected.to validate_presence_of(:item_id) }

  it 'prevents duplicate interests for the same user and product' do
    described_class.create!(interested_id: user.id, item_id: product.id)
    duplicate = described_class.new(interested_id: user.id, item_id: product.id)

    expect(duplicate).not_to be_valid
    expect(duplicate.errors[:interested_id]).to include('has already been taken')
  end
end
