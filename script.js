let currentPostIndex = -1; //track the currently edited post 

// Function to submit the form and create a new post
function submitForm() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').files[0];
  const video = document.getElementById('video').files[0];

  const post = { title, content, image: null, video: null };

  if (image) {
    post.image = URL.createObjectURL(image);
  }

  if (video) {
    post.video = URL.createObjectURL(video);
  }

  posts.push(post);
  updatePosts();
  clearForm();
}

// Array to store posts data
let posts = [];

// Function to update the displayed posts
function updatePosts() {
  currentPostIndex = -1;
  const dataSection = document.getElementById('dataSection');
  dataSection.innerHTML = '';
  posts.forEach((post, index) => {
    let newData = "<div class='card'>" +
      "<div class='card-header'>" +
      "<h3 class='card-title'><b>Title:</b> " + post.title + "</h3>" +
      "</div>" +
      "<div class='card-body'>" +
      "<p><b>Content: </b>" + post.content + "</p>";

    if (post.image) {
      newData += "<p><b>Image:</b></p>";
      newData += "<div class='card-body-image'>" +
        "<img class='image-preview' src='" + post.image + "' alt='Selected Image'>" +
        "</div>";
    }

    if (post.video) {
      newData += "<p><b>Video:</b></p>";
      newData += "<div class='card-body-video'>" +
        "<video class='video-preview' src='" + post.video + "' controls autoplay muted></video>" +
        "</div>";
    }

    newData += "<div class='card-actions'>" +
      "<button class='edit-button' onclick='editPost(" + (index) + ")'>Edit</button>" +
      "<button class='delete-button' onclick='deletePost(" + (index) + ")'>Delete</button>" +
      "</div>";

    newData += "</div></div>";
    dataSection.innerHTML += newData;
  });
}

// For clear the form after submission
function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('image').value = '';
  document.getElementById('video').value = '';
}

// For edit a post
function editPost(index) {
  currentPostIndex = index;
  const post = posts[currentPostIndex];
  document.getElementById('title').value = post.title;
  document.getElementById('content').value = post.content;
  document.getElementById('image').value = '';
  document.getElementById('video').value = '';
}

// For delete a post
function deletePost(index) {
  const confirmed = confirm('Are you sure you want to delete this post?');
  if (confirmed) {
    posts.splice(index, 1);
    updatePosts();
  }
}
