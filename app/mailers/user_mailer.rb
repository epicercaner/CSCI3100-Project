class UserMailer < ApplicationMailer
  default from: 'noreply@example.com'

  def verification_email(user)
    @user = user
    @otp = @user.verification_otp
    # app/views/user_mailer/verification_email.html.erb
    mail(to: @user.email, subject: 'Your CUHK verification code')
  end
end
