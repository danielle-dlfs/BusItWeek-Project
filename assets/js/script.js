const getQuestions = () => {
  return [
    'This is a silly question',
    'This is another silly question, right?',
    ''
  ];
};

$(document).ready((function() {
  getQuestions().forEach((question) => {
    $option = $(`<option value="${question}">${question}</option>`);
    $('datalist').append($option);
  });
}));
