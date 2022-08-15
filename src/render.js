export const renderPhotoCard = (photo) => {
    return `
    <a class = "img-link" href = "${photo.largeImageURL}">
    <div class="photo-card">
      <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>${photo.likes}</b>
        </p>
        <p class="info-item">
          <b>${photo.views}</b>
        </p>
        <p class="info-item">
          <b>${photo.comments}</b>
        </p>
        <p class="info-item">
          <b>${photo.downloads}</b>
        </p>
    </div>
    </a>`
}