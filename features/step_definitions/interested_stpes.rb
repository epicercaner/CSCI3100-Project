Given(/^the system has the following interest records for me:$/) do |table|
  interests_data = table.hashes.map do |row|
    {
      id: row['id'],
      name: row['name'],
      price: row['price'],
      status: row['status'],
      images: []
    }
  end
  allow_any_instance_of(ApplicationController).to receive(:fetch_interests_api).and_return(interests_data)
end

Given(/^I have no interested items$/) do
  allow_any_instance_of(ApplicationController).to receive(:fetch_interests_api).and_return([])
end

When(/^I navigate to the interested items page$/) do
  visit "/interested"
end

When(/^I click on the item card for "([^"]*)"$/) do |product_name|
  find('h3', text: product_name).click
end

Then(/^I should see "([^"]*)" with price "([^"]*)"$/) do |name, price|
  expect(page).to have_content(name)
  expect(page).to have_content("$#{price} HKD")
end

Then(/^the status for "([^"]*)" should be "([^"]*)"$/) do |name, status|
  card = find('h3', text: name).find(:xpath, '../..')
  expect(card).to have_content("Status: #{status}")
end

Then(/^I should be redirected to the product page with ID "([^"]*)"$/) do |product_id|
  expect(current_path).to eq("/product/#{product_id}")
end