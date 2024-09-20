// API URL
const apiURL = "https://openapi.programming-hero.com/api/retro-forum/posts";

// Fetch posts from the API
async function fetchPosts() {
  try {
    const response = await fetch(apiURL);
    const result = await response.json();

    console.log("API Response:", result); // Check the full response

    // Check if the response contains the expected posts
    if (result && result.posts && Array.isArray(result.posts) && result.posts.length > 0) {
      console.log("Posts posts:", result.posts);
      renderPosts(result.posts); // Render posts
    } else {
      console.error("No posts found in the response.");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}


function renderPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  if (!postsContainer) {
    console.error("Posts container not found!");
    return;
  }

  postsContainer.innerHTML = ""; // Clear container before rendering

  if (posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts available.</p>";
    return; // Early return if no posts
  }

  posts.forEach(post => {
    console.log(post.title); // Log each post title

    // Check if body exists before using slice
    const postBody = post.body ? post.body.slice(0, 100) : "No content available.";

    const postCard = `
        <div class="card card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src="${post.image}"
      alt="Movie" />
  </figure>
  <div class="card-body">
<p class="gap-3 text-lg text-blue-600">
              <span class="mr-8">#${post.category}</span> <span>Author: ${post.author.name}</span>
            </p>
    <h2 class="card-title">${post.title}</h2>
    <p>${post.description}</p>
    <p><img src="images/comment.png" alt="Icon" class="w-6 h-6 mr-2"><span>${post.comment_count}</span> <img src="images/view.png" alt="Icon" class="w-6 h-6 mr-2"><span>${post.view_count}</span> <img src="images/clock.png" alt="Icon" class="w-6 h-6 mr-2"><span>${post.posted_time}</span> </p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary"onclick="addTitle('${post.title}',${post.view_count})">Read More</button>
    </div>
  </div>
</div>
      `;

    postsContainer.insertAdjacentHTML('beforeend', postCard); // More efficient
  });
}
let selectedTitles = [];

function addTitle(title, view_count) {
  // Check if the title already exists in the array
  const existingTitle = selectedTitles.find(item => item.title === title);

  if (!existingTitle) {
    // Add the title and view count as an object to the array
    selectedTitles.push({ title, view_count });
console.log(view_count);
    // Update the title list
    const titleList = document.getElementById("title-list");
    const listItem = document.createElement("li");
    listItem.innerHTML = `${title} <img src="images/view.png" alt="Icon" class="w-6 h-6 mr-2"> ${view_count}`;


    titleList.appendChild(listItem);

    // Update the count
    const titleCount = document.getElementById("title-count");
    titleCount.textContent = `Count: ${selectedTitles.length}`;
  }
}
// Call fetchPosts when the page loads
window.onload = fetchPosts;
