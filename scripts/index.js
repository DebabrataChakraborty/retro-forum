// API URL
const apiURL = "https://openapi.programming-hero.com/api/retro-forum/posts";

// Array to hold fetched posts
let allPosts = [];

// Fetch posts from the API
async function fetchPosts() {
  try {
    const response = await fetch(apiURL);
    const result = await response.json();

    if (result && result.posts && Array.isArray(result.posts) && result.posts.length > 0) {
      allPosts = result.posts; // Store all posts for searching
      renderPosts(allPosts); // Render posts
    } else {
      console.error("No posts found in the response.");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Function to render posts
function renderPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = ""; // Clear container before rendering

  if (posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts available.</p>";
    return;
  }

  // Render posts
  posts.forEach(post => {
    const postCard = createPostCard(post);
    postsContainer.insertAdjacentHTML('beforeend', postCard);
  });
}

// Helper function to create a post card HTML
function createPostCard(post) {
  return `
    <div class="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src="${post.image}" alt="Post Image" />
      </figure>
      <div class="card-body">
        <p class="gap-3 text-lg text-blue-600">
          <span class="mr-8">#${post.category}</span> <span>Author: ${post.author.name}</span>
        </p>
        <h2 class="card-title">${post.title}</h2>
        <p>${post.description}</p>
        <p>
          <img src="images/comment.png" alt="Comment Icon" class="w-6 h-6 mr-2">
          <span>${post.comment_count}</span>
          <img src="images/view.png" alt="View Icon" class="w-6 h-6 mr-2">
          <span>${post.view_count}</span>
          <img src="images/clock.png" alt="Time Icon" class="w-6 h-6 mr-2">
          <span>${post.posted_time}</span>
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" onclick="addTitle('${post.title}', ${post.view_count})">Read More</button>
        </div>
      </div>
    </div>
  `;
}

// Function to handle title addition
let selectedTitles = [];
function addTitle(title, view_count) {
  const existingTitle = selectedTitles.find(item => item.title === title);

  if (!existingTitle) {
    selectedTitles.push({ title, view_count });
    
    const titleList = document.getElementById("title-list");
    const listItem = document.createElement("li");
    listItem.innerHTML = `${title} <img src="images/view.png" alt="Icon" class="w-6 h-6 mr-2"> ${view_count}`;
    titleList.appendChild(listItem);

    const titleCount = document.getElementById("title-count");
    titleCount.textContent = `Mark as read (${selectedTitles.length})`;
  }
}

// Updated search function
function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.toLowerCase();

  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query)||post.category.toLowerCase().includes(query)||post.author.name.toLowerCase().includes(query)
  );

  renderPosts(filteredPosts); // Render all matching posts
}

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', handleSearch);

// Call fetchPosts when the page loads
window.onload = fetchPosts;
