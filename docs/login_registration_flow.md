# Login & Registration Flow

This document maps the current login and registration implementation in this project and lists endpoints, controllers, and the sequence of actions for registration, verification, and login.

**Key files**
- Controller (registration, verification): [app/controllers/users_controller.rb](app/controllers/users_controller.rb#L1-L500)
- Controller (login/logout): [app/controllers/sessions_controller.rb](app/controllers/sessions_controller.rb#L1-L200)
- Model (authentication + OTP logic): [app/models/user.rb](app/models/user.rb#L1-L400)
- Mailer (verification email): [app/mailers/user_mailer.rb](app/mailers/user_mailer.rb#L1-L200)
- Mailer template: [app/views/user_mailer/verification_email.html.erb](app/views/user_mailer/verification_email.html.erb#L1-L200)
- Routes: [config/routes.rb](config/routes.rb#L1-L200)

## Overview

The app implements an email-verified registration flow using a numeric OTP and password-based authentication (via `has_secure_password`).

High-level steps:
- User registers by POSTing user data to `POST /users` (alias `POST /users/register`).
- Server creates a `User`, generates a 6-digit OTP, sends a verification email, and returns a JSON response indicating an email was sent.
- User submits OTP via `POST /users/verify` (email+otp or otp + email query). Server verifies OTP and marks the user as verified (`verified_at` set).
- User logs in via `POST /sessions` with email and password. Login succeeds only if `verified_at` is present.

## Endpoints (current behavior)

- POST /users
  - Controller: `UsersController#create` ([link](app/controllers/users_controller.rb#L1-L200))
  - Required params: `user[email]`, `user[name]`, `user[password]`, `user[cuhk_id]`, etc.
  - On success: user saved, OTP generated, `UserMailer.verification_email(user).deliver_later` called, returns 201 with message `verification_email_sent`.

- POST /users/register
  - Alias that delegates to `create`.

- POST /users/verify
  - Controller: `UsersController#verify`
  - Accepts `email` and `otp` (or `otp` and falls back to match by OTP only).
  - On success: sets `verified_at` and returns 200 `{ message: 'verified' }`.

- POST /users/resend_verification
  - Controller: `UsersController#resend_verification`
  - Triggers `generate_verification_otp!` and resends email if user exists and is not verified. Returns a generic 200 message to avoid enumeration.

- POST /users/change_password
  - Controller: `UsersController#change_password`
  - Requires current password for authentication and `new_password` to update.

- POST /sessions
  - Controller: `SessionsController#create` ([link](app/controllers/sessions_controller.rb#L1-L200))
  - Accepts `email` and `password`.
  - Server authenticates via `user.authenticate(password)` and checks `verified_at`.
  - On success: returns `201 { message: 'logged_in', user: user }` (note: currently no token/session cookie issued).

- DELETE /sessions/:id
  - Controller: `SessionsController#destroy` — returns `204` (no content).

## Model behavior

- `has_secure_password` is enabled (password digest + `authenticate`). See [app/models/user.rb](app/models/user.rb#L1-L200).
- OTP generation: `generate_verification_otp!` (6-digit numeric), stored on the `User` with `verification_sent_at`.
- OTP TTL: `VERIFICATION_TTL = 24.hours` — `verify_otp!` checks expiry and uses secure compare, then sets `verified_at` and clears the OTP.

## Email

- Verification email uses `UserMailer#verification_email` and the template at [app/views/user_mailer/verification_email.html.erb](app/views/user_mailer/verification_email.html.erb#L1-L200).
- Email content includes the 6-digit OTP and explains it expires in 24 hours.

## Sequence diagrams (text)

Registration:
1. Client -> POST /users with user data
2. Server: create `User` (DB), `generate_verification_otp!`, `UserMailer.verification_email.deliver_later`
3. Server -> Client: 201, message `verification_email_sent`
4. Client -> User receives email with OTP
5. Client -> POST /users/verify with `{ email, otp }`
6. Server verifies OTP, sets `verified_at`, returns 200 `verified`

Login:
1. Client -> POST /sessions with `{ email, password }`
2. Server: `User.find_by(email)`, `user.authenticate(password)`, check `verified_at`
3. If ok -> return 201 `{ message: 'logged_in', user: user }`
4. If not verified -> 403 `{ error: 'email_not_verified' }`
5. If credentials invalid -> 401 `{ error: 'invalid_credentials' }`

## Notes & Recommendations

- Current login returns a JSON user object but does not issue a session cookie or token. For API clients, consider adding JWT or similar token issuance (and refresh tokens) to persist sessions securely.
- Resend verification currently has no rate limiting — add throttling (rack-attack or similar) to avoid abuse.
- The email format is restricted to CUHK student addresses (see `CUHK_EMAIL_REGEX`) — ensure client-side validation matches server rules.
- Consider exposing clearer error codes/messages in a consistent structure for the front end to consume.

## Quick file pointers
- Registration logic: [app/controllers/users_controller.rb](app/controllers/users_controller.rb#L1-L500)
- Login logic: [app/controllers/sessions_controller.rb](app/controllers/sessions_controller.rb#L1-L200)
- User auth & OTP: [app/models/user.rb](app/models/user.rb#L1-L400)
- Verification mailer: [app/mailers/user_mailer.rb](app/mailers/user_mailer.rb#L1-L200)

---
Document created by repository scan on March 18, 2026.
