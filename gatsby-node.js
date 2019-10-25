/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
	const info = path.resolve(`src/templates/info.js`)
	// **Note:** The graphql function call returns a Promise
	// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
	const result = await graphql(`
		query MyQuery {
			allMongodbTestChapters {
				edges {
					node {
						id
						mongodb_id
						slug
						dir
					}
				}
			}

			allMongodbTestManga {
				edges {
					node {
						id
						title
						chapters
					}
				}
			}
		}
	`)

	result.data.allMongodbTestChapters.edges.forEach(edge => {
		createPage({
			// Path for this page — required
			path: `${edge.node.mongodb_id}`,
			component: blogPostTemplate,
			context: {
				dir: edge.node.dir,
			},
		})
	})
}
