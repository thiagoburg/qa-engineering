# Training Releases

The current `main` release is the stable baseline and contains no intentionally introduced defects. Use local D1 for learner runs; do not use the public Preview or production database for exercises.

The independent Manual QA capstone uses the separate Git branch `training/taskflow-release-01`. It contains one controlled behavior mismatch against `PRODUCT_SPEC.md`; the learner task does not disclose its location or behavior. Check out that branch after completing the guided lessons, use a fresh local D1 database, and return to `main` when finished. Never merge the training branch into `main` or deploy it to production. The branch commit is the reproducible training build identifier.

Keep a correction and regression check on a separate fix branch so the original exercise remains reproducible. Review the learner's report before sharing the diagnosis.
