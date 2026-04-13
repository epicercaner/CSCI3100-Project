When(/^I click the "Edit Profile" button$/) do
  click_button("Edit Profile")
end

When(/^I fill in "([^"]*)" with "([^"]*)"$/) do |field_name, value|
  fill_in(field_name, with: value)
end

When(/^I select "([^"]*)" from "([^"]*)"$/) do |option, dropdown_name|
  select(option, from: dropdown_name)
end

When(/^I click the "Save" button$/) do
  click_button("Save")
end

Then(/^I should see "([^"]*)"$/) do |message|
  expect(page).to have_content(message)
end

Then(/^my profile should display "([^"]*)"$/) do |expected_text|
  expect(page).to have_content(expected_text)
end

Then(/^the account "([^"]*)" should have college "([^"]*)" and hostel "([^"]*)"$/) do |email, college, hostel|
  user = User.find_by!(email: email)
  expect(user.college).to eq(college)
  expect(user.hostel).to eq(hostel)
end

Then(/^the profile should still be in edit mode$/) do
  expect(page).to have_button("Cancel")
  expect(page).to have_selector('select[name="college"]')
end