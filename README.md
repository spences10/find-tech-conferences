# Find Tech Conferences

An open-source directory of global tech conferences aimed at helping
developers discover events happening around the world. The platform
provides an easy way for anyone to contribute and keep the information
up-to-date, ensuring a reliable and comprehensive resource for the
tech community.

---

## Features

- **Conference Listings:** Browse, search, and get details of tech
  conferences globally.
- **User Contributions:** Easily submit new conference information via
  GitHub PRs or platform submission (for registered users).
- **Conference Tracking:** Registered users can bookmark conferences
  and receive personalized recommendations.

---

## PocketBase

Schema

```text
conferences:
  - name (text, required)
  - description (text)
  - start_date (date, required)
  - end_date (date, required)
  - location (text, required)
  - website_url (url)
  - cfp_start_date (date)
  - cfp_end_date (date)
  - approval_status (select: pending, approved, rejected)
  - owner (relation to users, single, required)
  - image (file)

tags:
  - tag_name (text, required)

bookmarks:
  - user (relation to users, single, required)
  - conference (relation to conferences, single, required)
  - bookmarked_at (date)
```

API rules

```text
conferences:
  createRule: "@request.auth.id != ''"  # Any authenticated user can create
  viewRule: ""  # Anyone can view
  updateRule: "@request.auth.id = owner.id"  # Only owner can update
  deleteRule: "@request.auth.id = owner.id"  # Only owner can delete

bookmarks:
  createRule: "@request.auth.id != '' && @request.auth.id != conference.owner.id"  # Authenticated users can bookmark conferences they don't own
  viewRule: "@request.auth.id = user.id"  # Users can only view their own bookmarks
  updateRule: "@request.auth.id = user.id"  # Users can only update their own bookmarks
  deleteRule: "@request.auth.id = user.id"  # Users can only delete their own bookmarks

tags:
  createRule: "@request.auth.id != ''"  # Any authenticated user can create
  viewRule: ""  # Anyone can view
  updateRule: ""  # Consider who should be able to update tags
  deleteRule: ""  # Consider who should be able to delete tags
```

---

## Contribute

We welcome contributions from the community! Whether you're looking to
submit new conference information, propose enhancements, or help with
development, we appreciate your interest and support.

- [**Contribution Guidelines**](./docs/contribution-guidelines.md)
- [**Code of Conduct**](./docs/code-of-conduct.md)

---

## License

This project is open source and available under the
[MIT License](LICENSE).

---

## Contact

For any inquiries or feedback, feel free to open an issue on GitHub or
reach out to us through [our community forum](#).
