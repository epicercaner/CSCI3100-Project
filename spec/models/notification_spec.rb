require 'rails_helper'

RSpec.describe 'Notification model', type: :model do
  it 'is currently undefined in app/models' do
    expect(defined?(Notification)).to be_nil
  end
end
