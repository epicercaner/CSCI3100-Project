require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }

    it 'rejects duplicate email' do
      existing = create(:user, email: '1155123000@link.cuhk.edu.hk')
      duplicate = build(:user, email: existing.email)

      expect(duplicate).not_to be_valid
      expect(duplicate.errors[:email]).to include('has already been taken')
    end

    it 'accepts valid CUHK email format' do
      user = build(:user, email: '1155123456@link.cuhk.edu.hk')

      expect(user).to be_valid
    end

    it 'rejects invalid email format' do
      user = build(:user, email: 'user@example.com')

      expect(user).not_to be_valid
      expect(user.errors[:email]).to include('is invalid')
    end
  end

  describe '.admins' do
    it 'returns only admin users' do
      admin = create(:user, is_admin: true, verified_at: Time.current)
      non_admin = create(:user, is_admin: false, verified_at: Time.current)

      expect(User.admins).to include(admin)
      expect(User.admins).not_to include(non_admin)
    end
  end

  describe '#generate_verification_otp!' do
    it 'generates six-digit otp and sets sent timestamp' do
      user = build(:user)

      user.generate_verification_otp!

      expect(user.verification_otp).to match(/\A\d{6}\z/)
      expect(user.verification_sent_at).to be_present
    end
  end

  describe '#verify_otp!' do
    it 'verifies and clears otp fields when otp is correct and not expired' do
      user = create(:user, verified_at: nil)
      user.update!(verification_otp: '123456', verification_sent_at: Time.current)

      result = user.verify_otp!('123456')

      expect(result).to be_truthy
      user.reload
      expect(user.verified_at).to be_present
      expect(user.verification_otp).to be_nil
      expect(user.verification_sent_at).to be_nil
    end

    it 'returns false for expired otp' do
      user = create(:user, verified_at: nil)
      user.update!(verification_otp: '123456', verification_sent_at: 2.days.ago)

      expect(user.verify_otp!('123456')).to be(false)
    end

    it 'returns false for wrong otp' do
      user = create(:user, verified_at: nil)
      user.update!(verification_otp: '123456', verification_sent_at: Time.current)

      expect(user.verify_otp!('654321')).to be(false)
    end
  end

  describe 'aliases' do
    it 'aliases hall to hostel' do
      user = build(:user, hostel: 'On-campus')

      expect(user.hall).to eq('On-campus')
    end
  end
end
