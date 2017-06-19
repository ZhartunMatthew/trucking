const popupDelay = 2500;
const animationDelay = 400;
const initialBackground = '#0a6028';
const errorBackground = '#6d1a0f';

export function setActionDescription(info) {
  showModal();
  $('#modal-action-text').html(info.action);
  $('#modal-description-text').html(info.description);
  setTimeout(function() {
    hideModal();
  }, popupDelay);
  returnInitialBackground();
}

export function setActionFail(status) {
  showModal(errorBackground);
  if(status !== undefined) {
    $('#modal-action-text').html('Operation failed!');
    $('#modal-description-text').html('Error code: <b>' + status + '</b>');
  } else {
    $('#modal-action-text').html('Error while updating form!');
    $('#modal-description-text').html('Returned to the start page');
  }
  setTimeout(function() {
    hideModal();
  }, popupDelay);
  returnInitialBackground();
}

export function setValidationFail(info) {
  showModal(errorBackground);
  $('#modal-action-text').html('Operation failed!');
  $('#modal-description-text').html(info);
  setTimeout(function() {
    hideModal();
  }, popupDelay);
  returnInitialBackground();
}

function showModal(color) {
  $('#modal-action').css('display', 'block');
  if(color !== undefined) {
    $('#modal-content').css('background-color', color);
  } else {
    $('#modal-content').css('background-color', initialBackground);
  }
  $('#modal-action').animate({
    opacity: 1,
    bottom: "+=30"
  }, animationDelay);
}

function hideModal() {
  $('#modal-action').animate({
    opacity: 0,
    bottom: "-=30"
  }, animationDelay);
}

function returnInitialBackground() {
  setTimeout(function () {
    $('#modal-content').css('background-color', initialBackground);
    $('#modal-action').css('display', 'none');
  }, popupDelay + animationDelay
  )
}
