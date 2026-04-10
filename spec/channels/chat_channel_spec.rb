require 'rails_helper'

RSpec.describe ChatChannel, type: :channel do
  before do
    stub_connection
  end

  describe '#subscribed' do
    it 'starts streaming when chat_id is present' do
      subscribe(chat_id: 123)

      expect(subscription).to be_confirmed
      expect(subscription).to have_stream_from('chat_123')
    end

    it 'rejects subscription when chat_id is missing' do
      subscribe

      expect(subscription).to be_rejected
    end
  end

  describe '#unsubscribed' do
    it 'can be called without raising errors' do
      subscribe(chat_id: 456)

      expect { subscription.unsubscribed }.not_to raise_error
    end
  end
end
