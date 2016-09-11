
$('document').ready(function(){
  populateDomFromLocalStorage();
});

//why do we need this code?????? project breaks without it. needs to be a part of the populate function
if (localStorage.getItem('ideaBox')) {
  ideaBox = JSON.parse(localStorage.getItem('ideaBox'));
} else {
  ideaBox = [];
}


$('ul').on('click', '.card-delete', function () {
  ideaBox = removeIdea(this.closest('li').id);
  this.closest('li').remove();
  storeIdeasPlease();
  // stringIdeas = JSON.stringify(ideaBox);
  // localStorage.setItem('ideas', stringIdeas);
});


function Idea (title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'swill';
}

function removeIdea (id) {
  return ideaBox.filter(function(idea){
    return parseInt(id) !== idea.id;
  });

}


$('#save').on('click', function() {
  var $titleInput = $('#title').val();
  var $bodyInput = $('#body').val();
  buildAndRenderIdea($titleInput, $bodyInput);
  clearIdeaInput();
});




function populateDomFromLocalStorage () {
  var ideas = JSON.parse(localStorage.getItem('ideaBox'));
  ideas.forEach(function(idea){
    addNewCard(idea.title, idea.body, idea.id);
  });
}



function buildAndRenderIdea(title, body) {
  var idea = new Idea(title, body);
  addNewCard(idea.title, idea.body, idea.id);
  addEntry(idea);
  storeIdeasPlease();
  // var stringIdeas = JSON.stringify(ideaBox);
  // localStorage.setItem('ideas', stringIdeas);
}



// each new idea is a stringified object
function addEntry (idea) {
   ideaBox.push(idea);
}

function clearIdeaInput() {
  $('#title').val('');
  $('#body').val('');
}



function addNewCard(title, body, id) {
  $('.card').prepend(`
    <li id=${id}>
      <header id="card-header">
        <h2 class="card-title" contenteditable="true" onkeyup="">${title}</h2>
        <button class="card-delete"></button>
      </header>
      <p class="card-body" contenteditable="true" onkeyup="addEntry">${body}</p>
      <footer id="card-footer">
        <button class="up-vote"></button>
        <button class="down-vote"></button>
         <p class="quality-level">Quality: <span class="idea-quality-level">${'swill'}</span></p>
      </footer></li>`
    );
}

$(document).ready(function(){
    $('#search').keyup(function(){
        var filter = $(this).val(), count = 0;
        $('.card li').each(function(){
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show();
                count++;
            }
        });
    });
});

$('ul').on('click', '.up-vote', function () {
  var id = parseInt($(this).parent().parent().attr('id'));
  var quality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text();

  if (this.id === this.id && quality === 'swill') {
    return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('plausible');
      } else if (this.id === this.id && quality === 'plausible') {
          return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('genius');
  }

    storeIdeasPlease ();
    populateDomFromLocalStorage ();
});


$('ul').on('click', '.down-vote', function () {
  var id = parseInt($(this).parent().parent().attr('id'));
  var quality = $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text();

  if (this.id === this.id && quality === 'genius') {
    return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('plausible');
      } else if (this.id === this.id && quality === 'plausible') {
          return $(this).siblings().closest('.quality-level').children($('.idea-quality-level')).text('swill');
  }
      storeIdeasPlease ();
      populateDomFromLocalStorage ();
});


function storeIdeasPlease () {
  localStorage.setItem("ideaBox", JSON.stringify(ideaBox));
}

//store to local, clear the page, render again with new stuff


// needs to store also

// function storeIdea () {
//
// localStorage.setItemideasstringify
//
// }

$('.ideas').on('blur','.card-title', function () {
var thisID = parseInt($(this).parents('li').prop('id'));
var newTitle = $(this).text();
editTitle(thisID, newTitle);

});

function findIdeaById(thisID) {
  return this.ideaBox.find(function(idea){
    return idea.id === thisID;
  });
}

//   search ideabox array for an idea by the id
//   return the idea that matches this ID
//   don't forget to parseInt the ID
// }

// ideaBox.find(thisID).editTitle(newTitle);

function editTitle (thisID, newTitle) {
  var idea = findIdeaById(thisID);
  idea.title = newTitle;
  storeIdeasPlease();
}

function editBody (body) {
  this.body = body;
}
