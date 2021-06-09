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
      inputText: "Paste paper here (Example 2021).",
      outputText: "",
      outputItems: [],
      copyButtonText: "Copy Text",
    }

    this.extractReferences = this.extractReferences.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOutputChange = this.handleOutputChange.bind(this)
    this.triggerCopyButtonChange = this.triggerCopyButtonChange.bind(this)
  }

  render() {
    return (
      <Layout>
        <Seo title="" />
        <div className="box">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "16px",
            }}
          >
            <a
              onClick={() => {
                this.triggerCopyButtonChange()
                copyText(this.state.outputText)
              }}
              className="nice-button item"
            >
              {this.state.copyButtonText}
            </a>
            <a
              onClick={() =>
                exportOutputToCSV(
                  this.state.outputItems,
                  `references ${new Date().toISOString()}.csv`
                )
              }
              className="nice-button item"
            >
              📄 Download CSV
            </a>
          </div>
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
                  className="nice-button grow"
                >
                  {"➜"}
                </a>
              </div>
              <textarea
                type="text"
                id="output"
                name="output"
                className="item"
                onChange={this.handleOutputChange}
                value={this.state.outputText}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  triggerCopyButtonChange(event) {
    this.setState({
      copyButtonText: "Copied!",
    })

    setTimeout(() => {
      this.setState({
        copyButtonText: "Copy Text",
      })
    }, 1000)
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value,
    })
  }

  handleOutputChange(event) {
    this.setState({
      outputText: event.target.value,
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
      outputItems: trimmed,
      outputText: result.trimRight(),
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

function copyText(text) {
  navigator.clipboard.writeText(text)
}

function exportOutputToCSV(array, filename) {
  var csv = []
  // var rows = document.querySelectorAll("table tr")
  // for (var i = 0; i < rows.length; i++) {
  //   var row = [],
  //     cols = rows[i].querySelectorAll("td, th")
  //   for (var j = 0; j < cols.length; j++) {
  //     row.push(cols[j].innerText)
  //   }
  //   csv.push(row.join(","))
  // }
  // result = csv.join("\n")

  // download csv file
  downloadCSV(array.join(","), filename)
}

function downloadCSV(csv, filename) {
  var csvFile
  var downloadLink

  if (
    window.Blob == undefined ||
    window.URL == undefined ||
    window.URL.createObjectURL === undefined
  ) {
    alert("Your browser doesn't support Blobs")
    return
  }

  csvFile = new Blob([csv], { type: "text/csv" })
  downloadLink = document.createElement("a")
  downloadLink.download = filename
  downloadLink.href = window.URL.createObjectURL(csvFile)
  downloadLink.style.display = "none"
  document.body.appendChild(downloadLink)
  downloadLink.click()
}
