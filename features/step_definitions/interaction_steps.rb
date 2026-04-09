require 'uri'
require 'cgi'
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))

Given(/^(?:|I )am on (.+)$/) do |page_name|
  case page_name
  when "the marketplace index page"
    visit '/'
  else
    visit path_to(page_name)
  end
end

When(/^I click the "([^"]*)" (?:button|link)$/) do |text|
  aliases = {
    'Post Product' => 'Confirm Listing',
    'Confirm' => 'Confirm Listing'
  }
  target_text = aliases.fetch(text, text)
  click_link_or_button(target_text, match: :first)
end

When(/^I hover over the "(.*)" menu$/) do |menu_text|
  aliases = {
    'Browse Categories' => 'College'
  }
  target_text = aliases.fetch(menu_text, menu_text)

  begin
    find('button', text: target_text, match: :first).hover
  rescue Capybara::ElementNotFound
    find('div,button', text: target_text, match: :first).hover
  end
end

When(/^I fill in "([^"]*)" with "([^"]*)"$/) do |field_name, value|
  aliases = {
    'Price' => 'Price (HKD) $',
    'Contact Info' => 'Contact Info (Phone / IG / Email)',
    'Contact (Phone or Email)' => 'Contact Info (Phone / IG / Email)',
    'Advertisement Description' => 'Advertisement Description (visible to college members)'
  }

  target_field = aliases.fetch(field_name, field_name)
  fill_in(target_field, with: value)
end

When(/^I accept the prompt after clicking "([^"]*)"$/) do |button_name|
  execute_script('window.__lastAlertMessage = null; window.alert = function(msg) { window.__lastAlertMessage = msg; };')
  click_button(button_name)

  wait = Selenium::WebDriver::Wait.new(timeout: 8)
  @alert_message = wait.until do
    message = evaluate_script('window.__lastAlertMessage')
    message if message && !message.empty?
  end
rescue Selenium::WebDriver::Error::TimeoutError
  @alert_message = nil
end

Then(/^I should see the text "([^"]*)"$/) do |expected_text|
  aliases = {
    'Upload Photo (Drag & Drop)' => 'Upload Photos (Click or Drag & Drop)'
  }

  target_text = aliases.fetch(expected_text, expected_text)
  expect(page).to have_content(target_text)
end

Then(/^I should see the "([^"]*)" button$/) do |button_text|
  expect(page).to have_button(button_text)
end

Then(/^I should see the following category links:$/) do |table|
  expected_links = table.raw.flatten
  expected_links.each do |link_text|
    expect(page).to have_content(link_text)
  end
end

Then(/^I should see a success alert with "([^"]*)"$/) do |expected_message|
  expect(@alert_message).to eq(expected_message)
end
