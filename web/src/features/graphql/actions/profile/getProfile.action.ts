import { gql, DocumentNode } from "@apollo/client"

export const GET_PROFILE: DocumentNode = gql`
	query Profile($userName: String!) {
		profile(userName: $userName) {
			user {
				id
				name
				email
				role
				createdAt
			}
			info
			isPublic
			avatar_url
		}
	},
`
