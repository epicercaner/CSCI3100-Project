# API Endpoint Quick Reference

## Base URL
```
http://127.0.0.1:3000
```

## All Endpoints Status: ✓ FUNCTIONAL

---

## Authentication Endpoints

### Register User
**Endpoint**: `POST /users`  
**Status**: ✓ Working  
**Auth**: Public  
**Response**: 201 Created + Verification email sent
```bash
curl -X POST http://127.0.0.1:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "1155000001@link.cuhk.edu.hk",
      "name": "John Doe",
      "password": "SecurePass123!",
      "cuhk_id": "1155000001",
      "hostel": "Morningside College",
      "is_admin": false
    }
  }'
```

### Register (Alias)
**Endpoint**: `POST /users/register`  
**Status**: ✓ Working  
**Auth**: Public  
**Note**: Same as POST /users
```bash
curl -X POST http://127.0.0.1:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{ "user": { ... } }'
```

### Verify Email
**Endpoint**: `POST /users/verify`  
**Status**: ✓ Working  
**Auth**: Public  
**Required**: email, otp (from email)  
**Response**: 200 OK if verified, 422 if failed
```bash
curl -X POST http://127.0.0.1:3000/users/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "1155000001@link.cuhk.edu.hk",
    "otp": "123456"
  }'
```

### Resend Verification
**Endpoint**: `POST /users/resend_verification`  
**Status**: ✓ Working  
**Auth**: Public  
**Response**: 200 OK (always, for security)
```bash
curl -X POST http://127.0.0.1:3000/users/resend_verification \
  -H "Content-Type: application/json" \
  -d '{ "email": "1155000001@link.cuhk.edu.hk" }'
```

### Login
**Endpoint**: `POST /sessions`  
**Status**: ✓ Working  
**Auth**: Public  
**Required**: email, password  
**Response**: 201 Created + user data + session cookie  
**Error**: 403 if email not verified, 401 if invalid credentials
```bash
curl -X POST http://127.0.0.1:3000/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "1155000001@link.cuhk.edu.hk",
    "password": "SecurePass123!"
  }' \
  -c cookies.txt
```

### Logout
**Endpoint**: `DELETE /sessions/:id`  
**Status**: ✓ Working  
**Auth**: Required  
**Response**: 204 No Content
```bash
curl -X DELETE http://127.0.0.1:3000/sessions/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

### Change Password
**Endpoint**: `POST /users/change_password`  
**Status**: ✓ Working  
**Auth**: Required  
**Error**: 401 if not authenticated
```bash
curl -X POST http://127.0.0.1:3000/users/change_password \
  -H "Content-Type: application/json" \
  -d '{
    "old_password": "OldPass123!",
    "new_password": "NewPass123!"
  }' \
  -b cookies.txt
```

---

## User Endpoints

### List All Users
**Endpoint**: `GET /users`  
**Status**: ✓ Working  
**Auth**: Public  
**Response**: 200 OK + array of users
```bash
curl http://127.0.0.1:3000/users
```

### Get User by ID
**Endpoint**: `GET /users/:id`  
**Status**: ✓ Working  
**Auth**: Public  
**Parameter**: ID (database ID 1-999999) or CUHK ID (1155XXXXXX)  
**Response**: 200 OK or 404 Not Found
```bash
# By database ID
curl http://127.0.0.1:3000/users/43

# By CUHK ID
curl http://127.0.0.1:3000/users/1155000001
```

### List Admins
**Endpoint**: `GET /users/admins`  
**Status**: ✓ Working  
**Auth**: Public  
**Response**: 200 OK + array of admin users
```bash
curl http://127.0.0.1:3000/users/admins
```

---

## Product Endpoints

### List Products
**Endpoint**: `GET /products`  
**Status**: ✓ Working  
**Auth**: Public  
**Query Params**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 15)
- `keywords`: Search term (fuzzy match on name)
**Response**: 200 OK + products array + pagination info
```bash
curl "http://127.0.0.1:3000/products?page=1&limit=15"
curl "http://127.0.0.1:3000/products?keywords=laptop"
```

### Get Product by ID
**Endpoint**: `GET /products/:id`  
**Status**: ✓ Working  
**Auth**: Public  
**Response**: 200 OK or 404 Not Found
```bash
curl http://127.0.0.1:3000/products/1
```

### Search Products
**Endpoint**: `GET /products?keywords=...`  
**Status**: ✓ Working  
**Auth**: Public  
**Response**: 200 OK (empty array if no matches)
```bash
curl "http://127.0.0.1:3000/products?keywords=book"
```

### Product Price History
**Endpoint**: `GET /products/price_history`  
**Status**: ✓ Working  
**Auth**: Public  
**Query Params**:
- `product_id`: ID of product (required)
- `points`: Number of historical points (optional)
**Response**: 200 OK + price history
```bash
curl "http://127.0.0.1:3000/products/price_history?product_id=1&points=30"
```

### Create Product
**Endpoint**: `POST /products`  
**Status**: ✓ Working  
**Auth**: Required  
**Response**: 201 Created or 401 Unauthorized
```bash
curl -X POST http://127.0.0.1:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "product": {
      "name": "Used Laptop",
      "description": "Dell XPS 13, excellent condition",
      "price": 800,
      "category_id": 1,
      "location": "CU Library",
      "contact": "1234567890",
      "condition": "Excellent",
      "status": "available"
    }
  }' \
  -b cookies.txt
