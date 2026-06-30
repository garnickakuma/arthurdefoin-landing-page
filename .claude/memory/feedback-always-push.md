---
name: feedback-always-push
description: "Always push to git after making changes, without waiting to be asked"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d7761e08-7867-40de-aa6a-fb97684c2f80
---

Always commit and push changes to git after completing a task.

**Why:** User expects push as part of the normal workflow — confirmed multiple times.

**How to apply:** After every code change, run `git add`, `git commit`, and `git push` automatically. No need to ask for confirmation.
