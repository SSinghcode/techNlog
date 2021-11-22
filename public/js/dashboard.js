const newPostHandler = async (event) => {
    event.preventDefault();
  
    document.location.replace('/dashboard/new');
  };
  
  const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to insert post.');
      }
    }
  };
  
  const updatePostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const id = document.querySelector('#post-title').getAttribute('data-userid');
  
    if (title && content) {
      const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content, id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post.');
      }
    }
  };
  
  const deletepostHandler = async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#post-title').getAttribute('data-userid');
  
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post.');
    }
  
  };
  
  const nfp = document.querySelector('.new-post-form');
  if (nfp) {
    nfp.addEventListener('submit', postFormHandler);
  }
  
  const nbh = document.querySelector('#new-post');
  if (nbh) {
    nbh.addEventListener('click', newPostHandler);
  
  }
  
  const eupd = document.querySelector('#edit-update');
  if (eupd) {
    eupd.addEventListener('click', updatePostHandler);
  }
  
  const edel = document.querySelector('#edit-delete');
  if (edel) {
    edel.addEventListener('click', deletePostHandler);
  }
  // document
  //   .querySelector('.new-post-form')
  //   .addEventListener('submit', postFormHandler);
  
  // document
  //   .querySelector('#new-post')
  //   .addEventListener('click', newPostHandler);
  
  