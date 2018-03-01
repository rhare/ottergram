var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var DETAIL_IMAGE_NAV_SELECTOR = '[data-image-role^="nav"]';


/*
 * Set details of detail-image object.
 *
 */
function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}


/*
 * Return image url given thumbnail object
 */
function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}


/*
 * Return title text given thumbnail object
 */
function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}


/*
 * Add click event handler to image thumbnails that replaces the
 * detailed image on click. Updates prev and next target id values on
 * prev and next arrows.
 */
function addThumbClickHandler(thumb){
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    var image_id = parseInt(thumb.getAttribute('data-image-id'));
    setDetailsFromThumb(thumb);
    updateNavPrev(image_id);
    updateNavNext(image_id);
  });
}


/* 
 * Add click event hanlder on navigation prev and next buttons. The event will
 * trigger the click event for the thumbnail id listed in data-image-target-id.
 */
function addDetailImageNavClickHandler(navButton){
  'use strict';
  navButton.addEventListener('click', function (event) {
    event.preventDefault();
    var thumbnail_id = parseInt(navButton.getAttribute('data-image-target-id'));
    var thumbnail = document.querySelector('[data-image-id="' + thumbnail_id + '"]');
    thumbnail.click();  // click will update prev/next id targets
  });
}


/*
 * Returns an array of thumbnail objects based on THUMBNAIL_LINK_SELECTOR.
 */
function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

/*
 * Returns an array of nav button objects based on DETAIL_IMAGE_NAV_SELECTOR.
 */
function getDetailImageNavArray() {
  'use strict';
  var navButtons = document.querySelectorAll(DETAIL_IMAGE_NAV_SELECTOR);
  var navButtonArray = [].slice.call(navButtons);
  return navButtonArray;
}


/*
 * Update the data-image-target-id value based on the newly selected target_id.
 * Will set data-image-target-id to target_id - 1 if lessthan or equal to zero.
 * Else, wrap around to the last item.
 */
function updateNavPrev(target_id) {
  'use strict';
  var prev = document.querySelector('[data-image-role="nav-prev"]');
  var thumbnails = getThumbnailsArray();
  target_id = (target_id - 1 < 0) ?thumbnails.length - 1 : target_id - 1;
  prev.setAttribute('data-image-target-id', target_id);
}


/*
 * Update the data-image-target-id value based on the newly selected target_id.
 * Will set data-image-target-id to target_id + 1 if greaterthan or equal to thumbnail
 * list length. Else, wrap around to the first item.
 */
function updateNavNext(target_id) {
  'use strict';
  var next = document.querySelector('[data-image-role="nav-next"]');
  var thumbnails = getThumbnailsArray();
  target_id = (target_id + 1 > thumbnails.length - 1) ? 0 : target_id + 1;
  next.setAttribute('data-image-target-id', target_id);
}


/*
 * Set detail-image details from passed thumbnail object.
 */
function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}


/*
 * Initialize events and event handlers.
 */
function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  
  var detailImageNavButtons = getDetailImageNavArray();
  detailImageNavButtons.forEach(addDetailImageNavClickHandler);
}

// Run all the javascript :)
initializeEvents();
