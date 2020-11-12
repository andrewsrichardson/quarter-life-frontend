import Cookie from "js-cookie";
import Axios from "axios";
const token = Cookie.get("token");

let headers = {
  "Content-Type": "application/json",
};
if (token) {
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
  }
  return json.data;
}

export async function getUpvotes() {
  const data = await fetchAPI(
    `
    query{
      me{
        user{
          upvotes{
            id
            question{
              id
            }
            post{
              id
            }
            comment{
              id
            }
          }
        }
      }
    }
  `
  );
  return data.me.user.upvotes;
}

export async function createUpvote(comment, post, question) {
  const data = await Axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upvotes`,
    {
      comment,
      post,
      question,
    },
    {
      headers: headers,
    }
  );
  return data;
}
export async function deleteUpvote(id) {
  const data = await Axios.delete(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upvotes/${id}`,
    {
      headers: headers,
    }
  );
  return data;
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  );
  return data?.posts[0];
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `);
  return data?.allPosts;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 10, where: $where) {
        title
        slug
        excerpt
        date
        category
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: "published" }),
        },
      },
    }
  );
  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title
      slug
      content
      date
      category
      upvotes{
        id
      }
      ogImage: coverImage{
        url
      }
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      excerpt
      date
      category
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : { status: "published" }),
        },
        where_ne: {
          ...(preview ? {} : { status: "published" }),
          slug_ne: slug,
        },
      },
    }
  );
  return data;
}
export async function getAllQuestionsForForum() {
  const data = await fetchAPI(
    `
    query Questions{
      questions(sort: "created_at:desc", limit: 10) {
        title
        id
        created_at
        content
        comments{
          id
        }
        user {
          username
        }
        upvotes{
          id
        }
      }
    }
  `
  );
  return data?.questions;
}

export async function getQuestionsByCategory(category) {
  const data = await fetchAPI(
    `
    query Questions($cat: String!){
      questions(sort: "created_at:desc", limit: 10, where: {category:$cat}) {
        title
        id
        created_at
        content
        category
        comments{
          id
        }
        user {
          username
        }
        upvotes{
          id
        }
      }
    }
  `,
    {
      variables: {
        cat: category,
      },
    }
  );
  return data.questions;
}
export async function getQuestionByID(id) {
  const data = await fetchAPI(
    `
  query PostBySlug($id: String!) {
    questions(where: {id: $id}) {
      id
      title
      content
      created_at
      upvotes{
        id
      }
      user{
        username
      }
      comments{
        id
        user{
          username
        }
        created_at
        content
        upvotes{
          id
        }
      }
    }
  }
  `,
    {
      variables: {
        id: id.toString(),
      },
    }
  );
  return data.questions;
}

export async function getCategories() {
  const data = fetchAPI(`
  query categories {
    __type(name: "ENUM_QUESTION_CATEGORY") {
      enumValues {
        name
      }
    }
}
  `);
  return data;
}

export async function getTopicByCategory(topic) {
  const data = await fetchAPI(
    `
    query TopicByCat($cat: String!) {
      topics(where: {category  : $cat}) {
        category
        content
      }
      posts(where: {category  : $cat}) {
        category
        title
        slug
        date
        excerpt
        author{
          name
        }
        coverImage{
          url
        }
      }
    }
  `,
    {
      variables: {
        cat: topic,
      },
    }
  );
  return data;
}

export async function getUpvotesByUser(id) {
  const data = await fetchAPI(
    `
    query getUpvotesByUser($id : ID!){
      user(id:$id){
        upvotes{
          question{
            id
          }
          post{
            id
          }
          comment{
          id
          }
        }
      }
    }
  `,
    {
      variables: {
        id: id.toString(),
      },
    }
  );
  return data;
}
