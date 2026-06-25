---
id: 71
title: profile-builder - profile-form.md
status: done
priority: medium
created: 2026-06-09T18:08:35.080972+06:00
updated: 2026-06-24T21:19:21.202580965+02:00
started: 2026-06-22T02:26:22.477275+06:00
completed: 2026-06-24T21:19:21.202579933+02:00
claimed_by: annotator
claimed_at: 2026-06-24T21:19:21.202580864+02:00
class: standard
---

1. `01-profile-form-disabled`
Placement: after `### Opening the Profile Form Page`
Surface to cover: ArraySubs Profile Builder Profile Form page with Avatar Settings and Custom Profile Fields disabled.
context: Shows the Profile Form admin route, Profile Form/My Account tabs, disabled avatar upload toggle, disabled custom profile fields toggle, and Save Configuration action.
Markers:
- `arrow pointing to the Profile Form tab, label 'Profile Form page'`
- `arrow pointing to the Enable avatar upload checkbox, label 'Avatar toggle'`
- `arrow pointing to the Enable custom profile fields checkbox, label 'Custom fields toggle'`

2. `02-avatar-settings-enabled`
Placement: after `### Configuring Avatar Upload`
Surface to cover: Avatar Settings section after enabling avatar upload.
context: Shows Max File Size (MB), Allowed File Types, and Save Configuration on the live Profile Form page.
Markers:
- `arrow pointing to the checked Enable avatar upload checkbox, label 'Avatar upload on'`
- `arrow pointing to the Max File Size (MB) input, label 'File size limit'`
- `arrow pointing to the Allowed File Types input, label 'Allowed image types'`

3. `03-custom-profile-field-editor`
Placement: after `### Field Properties`
Surface to cover: expanded Custom Profile Fields editor for a new text field.
context: Shows the temporary unsaved field editor with Label, Key, Type, Placeholder / Description, Help Text, Required, field status controls, and Add Field.
Markers:
- `arrow pointing to the Label input, label 'Field label'`
- `arrow pointing to the Key input and stored-meta hint, label 'Meta key'`
- `arrow pointing to the Type dropdown, label 'Field type'`
- `arrow pointing to the Required checkbox, label 'Required option'`

4. `04-select-field-options`
Placement: after `#### Select`
Surface to cover: Select field type editor with one option row.
context: Shows the same temporary field switched to Select, including the Options row, Value and Label inputs, Add Option button, and remove-option control.
Markers:
- `arrow pointing to the Type dropdown showing Select, label 'Select type'`
- `arrow pointing to the Options value and label inputs, label 'Dropdown option'`
- `arrow pointing to the Add Option button, label 'Add option'`

5. `05-file-upload-field-settings`
Placement: after `#### File Upload`
Surface to cover: File Upload field type editor.
context: Shows the same temporary field switched to File Upload, including Allowed File Types and Max File Size (MB) controls.
Markers:
- `arrow pointing to the Type dropdown showing File Upload, label 'File upload type'`
- `arrow pointing to the Allowed File Types input in the field editor, label 'Allowed files'`
- `arrow pointing to the Max File Size (MB) input in the field editor, label 'Upload limit'`

Verification:
- Source markdown reviewed against `arraysubs/src/resources/pages/Settings/ProfileFieldsSettings.jsx`; no source markdown changes were needed.
- Temporary unsaved field was removed after capture, and both Profile Form toggles were returned to off without saving.


--- Annotation complete ---
Annotated (#873EFF, --crop, --steps=3):
- 01-profile-form-disabled: SUCCESS. Link after '### Opening the Profile Form Page'.
- 02-avatar-settings-enabled: SUCCESS. Link after '### Configuring Avatar Upload'.
- 03-custom-profile-field-editor: SUCCESS. Link after '### Field Properties'.
- 04-select-field-options: SUCCESS. Link after '#### Select'.
- 05-file-upload-field-settings: SUCCESS. Link after '#### File Upload'.
Source: profile-builder/profile-form.md (5 links added).
