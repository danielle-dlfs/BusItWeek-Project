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
      question: 'Can I have a successful IT career as a woman?',
      responseElem: $('.a1')
    },
    {
      question: 'How do I get started in IT?',
      responseElem: $('.a2')
    },
    {
      question: 'What is the current balance of male versus female?',
      responseElem: $('.a3')
    },
    {
      question: 'I LIKE TRAAAAINS',
      responseElem: $('.a4')
    }
  ];

  const get = () => {
    return clone(predefined);
  };

  const answerQuestion = (question) => {
    return predefined.filter((query) => {
      return query.question === question;
    })[0].responseElem;
  };

  return { get: get, getAnswerTo: answerQuestion }
})();

const Alex = (() => {
  const respond = (question) => {
    const $answerElement = Queries.getAnswerTo(question);
    $('main > div:visible').fadeOut('fast', () => {
      $answerElement.fadeIn();
    });
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
