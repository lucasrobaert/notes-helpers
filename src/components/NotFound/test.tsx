import { render, screen } from '@testing-library/react'

import NotFound from '.'

describe('<NotFound />', () => {
  it('should render the heading', () => {
    const { container } = render(<NotFound />)

    expect(
      screen.getByRole('heading', { name: /NotFound/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
