Given(/^I am logged in as a user with ID (\d+) and name "([^"]*)"$/) do |id, name|
  user_data = { id: id.to_i, name: name }
  allow_any_instance_of(ApplicationController).to receive(:current_user_session).and_return(user_data)
end

Given(/^the following chats exist for me:$/) do |table|
  chats_data = table.hashes.map do |row|
    {
      id: row['id'],
      seller: { id: row['seller_id'].to_i, name: row['seller_name'] },
      buyer: { id: row['buyer_id'].to_i, name: row['buyer_name'] },
      product: { name: "Sample Product" },
      last_message: row['last_message'],
      updated_at: Time.now.iso8601
    }
  end
  allow_any_instance_of(ApplicationController).to receive(:fetch_chats_api).and_return(chats_data)
end

Given(/^I have no chats$/) do
  allow_any_instance_of(ApplicationController).to receive(:fetch_chats_api).and_return([])
end

When(/^I visit the notification page$/) do
  visit "/notifications"
end

When(/^I click on the chat with "([^"]*)"$/) do |partner_name|
  find('strong', text: partner_name).click
end

Then(/^I should see a chat with "([^"]*)"$/) do |name|
  expect(page).to have_content(name)
end

Then(/^I should see the message "([^"]*)" for the chat with "([^"]*)"$/) do |msg, name|
  card = find('strong', text: name).find(:xpath, '../..')
  expect(card).to have_content(msg)
end

Then(/^I should see "([^"]*)" badge for the chat with "([^"]*)"$/) do |badge_text, name|
  card = find('strong', text: name).find(:xpath, '../..')
  expect(card).to have_selector('span', text: badge_text)
end

Then(/^the message for "([^"]*)" should be styled as an error$/) do |name|
  card = find('strong', text: name).find(:xpath, '../..')
  message_element = card.find('p')
  expect(message_element.native.css_value('color')).to eq('rgba(220, 53, 69, 1)')
end

Then(/^I should be redirected to the chat page for chat ID "([^"]*)"$/) do |chat_id|
  expect(current_url).to include("/chat?chat_id=#{chat_id}")
end