export function setActionDescription(action, description) {
  $('#modal-action').modal('show');
  $('#modal-action-text').html(action);
  $('#modal-description-text').html(description);
  setTimeout(function() {
    $('#modal-action').modal('hide');
  }, 2000);
}
