require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:seller) { create(:user, verified_at: Time.current) }
  let(:buyer) { create(:user, verified_at: Time.current) }
  let(:product) { create(:product, seller_id: seller.id) }
  let(:chat) { create(:chat, item_id: product.id, seller_id: seller.id, interested_id: buyer.id) }

  subject(:message_record) { build(:message, chat: chat, sender: buyer, message: 'hello') }

  it { is_expected.to belong_to(:chat).with_foreign_key('chat_id') }
  it { is_expected.to belong_to(:sender).with_foreign_key('sender_id').class_name('User') }

  it { is_expected.to validate_presence_of(:chat_id) }
  it { is_expected.to validate_presence_of(:sender_id) }
  it { is_expected.to validate_presence_of(:message) }

  it 'broadcasts payload to chat stream after create' do
    allow(ActionCable.server).to receive(:broadcast)

    created_message = create(:message, chat: chat, sender: buyer, message: 'hello world')

    expect(ActionCable.server).to have_received(:broadcast).with(
      "chat_#{chat.id}",
      hash_including(
        id: created_message.id,
        chat_id: chat.id,
        message: 'hello world',
        sender: hash_including(id: buyer.id, name: buyer.name)
      )
    )
  end
end
