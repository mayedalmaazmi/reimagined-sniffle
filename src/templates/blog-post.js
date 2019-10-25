import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default ({ data }) => {
	let chapters = data.allFile.edges.sort((a, b) => {
      return parseInt(a.node.name) - parseInt(b.node.name)
    })
	console.log(chapters);
	return <Layout>
		{chapters.map(chapter=><img src={chapter.node.publicURL}/>)}
	</Layout>
}
export const query = graphql`
	query MyQuery($dir: String!) {
		allFile(filter: { relativeDirectory: { eq: $dir } }) {
			edges {
				node {
					id
					name
					dir
					relativePath
					publicURL
					relativeDirectory
				}
			}
		}
	}
`
