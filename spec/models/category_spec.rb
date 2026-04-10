require 'rails_helper'

RSpec.describe Category, type: :model do
  it { is_expected.to have_many(:products).dependent(:nullify) }

  it 'is creatable with a category name' do
    category = create(:category, category_name: 'Electronics')

    expect(category).to be_persisted
    expect(category.category_name).to eq('Electronics')
  end
end
