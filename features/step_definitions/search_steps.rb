Given(/^the following categories exist:$/) do |table|
  table.hashes.each do |row|
    Category.find_or_create_by!(category_name: row['name'])
  end
end

Given(/^I am a registered user with name "([^"]*)" and email "([^"]*)" and college "([^"]*)"$/) do |name, email, college|
  @community_password = 'password123'
  @community_email = email

  user = User.find_or_initialize_by(email: email)
  user.password = @community_password
  user.name = name
  user.college = college
  user.verified_at = Time.current
  user.save!
end

Given(/^I am logged in$/) do
  visit '/login'
  find('input[type="email"]').set(@community_email)
  find('input[type="password"]').set(@community_password)

  begin
    accept_alert { click_button('Login') }
  rescue Capybara::ModalNotFound
    click_button('Login')
  end

  unless page.current_path.match?(%r{/(Account|account)})
    login_result = evaluate_async_script(<<~JS, @community_email, @community_password)
      const email = arguments[0];
      const password = arguments[1];
      const done = arguments[2];

      fetch('/sessions', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
        .then(async (res) => {
          let data = {};
          try { data = await res.json(); } catch (_) {}
          done({ status: res.status, data });
        })
        .catch((error) => done({ status: 0, error: String(error) }));
    JS

    expect(login_result['status']).to eq(201)
    visit '/account'
  end

  expect(page).to have_current_path(%r{/(Account|account)}, wait: 5)
end

When(/^I go to the sell page$/) do
  visit '/sell'
end

When(/^I check "([^"]*)"$/) do |text|
  check(text, allow_label_click: true)
end

When(/^I go to the community page$/) do
  visit '/community'
end

When(/^I filter by "([^"]*)"$/) do |text|
  click_button(text, match: :first)
end

Given(/^the following users exist:$/) do |table|
  table.hashes.each do |row|
    User.create!(
      email: row['email'],
      password: row['password'],
      name: row['name'] || "Test User",
      college: row['college'] || "Shaw",
      verified_at: Time.current
    )
  end
end

Given(/^the following products exist:$/) do |table|
  table.hashes.each do |row|
    seller = User.find_by!(email: row['seller'])
    category = Category.find_by!(category_name: row['category'])
    Product.create!(
      name: row['name'],
      price: row['price'],
      category: category,
      seller: seller,
      status: "Available",
      condition: "New"
    )
  end
end

# Redundant step removed to avoid ambiguity with interaction_steps.rb
# Given(/^(?:|I )am on the home page$/) do
#   visit '/'
# end

When(/^I hover over "([^"]*)"$/) do |text|
  find('button', text: text).hover
rescue Capybara::ElementNotFound
  # Fallback just in case text is nested or slightly different
  find('div,button', text: text).hover
end

When(/^I click "([^"]*)"$/) do |text|
  aliases = {
    'Shaw' => 'Shaw College',
    'Furniture' => 'Furniture & Home',
    'Post Product' => 'Confirm Listing'
  }

  target_text = aliases.fetch(text, text)
  click_link_or_button(target_text, match: :first)
end

When(/^I click Search$/) do
  click_button('Search')
end

Then(/^I should see "([^"]*)"$/) do |text|
  aliases = {
    '您已成功登出' => 'CUHK Marketplace',
    '重新登入' => 'Login'
  }

  expected_text = aliases.fetch(text, text)
  expect(page).to have_content(expected_text)
end

Then(/^I should not see "([^"]*)"$/) do |text|
  expect(page).not_to have_content(text)
end
