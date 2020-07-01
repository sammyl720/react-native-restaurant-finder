import createDataContext from './createDataContext'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [...state, { id: Math.floor(Math.random() * 99999), ...action.payload }]
    case 'delete_blogpost':
      return state.filter(( blogPost ) => blogPost.id !== action.payload)
    case 'edit_blogpost':
      return state.map(blogPost => blogPost.id === action.payload.id ? action.payload : blogPost
      )
    default:
      return state
  }
}

const addBlogPost = ( dispatch ) => {
  return (title, content, callback) => {
    dispatch({ type: 'add_blogpost', payload: { title, content }})
    if (callback) callback()
  }
}

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_blogpost', payload: id })
  }
}

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({ 
      type: 'edit_blogpost', 
      payload: { id, title, content }
    })
    if (callback) callback()
  }
}
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ id: 1, title: 'TEST POST', content: 'TEST Content '}]
)