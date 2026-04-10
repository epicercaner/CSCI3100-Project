# Core Model and Infrastructure - Test Cases

## ApplicationController helper behavior
- `authenticate_user!` returns JSON `401 unauthenticated` for unauthenticated JSON requests.
- `authenticate_user!` redirects HTML requests to root when unauthenticated.
- `authorize_user!` allows access when current user matches target user.
- `authorize_user!` redirects HTML requests when current user is unauthorized.
- `render_error(StandardError)` logs and renders JSON `500` with normalized error payload.
- `render_error(Array)` renders provided status and array-based error payload.

## ApplicationCable base classes
- `ApplicationCable::Connection` inherits from `ActionCable::Connection::Base`.
- `ApplicationJob` inherits from `ActiveJob::Base`.

## Core models

### Category
- has many products with `dependent: :nullify`.
- can be created with a category name.

### Chat
- belongs to product (`item_id`), seller (`seller_id`), and interested user (`interested_id`).
- has many messages with `dependent: :destroy`.
- validates presence of `item_id`, `seller_id`, and `interested_id`.
- aliases `product_id` to `item_id`.

### Interest
- belongs to interested user and product.
- validates presence of `interested_id` and `item_id`.
- enforces uniqueness of `[interested_id, item_id]` pair.

### Message
- belongs to chat and sender.
- validates presence of `chat_id`, `sender_id`, and `message`.
- broadcasts payload to `chat_<id>` stream after create.

### PriceHistory
- belongs to product.
- validates presence of `product_id` and `price`.

### User
- validates email presence.
- rejects duplicate email values.
- enforces CUHK email format (`1155XXXXXX@link.cuhk.edu.hk`).
- `.admins` scope returns only admin users.
- `generate_verification_otp!` creates 6-digit OTP and timestamp.
- `verify_otp!` succeeds for valid OTP and clears verification fields.
- `verify_otp!` fails for expired or incorrect OTP.
- aliases `hall` to `hostel`.

## Notification model status
- confirms `Notification` model is currently undefined in `app/models`.
