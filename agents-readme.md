# User Manual — Agent Screenshot Operations

Last updated: 2026-06-18

Operating guide for the agent capturing documentation screenshots for the ArraySubs user manual. Drive the **take-screenshot** skill against the live staging site, save originals, and update the kanban board.

## Skill

Use the `take-screenshot` skill. It plans AND captures: study docs + app, take the **original** unmarked screenshot, save it, write the entry into the task, move the task to `done` or `review`. Read its SKILL.md before starting.

## Live Site Access

Credentials live in `../qa/readme.md`. Current values:

- Admin URL: https://mirror-help.arrayhash.com/wp-admin
- Username: `admin`
- Password: `@GuDw(0$K7M9t8ehjqDb4Vwj`

### Test customer (active subscription, features, store credit)

- My Account URL: https://mirror-help.arrayhash.com/my-account
- Username: `sync-stripe`
- Password: `SyncStripe!QA2026`
- User ID: `319`
- Holds active subscription #4406 (Basic Monthly), feature entitlements (product 197), $50.00 store credit. Use for clean customer-portal shots without the Login-as-User admin banner.

### Additional test customers

Use these when a screenshot needs alternate customer states, more subscription/order history, or a pro-member account.

| User ID | Username | Email | Roles | Subs | Orders | Password |
| --- | --- | --- | --- | ---: | ---: | --- |
| 5 | `cust1` | `cust1@test.local` | customer, pro_member | 13 | 16 | `Cust1!QA2026` |
| 32 | `customer1` | `customer1@arraysubs.test` | customer | 3 | 12 | `Customer1!QA2026` |
| 54 | `cust1@example.com` | `cust1@example.com` | customer, pro_member | 2 | 6 | `CustEx1!QA2026` |
| 43 | `member-decline` | `member-decline@example.com` | customer | 1 | 7 | `MemberDecline!QA2026` |

## Layout

- Docs: `markdowns/<group>/<page>.md` (e.g. `markdowns/analytics/reports-hub.md`).
- Board: `user-manual/kanban` (run `kanban-md` from the `user-manual/` dir).
- Screenshots: save next to the markdown file as `<md_basename>.ASSETS/NN.screenshot-name-original.png`. `NN` = ascending number prefix.

## Board

`kanban-md` board "User Manual". Statuses: `backlog`, `todo`, `in-progress`, `review`, `done`, `archived`. `in-progress` and `review` require a claim.

```bash
cd /Users/emran/Local\ Sites/wp-test2/app/public/wp-content/plugins/user-manual
kanban-md agent-name            # once per session
kanban-md board --compact
kanban-md list --status backlog --compact
```

One task in `in-progress` at a time — move it there before working.

## Tools

- `agent-browser` — navigate, size the window, reach app state, capture. Load the guide first (`agent-browser skills get core`).
- `kanban-md` — read tasks, move status, write entries.

## Workflow — one task at a time

1. Claim the next matching task, move it to `in-progress`.
2. Read the task + its markdown page + relevant plugin source. Open the real surface in the browser.
3. **Explore fully**: open every accordion, tab, sub-tab, and multi-nested/repeater setting before planning. Lock the plan only after seeing all docs AND the live surface.
4. Reach the target state. Staging site — add sample data when a screen is empty (see Staging).
5. Capture the **original** screenshot. No marks. Markers are recorded as text in the task only.
6. Save to `<md_basename>.ASSETS/NN.name-original.png`.
7. Write the entry into the task body (format in the skill).
8. **Verify the saved file a second time.** Needs your eyes → `review`. Clean → `done`.

Dedupe: if one frame already covers several sections, capture once and cite it in each task — never duplicate a frame.

## Staging — change data freely

It is staging. To reach a good state you may reset passwords; add or edit orders, subscriptions, users, products; and change any settings. Many settings are empty — populate with sample data before capturing.

## Stale docs

The manual is sometimes out of date. When the browser shows the feature differs from the markdown, the live app is the source of truth. **With user permission**, update the `markdowns/<group>/<page>.md` to match. Without permission, note the mismatch in the task and move it to `review`.

## Scope notes

- ArraySubs and ArraySubsPro — both unless the task says free-only or pro-only.
- Active plugins: `arraysubs`, `arraysubspro`, `dev-assist`, `woocommerce`, `woocommerce-gateway-stripe`, `wpforms-lite`, `wp-mail-smtp`.
- Do not change the system clock. For date-dependent shots, edit subscription date meta from the admin UI.
- Treat the live site as shared QA data — do not reset or bulk-delete without user approval.
