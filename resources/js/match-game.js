var MatchGame = {};

$(document).ready(function() {
  var $game = $("#game");
  var value = MatchGame.generateCardValues();
  MatchGame.renderCards(value, $game);
});


/*
Sets up a new game after HTML document has loaded.
Renders a 4x4 board of cards.
*/

/*
Generates and returns an array of matching card values.
*/

MatchGame.generateCardValues = function () {
  var orderedCardValues = [];
  for(var i = 1; i <= 8; i++) {
    orderedCardValues.push(i);
    orderedCardValues.push(i);
  }
  var randomCardValues = [];
  while(orderedCardValues.length > 0) {
    var randomI = Math.floor(Math.random() * orderedCardValues.length);
    var randomV = orderedCardValues.splice(randomI, 1)[0];
    randomCardValues.push(randomV);
  }
  return randomCardValues;
};

/*
Converts card values to jQuery card objects and adds them to the supplied game
object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = ['hsl(25, 85%, 65%)',
  'hsl(55, 85%, 65%)',
  'hsl(90, 85%, 65%)',
  'hsl(160, 85%, 65%)',
  'hsl(220, 85%, 65%)',
  'hsl(265, 85%, 65%)',
  'hsl(310, 85%, 65%)',
  'hsl(360, 85%, 65%)'];

  $game.empty();
  $game.data('flippedCards', []);

  for (var j = 0; j < cardValues.length; j++) {
    var k = cardValues[j];
    var cardColor = colors[k - 1];
    var data = {
      value: k,
      color: cardColor,
      flipped: false
    };
    var $object = $("<div class='col-xs-3 card'></div>");
    $object.data(data);
    $game.append($object);
  }
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
Flips over a given card and checks to see if two cards are flipped over.
Updates styles on flipped cards depending whether they are a match or not.
*/

MatchGame.flipCard = function($card, $game) {
  if($card.data("flipped")) {
    return;
  }
  $card.css("background-color", $card.data("color")).text($card.data("value")).data("flipped", true);
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if(flippedCards.length === 2) {
    if(flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var match = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      }
      flippedCards[0].css(match);
      flippedCards[1].css(match);
    }
    else{
      window.setTimeout(function() {
        flippedCards[0].css('background-color', 'rgb(32, 64, 86)').text('').data('flipped', false);
        flippedCards[1].css('background-color', 'rgb(32, 64, 86)').text('').data('flipped', false);
      }, 400);
      $game.data('flippedCards', []);
    }
  }
};
