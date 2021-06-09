import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1280,
        padding: "0 16px",
        display: "flex",
      }}
    >
      <h4 style={{ margin: 0, flex: "1" }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h4>
      <p style={{ margin: 0, fontSize: "x-small" }}>
        <Link
          to="https://github.com/david-mccullough/references-helper"
          style={{
            color: "#ffffff60",
            textDecoration: `none`,
          }}
        >
          made by David McCullough
        </Link>
      </p>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
