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
