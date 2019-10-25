import React from "react"
import { Router, Link } from "@reach/router"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

class List extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	async componentDidMount() {
		const { data } = await axios(
			"https://unmarred-utahceratops.glitch.me/manga"
		)
		this.setState({ data })
	}

	render() {
		return (
			<div>
				<h1>فهرس</h1>
				<ul>
					{this.state.data.map(data1 => (
						<li key={data1._id}>
							<Link to={data1._id}>{data1.title}</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}


class MangaPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = { data: {} }
	}

	async componentDidMount() {
		const { data } = await axios(
			`https://unmarred-utahceratops.glitch.me/manga/${this.props.id}`
		)
		this.setState({ data })
		
	}

	async componentDidUpdate(prevProps) {
		if (this.props.id !== prevProps.id) {
			const { data } = await axios(
				`https://unmarred-utahceratops.glitch.me/manga/${this.props.id}`
			)
			this.setState({ data })
		}
	}



    render() {
        const {data} = this.state;
        return <div>
            {data.title}
            <ul>
            	{data.chapters && data.chapters.map(chapter => <li><a href={`chapter/${chapter._id}`}>{chapter.title}</a></li>)}
            </ul>
        </div>
    }
}

class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	async componentDidMount() {
		const { data } = await axios(
			"https://unmarred-utahceratops.glitch.me/manga"
		)
		this.setState({ data })
	}

	render() {
		return (
			<Layout>
				<SEO title="Home" />
				<Router>
					<MangaPage path="/:id" />
					<List path="/"/>
				</Router>
			</Layout>
		)
	}
}

export default IndexPage
