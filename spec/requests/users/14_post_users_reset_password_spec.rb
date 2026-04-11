require 'rails_helper'
require 'tempfile'

RSpec.describe 'Users API', type: :request do
  describe 'POST /users/reset_password' do
    let(:verified_user) { create(:user, verified_at: Time.current) }
    let(:unverified_user) { create(:user, verified_at: nil) }

    before do
      verified_user.generate_verification_otp!
      verified_user.save!
    end

    context 'with valid OTP' do
      it 'resets the password' do
        expect {
          post reset_password_users_path, params: {
            email: verified_user.email,
            otp: verified_user.verification_otp,
            new_password: 'NewSecurePassword123'
          }
        }.to change { verified_user.reload.authenticate('NewSecurePassword123') }.from(false).to(verified_user)
      end

      it 'clears OTP after password reset' do
        post reset_password_users_path, params: {
          email: verified_user.email,
          otp: verified_user.verification_otp,
          new_password: 'NewSecurePassword123'
        }

        verified_user.reload
        expect(verified_user.verification_otp).to be_nil
        expect(verified_user.verification_sent_at).to be_nil
      end

      it 'returns success message' do
        post reset_password_users_path, params: {
          email: verified_user.email,
          otp: verified_user.verification_otp,
          new_password: 'NewSecurePassword123'
        }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to include('message' => 'password_reset')
      end
    end

    context 'with invalid OTP' do
      it 'returns unprocessable content' do
        post reset_password_users_path, params: {
          email: verified_user.email,
          otp: '000000',
          new_password: 'NewSecurePassword123'
        }

        expect(response).to have_http_status(:unprocessable_content)
        expect(JSON.parse(response.body)).to include('error' => 'invalid_or_expired_otp')
      end

      it 'does not change the password' do
        post reset_password_users_path, params: {
          email: verified_user.email,
          otp: '000000',
          new_password: 'NewSecurePassword123'
        }

        expect(verified_user.reload.authenticate('SecurePassword123')).to eq(verified_user)
      end
    end

    context 'when OTP is expired' do
      it 'returns unprocessable content' do
        verified_user.update!(verification_sent_at: 25.hours.ago)

        post reset_password_users_path, params: {
          email: verified_user.email,
          otp: verified_user.verification_otp,
          new_password: 'NewSecurePassword123'
        }

        expect(response).to have_http_status(:unprocessable_content)
      end
    end

    context 'with missing required parameters' do
      it 'fails when email is missing' do
        post reset_password_users_path, params: {
          otp: verified_user.verification_otp,
          new_password: 'NewSecurePassword123'
        }

        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)).to include('error' => 'email_missing')
      end

      it 'fails when otp is missing' do
        post reset_password_users_path, params: {
          email: verified_user.email,
          new_password: 'NewSecurePassword123'
        }

        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)).to include('error' => 'otp_missing')
      end

      it 'fails when new_password is missing' do
        post reset_password_users_path, params: {
          email: verified_user.email,
          otp: verified_user.verification_otp
        }

        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)).to include('error' => 'new_password_missing')
      end
    end

    context 'with invalid user state' do
      it 'fails for non-existent email' do
        post reset_password_users_path, params: {
          email: 'nonexistent@link.cuhk.edu.hk',
          otp: '123456',
          new_password: 'NewSecurePassword123'
        }

        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)).to include('error' => 'invalid_otp_or_email')
      end

      it 'fails for unverified user' do
        unverified_user.generate_verification_otp!
        unverified_user.save!

        post reset_password_users_path, params: {
          email: unverified_user.email,
          otp: unverified_user.verification_otp,
          new_password: 'NewSecurePassword123'
        }

        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)).to include('error' => 'invalid_otp_or_email')
      end
    end
  end
end