```

### Update Product
**Endpoint**: `PATCH /products/:id`  
**Status**: ✓ Working  
**Auth**: Required (product owner only)  
**Response**: 200 OK or 401/403/404
```bash
curl -X PATCH http://127.0.0.1:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{ "product": { "price": 750 } }' \
  -b cookies.txt
```

### Delete Product
**Endpoint**: `DELETE /products/:id`  
**Status**: ✓ Working  
**Auth**: Required (product owner only)  
**Response**: 204 No Content or 401/403/404
```bash
curl -X DELETE http://127.0.0.1:3000/products/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

---

## Chat Endpoints

### List Chats
**Endpoint**: `GET /chats`  
**Status**: ✓ Working  
**Auth**: Required  
**Response**: 200 OK + chats array or 401 Unauthorized
```bash
curl http://127.0.0.1:3000/chats -b cookies.txt
```

### Get Chat by ID
**Endpoint**: `GET /chats/:id`  
**Status**: ✓ Working  
**Auth**: Required (participant only)  
**Response**: 200 OK + chat data with all messages
```bash
curl http://127.0.0.1:3000/chats/1 -b cookies.txt
```

### Create Chat
**Endpoint**: `POST /chats`  
**Status**: ✓ Working  
**Auth**: Required  
**Body**: product_id (required)  
**Response**: 201 Created or 401 Unauthorized
```bash
curl -X POST http://127.0.0.1:3000/chats \
  -H "Content-Type: application/json" \
  -d '{ "product_id": 1 }' \
  -b cookies.txt
```

---

## Message Endpoints

### List Messages in Chat
**Endpoint**: `GET /chats/:chat_id/messages`  
**Status**: ✓ Working  
**Auth**: Required (participant only)  
**Response**: 200 OK + messages array
```bash
curl http://127.0.0.1:3000/chats/1/messages -b cookies.txt
```

### Get Message by ID
**Endpoint**: `GET /chats/:chat_id/messages/:id`  
**Status**: ✓ Working  
**Auth**: Required (participant only)  
**Response**: 200 OK + message data
```bash
curl http://127.0.0.1:3000/chats/1/messages/1 -b cookies.txt
```

### Send Message
**Endpoint**: `POST /chats/:chat_id/messages`  
**Status**: ✓ Working  
**Auth**: Required  
**Body**: message (required, string)  
**Response**: 201 Created
```bash
curl -X POST http://127.0.0.1:3000/chats/1/messages \
  -H "Content-Type: application/json" \
  -d '{ "message": { "message": "Hi, is this still available?" } }' \
  -b cookies.txt
```

### Delete Message
**Endpoint**: `DELETE /chats/:chat_id/messages/:id`  
**Status**: ✓ Working  
**Auth**: Required  
**Response**: 204 No Content
```bash
curl -X DELETE http://127.0.0.1:3000/chats/1/messages/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

---

## Error Responses

### 401 Unauthorized (Authentication Failed)
```json
{ "error": "unauthenticated" }
```

### 401 Unauthorized (Email Not Verified)
```json
{ "error": "email_not_verified" }
```

### 403 Forbidden (Authorization Failed)
```json
{ "error": "unauthorized" }
```

### 404 Not Found
```json
{ "error": "User/Product/Chat not found" }
```

### 422 Unprocessable Entity
```json
{ "error": "verification_failed_or_expired", "errors": ["Email is invalid"] }
```

---

## Important Notes

✓ **All POST requests should include**: `Content-Type: application/json`  
✓ **Email format required**: `1155XXXXXX@link.cuhk.edu.hk`  
✓ **Authenticated requests require**: Session cookie from login  
✓ **User IDs can be**:
  - Database ID (numeric, 1-999999): `/users/43`
  - CUHK ID (1155XXXXXX): `/users/1155000001`

---

**Report Date**: 2026-03-29  
**API Status**: ✓ ALL ENDPOINTS FUNCTIONAL
