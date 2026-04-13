Given(/^I am logged in as a seller$/) do
  user = { id: 1, name: "Seller User" }
  allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
end

Given(/^I have the following products in my selling list:$/) do |table|
  products_data = table.hashes.map do |row|
    {
      id: row['id'].to_i,
      name: row['name'],
      price: row['price'],
      status: row['status'],
      images: ["https://via.placeholder.com/50"]
    }
  end
  allow_any_instance_of(Object).to receive(:getMySellingProducts).and_return(products_data)
end

Given(/^I have no products listed for sale$/) do
  allow_any_instance_of(Object).to receive(:getMySellingProducts).and_return([])
end

When(/^I visit my selling products page$/) do
  visit "/selling"
end

When(/^I click the "Edit" button for "([^"]*)"$/) do |name|
  row = find('tr', text: name)
  within(row) { click_button("Edit") }
end

When(/^I click the view icon for "([^"]*)"$/) do |name|
  row = find('tr', text: name)
  within(row) { find('button svg').click }
end

When(/^I click the "Delete" button for "([^"]*)"$/) do |name|
  row = find('tr', text: name)
  within(row) { click_button("Delete") }
end

When(/^I confirm the deletion dialog$/) do
  page.driver.browser.switch_to.alert.accept rescue nil
end

Then(/^I should see a table row for "([^"]*)" with price "([^"]*)" and status "([^"]*)"$/) do |name, price, status|
  row = find('tr', text: name)
  expect(row).to have_content("$#{price}")
  expect(row).to have_content(status)
end

Then(/^I should be redirected to the edit page for product "([^"]*)"$/) do |id|
  expect(current_path).to eq("/edit/#{id}")
end

Then(/^I should be redirected to the detail page for product "([^"]*)"$/) do |id|
  expect(current_path).to eq("/product/#{id}")
end

Then(/^I should see "([^"]*)"$/) do |message|
  expect(page).to have_content(message)
end

Then(/^the product "([^"]*)" should no longer be in the list$/) do |name|
  expect(page).not_to have_content(name)
end