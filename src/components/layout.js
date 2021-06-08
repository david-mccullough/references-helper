/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="layout">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>
        <div className="center">
          <div className="content">
            {children}
            <div style={{ flex: "1" }} />
            <footer>
              <b>{new Date().getFullYear()} </b>
              0BSD Licesne
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
