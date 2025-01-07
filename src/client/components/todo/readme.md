# Basic TODO functionality

## Feature

Entirely ephemeral TODO list - refreshing the page clears the state.

Todo items have a title and optional notes field

Todo items can be added or removed individually, and the list can be reset via the reset button.

Todo titles have a nominal 5 character minimum length to demonstrate form validation.

## Considerations

This requires some local state management. I've used a reducer (i.e. the same pattern as RTK) to demonstrate it, but useState may be simpler here.

This also requires a form to add the data. This uses Formik to manage the form state, and zod to provide the validation.
