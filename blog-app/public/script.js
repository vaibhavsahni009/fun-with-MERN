// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    // JavaScript to handle delete post
    const deleteLinks = document.querySelectorAll('.delete-post');
    deleteLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const postId = link.getAttribute('data-id');
        fetch(`/delete/${postId}`, { method: 'DELETE' })
          .then(response => {
            if (response.ok) {
              // Reload the page after successful delete
              window.location.reload();
            }
          })
          .catch(error => console.error('Error deleting post:', error));
      });
    });
  
    // Form submission handling using Fetch API
    const newPostForm = document.getElementById('new-post-form');
    newPostForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(newPostForm);
      fetch('/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams(formData).toString()
      })
        .then(response => {
          if (response.ok) {
            // Reload the page after successful post creation
            window.location.reload();
          }
        })
        .catch(error => console.error('Error creating new post:', error));
    });
  });
  