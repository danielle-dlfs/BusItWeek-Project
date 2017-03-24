const clone = function (o) {
  if (null == o || 'object' != typeof o) return o;
  const copy = o.constructor();
  for (var attr in o) {
    if (o.hasOwnProperty(attr)) copy[attr] = o[attr];
  }
  return copy;
}

const Queries = (() => {
  const predefined = [
    {
      question: 'This is a silly question',
      response: 'This is a silly answer'
    },
    {
      question: 'This is another silly question, right?',
      response: 'Pretty much'
    },
    {
      question: 'Hi I\'m a woman',
      response: 'Hello woman.'
    },
    {
      question: '',
      response: ''
    },
    {
      question: '',
      response: ''
    },
    {
      question: '',
      response: ''
    }
  ];

  const get = () => {
    return clone(predefined);
  };

  const answerQuestion = (question) => {
    return predefined.filter((query) => {
      return query.question === question;
    })[0].response;
  };

  return {
    get: get,
    getAnswerTo: answerQuestion
  }
})();

const Alex = (() => {
  const respond = (question) => {
    $('main').prepend(Queries.getAnswerTo(question));
  };
  return { respond: respond };
})();

$(document).ready((function() {
  const input = $('input[name=questionList]');
  Queries.get().forEach((query) => {
    $option = $(`<option value="${query.question}">${query.question}</option>`);
    $('datalist').append($option);
  });
  input.on('keyup', (e) => {
    if (e.keyCode !== 13) return;
    e.preventDefault();
    Alex.respond(input.val());
  });
}));
