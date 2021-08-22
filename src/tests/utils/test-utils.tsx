import React from 'react'
import { render as rtlRender, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from "react-router-dom";
import { DefaultRequestBody, MockedRequest, RestHandler } from 'msw';
import { setupServer } from 'msw/node'

import { store as testStore } from '../../state/store'

type WrapperProps = { children?: React.ReactNode }

function render(
  ui: React.ReactElement,
  {
    store = testStore,
    renderOptions = {
        initialRoutes: ["/"]
    }
  } = {}
): RenderResult {
    const initialRoutes =
        renderOptions && renderOptions.initialRoutes ? renderOptions.initialRoutes : ["/"];

    const Wrapper: React.FC<WrapperProps> = ({ children }): React.ReactElement => {
        return (
            <Provider store={store}>
                <MemoryRouter initialEntries={initialRoutes}>
                    {children}
                </MemoryRouter>
            </Provider>
        )
    }
    return rtlRender(ui, { wrapper: (children) => Wrapper(children), ...renderOptions })
}

function setupMockServerForTests(handlers: RestHandler<MockedRequest<DefaultRequestBody>>[]): void {
    const server = setupServer(...handlers)

    // Enable API mocking before tests.
    beforeAll(() => server.listen())

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers())

    // Disable API mocking after the tests are done.
    afterAll(() => server.close())
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render, setupMockServerForTests }
