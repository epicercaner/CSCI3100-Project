Given(/^I am logged in as "([^"]*)"$/) do |email|
  visit "/login"
  fill_in('1155xxxxxx@link.cuhk.edu.hk', with: email)
  fill_in('Enter your password', with: 'password123') 
  click_button('Login')
  expect(page).to have_content("Login Success!") 
end

Given(/^a chat exists between "([^"]*)" and "([^"]*)" for product "([^"]*)"$/) do |buyer_email, seller_email, product_name|
  buyer = User.find_by!(email: buyer_email)
  seller = User.find_by!(email: seller_email)
  product = Product.find_by!(name: product_name)
  Chat.find_or_create_by!(
    item_id: product.id,
    interested_id: buyer.id,
    seller_id: seller.id
  )
end

When(/^I select the chat for "([^"]*)" from the sidebar$/) do |product_name|
  expect(page).not_to have_content("Loading...")
  within('div[class*="Sidebar"]') do
    find('div', text: product_name, match: :first).click
  end
end

When(/^I type "([^"]*)" into the message input$/) do |text|
  fill_in('Type a message...', with: text)
end

When(/^I click the "Send" button$/) do
  click_button("Send")
end

When(/^I confirm the browser popup$/) do
  sleep 0.5 
  page.driver.browser.switch_to.alert.accept rescue nil 
end

Then(/^the chat should show a "([^"]*)" badge in the sidebar$/) do |badge_text|
  within('div[class*="Sidebar"]') do
    expect(page).to have_content(badge_text)
  end
end

Then(/^I should see "([^"]*)" in the chat window$/) do |message|
  within('#chat-container') do
    expect(page).to have_content(message)
  end
end

Then(/^I should see a system message "([^"]*)"$/) do |text|
  expect(page).to have_selector('div', text: text)
end

Then(/^the chat should become read-only with status "([^"]*)"$/) do |status_text|
  expect(page).not_to have_selector('form')
  expect(page).to have_content(status_text)
end

Then(/^the product "([^"]*)" should be marked as "([^"]*)" in the database$/) do |product_name, status|
  product = Product.find_by!(name: product_name)
  expect(product.status).to eq(status)
end