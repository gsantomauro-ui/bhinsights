# Security Specification

## Data Invariants
1. Articles can only be created by an Admin.
2. Admins are defined in the `/users/{userId}` collection with `role == 'admin'`.
3. Users cannot give themselves the `admin` role.
4. Articles must contain all required fields.

## The "Dirty Dozen" Payloads
1. Unauthorized create article.
2. Unauthorized update article.
3. Unauthorized delete article.
4. Bad schema on create article (missing fields or wrong types).
5. Bad schema on update article (invalid types).
6. Admin creating an article without exact fields.
7. User attempting to create their own admin profile.
8. User attempting to modify their role to admin.
9. Unauthorized access to read users collection.
10. Admin creating an article with extra fields not allowed.
11. Admin creating a user bypassing strict fields.
12. Creating an article with an invalid document ID.

## The Test Runner
A `firestore.rules.test.ts` will verify these payloads.
