document.addEventListener("DOMContentLoaded", function () {
    // Load blog posts from JSON file
    fetch("data/blog.json")
      .then((response) => response.json())
      .then((posts) => {
        const blogContainer = document.getElementById("blog-container");
  
        posts.forEach((post) => {
          const col = document.createElement("div");
          col.className = "col-md-4";
  
          col.innerHTML = `
            <div class="card h-100 border-0 shadow-sm blog-card">
              <img src="${post.image}" class="card-img-top" alt="${post.title}">
              <div class="card-body text-start">
                <h5 class="fw-bold text-gold">${post.title}</h5>
                <p class="text-muted small">${post.excerpt}</p>
                <button class="btn btn-sm btn-gold mt-2" data-id="${post.id}">اقرأ المزيد</button>
              </div>
            </div>
          `;
  
          blogContainer.appendChild(col);
        });
  
        // Handle "Read More" clicks
        document.querySelectorAll(".btn-gold[data-id]").forEach((button) => {
          button.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const post = posts.find((p) => p.id == id);
            showBlogModal(post);
          });
        });
      })
      .catch((error) => console.error("Error loading blog posts:", error));
  });
  
  // Function to display blog post in a modal
  function showBlogModal(post) {
    const modalHTML = `
      <div class="modal fade" id="blogModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg">
            
            <!-- Header -->
            <div class="modal-header border-0 d-flex align-items-center justify-content-between px-4 pt-4 pb-2">
              <h5 class="modal-title fw-semibold text-gold" style="letter-spacing: 0.5px;">
                ${post.title}
              </h5>
              <!--<button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>-->
            </div>
  
            <!-- Body -->
            <div class="modal-body px-4 pb-4">
              <div class="mb-3 position-relative overflow-hidden rounded-3 shadow-sm">
                <img src="${post.image}" class="img-fluid rounded-3 w-100" alt="${post.title}" 
                     style="object-fit: cover; max-height: 380px;">
                <div class="position-absolute top-0 start-0 w-100 h-100"
                     style="background: rgba(0,0,0,0.15);"></div>
              </div>
              
              <p class="text-secondary lh-lg" style="font-size: 1rem;">
                ${post.content}
              </p>
            </div>
  
            <!-- Footer -->
            <div class="modal-footer border-0 d-flex justify-content-end bg-light py-3 px-4 rounded-bottom-3">
              <button type="button" class="btn btn-outline-dark px-4" data-bs-dismiss="modal">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  
  
    // Remove any existing modal
    const existingModal = document.getElementById("blogModal");
    if (existingModal) existingModal.remove();
  
    // Add modal to page
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById("blogModal"));
    modal.show();
  }
  