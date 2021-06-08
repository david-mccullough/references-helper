import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { string } from "prop-types"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: "Paste your paper here (Example 2021).",
      outputText: "",
    }

    this.extractReferences = this.extractReferences.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render() {
    return (
      <Layout>
        <Seo title="Home" />
        <div className="box">
          {/* <div className="row header">
              <p><b>Hi honey</b></p>                   
            </div> */}
          <div className="row" style={{ height: "100%" }}>
            <div className="container">
              <textarea
                type="text"
                id="input"
                name="input"
                className="item"
                defaultValue={this.state.inputText}
                onChange={this.handleInputChange}
              />
              <div className="item flex-center" style={{ flexGrow: 0 }}>
                <a
                  onClick={() => this.extractReferences()}
                  style={{ fontSize: "2em" }}
                  className=" grow"
                >
                  {"➡️"}
                </a>
              </div>
              <textarea
                type="text"
                id="output"
                name="output"
                className="item"
                value={this.state.outputText}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value,
    })
  }

  extractReferences() {
    let result = ""
    let input = this.state.inputText

    const regex = /\(([^)]+)\)/g
    let matches = input.match(regex).map(x => x.slice(1, x.length - 1))

    let trimmed = this.removeDuplicates(matches).filter(x => x.trim())
    trimmed.forEach(x => (result += x + "\n"))

    this.setState({
      outputText: result,
    })
  }

  removeDuplicates(array) {
    return array.reduce(function (p, c, i, a) {
      if (p.indexOf(c) == -1) p.push(c)
      else p.push("")
      return p
    }, [])
  }
}

export default IndexPage
