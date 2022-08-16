export const markup = img => {
    return `
       <div class="photo-card">
        <a href="${img.largeImageURL}" class="img-link">
          <img class="photo-item" src="${img.webformatURL}" alt="${img.tags}" width="270px" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${img.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${img.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${img.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${img.downloads}</b>
          </p>
        </div>
        </div>
    `
}
