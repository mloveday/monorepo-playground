import {waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {http,HttpResponse} from "msw";
import {describe, expect, it} from "vitest";

import {SampleApiDrivenComponent} from "@/client/components/sample-api-driven-component";
import {withLatency} from "@/test/api/mock-handlers";
import {server} from "@/test/api/setup-server";
import {testRender} from "@/test/test-render";
import {withStore} from "@/test/with-store";

describe('SampleApiDrivenComponent', () => {
  it('should fetch data and display a good result', async () => {
    server.use(http.get('/api/healthcheck', withLatency(() =>
      HttpResponse.json({
        success: true,
        message: 'good healthcheck response',
      }))
    ));

    const Component = withStore(SampleApiDrivenComponent);

    const result = testRender(<Component/>);

    expect(result.getByText('loading')).not.toBeNull();
    await waitFor(() => expect(result.getByText('good healthcheck response')).not.toBeNull());

    const role = result.getByRole('button', {name: 'Reload'});
    expect(role).not.toBeNull();
    await userEvent.click(role);

    await waitFor(() => expect(result.getByText('fetching')).not.toBeNull());
    await waitFor(() => expect(result.getByText('good healthcheck response')).not.toBeNull());
    await waitFor(() => expect(result.queryByText('fetching')).toBeNull());
  });

  it('should fetch data and display a bad result', async () => {
    server.use(http.get('/api/healthcheck', withLatency(() =>
      HttpResponse.json({
        success: false,
        message: 'bad healthcheck response',
      }))
    ));

    const Component = withStore(SampleApiDrivenComponent);

    const result = testRender(<Component/>);

    expect(result.getByText('loading')).not.toBeNull();
    await waitFor(() => expect(result.getByText('bad healthcheck response')).not.toBeNull());

    const role = result.getByRole('button', {name: 'Reload'});
    expect(role).not.toBeNull();
    await userEvent.click(role);

    await waitFor(() => expect(result.getByText('fetching')).not.toBeNull());
    await waitFor(() => expect(result.getByText('bad healthcheck response')).not.toBeNull());
    await waitFor(() => expect(result.queryByText('fetching')).toBeNull());
  });

  it('should handle errors', async () => {
    server.use(http.get('/api/healthcheck', HttpResponse.error));

    const Component = withStore(SampleApiDrivenComponent);

    const result = testRender(<Component/>);

    expect(result.getByText('loading')).not.toBeNull();
    await waitFor(() => expect(result.getByText('error')).not.toBeNull());
  });
});