import $ from 'jquery';

export function logOut() {
  return () => {
    $.ajax({
      url: '/logout',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).always(() => {
      window.location.reload();
    });
  }
}

export function logIn(credentials) {
  $.ajax({
    type: 'POST',
    url: '/login',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(credentials),
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    dataType: 'json'
  }).always(() => {
    window.location.reload();
  });
}
