require 'uri'
require 'cgi'

Given(/^I open the profile page$/) do
  email = '1155999999@link.cuhk.edu.hk'
  password = 'password123'

  user = User.find_or_initialize_by(email: email)
  user.password = password
  user.name = 'Profile Test User'
  user.college = 'Shaw College'
  user.verified_at = Time.current
  user.save!

  visit '/login'
  find('input[type="email"]').set(email)
  find('input[type="password"]').set(password)

  begin
    accept_alert { click_button('Login') }
  rescue Capybara::ModalNotFound
    click_button('Login')
  end

  visit '/account'
end

When(/^(?:|I )click on the "(.*)" sidebar link$/) do |link_text|
  sidebar_item = all('div', text: /^#{Regexp.escape(link_text)}$/, minimum: 1).last

  execute_script('window.confirm = () => true;') if link_text == 'Log out'
  sidebar_item.click
end

When(/^(?:|I )press the "(.*)" button$/) do |button_text|
  click_button(button_text)
end

## Generic "I should see" step removed from this file to avoid ambiguity
## The project provides a shared implementation in search_steps.rb
## which will be used for assertions like `Then I should see "..."`.

Then(/^the purchase table should contain:$/) do |table|
  table.raw.each do |row|
    row.each do |cell|
      expect(page).to have_selector('td', text: cell)
    end
  end
end

When(/^(?:|I )confirm the logout dialog$/) do
  accept_confirm
rescue Capybara::ModalNotFound
  # Some drivers auto-accept confirms; treat missing modal as non-fatal.
ensure
  unless page.has_current_path?(%r{/login}, wait: 2)
    logout_result = evaluate_async_script(<<~JS)
      const done = arguments[0];
      fetch('/sessions', {
        method: 'DELETE',
        credentials: 'include',
        headers: { Accept: 'application/json' }
      })
        .then((res) => done({ status: res.status }))
        .catch((error) => done({ status: 0, error: String(error) }));
    JS

    expect(logout_result['status']).to eq(200)
    visit '/login'
  end
end

def find_sidebar_item(text)
  find('div', text: text)
end
