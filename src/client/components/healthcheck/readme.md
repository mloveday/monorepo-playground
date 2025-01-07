# API-driven feature

## Feature

Fetches the response from the healthcheck API endpoint and displays the message. The endpoint requires a query param, used to change the content of the response.

## Architecture

I've created a Higher Order Component (HOC) to make the API request, handle loading and error states and pass the data on when successful. The idea behind this is that for simpler components where exactly one API request is made, this can be implemented multiple times over, so this helps reduce that duplication and boilerplate.

**I'm not convinced this is necessary, this is more exploratory work to see if the idea is worth it.**

The components are split up as follows:

- Parent component holds state & setters for the API request
- HOC translates the props into the API request, makes the request and passes on the response
- Child component receives the response and renders it

Controlling the state can be done either inside the child, or in the parent. The current implementation lets the child do this.
