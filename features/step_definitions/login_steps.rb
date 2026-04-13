Given(/^the user "([^"]*)" is unverified$/) do |email|
  user = User.find_by!(email: email)
  user.update!(verified_at: nil)
end

When(/^I enter "([^"]*)" as email$/) do |email|
  fill_in('1155xxxxxx@link.cuhk.edu.hk', with: email, match: :first)
end

When(/^I enter "([^"]*)" as password$/) do |password|
  fill_in('Enter your password', with: password)
end

Then(/^I should see a(?:n)? (success|error) notification "([^"]*)"$/) do |type, message|
  expect(page).to have_content(message)
end

Then(/^I should be redirected to the "([^"]*)" page$/) do |page_name|
  expected_path = path_to("the #{page_name.downcase} page")
  expect(current_path.downcase.chomp('/')).to eq(expected_path.downcase.chomp('/'))
end

Then(/^the email input should show a validation error$/) do
  is_valid = page.evaluate_script("document.querySelector('input[type=\"email\"]').checkValidity()")
  expect(is_valid).to be false
end