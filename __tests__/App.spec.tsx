/** @vitest-environment jsdom */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/components/App';

describe('App healthcheck', () => {
  it('App renders successfully when there isnt a token', () => {
    render(
      <App />
    );
    expect(
      screen.getByText(/Brut/)
      ).toBeInTheDocument();
    });
  it('App renders successfully when there is a token', async () => {

    const mockParentComponent = {token: 'token'}

    const MockParentComponentContext = {
      Provider: ({ children }: {children: any}) => children,
      Consumer: ({ children }: {children: any}) => children(mockParentComponent)
    }

    await render(
      <MockParentComponentContext.Provider>
        {() => <App /> }
      </MockParentComponentContext.Provider>
    );
    expect(
      screen.queryByText(/Brut/)
      ).not.toBeInTheDocument();
    });
});
