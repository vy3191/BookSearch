(function($){
   $(document).ready(function(){
       var searchForm = $('#searchForm');
       var inputSearch = $('#searchForm :input')[0];

       searchForm.submit(function(event){ 
       event.preventDefault();
       callBookSearchAPI(inputSearch.value);
       inputSearch.value = '';
       });
   });
})(jQuery);

function callBookSearchAPI(inputValue) {
    if(inputValue) {
       $.ajax({
       	  url: "https://www.googleapis.com/books/v1/volumes?q=" + inputValue
        }).done(function(data){
        	var bookContainer = $('.bookContainer');
        	bookContainer.empty();
            printToDom(data.items);
        }).fail(function(error){ 
            console.log(error);
        }).always(function(){ 
            console.log("done"); 
        })
    }    
}

function printToDom(bookList){
     var bookListElement = $('.bookContainer');
     bookList.forEach(function(item){
         bookListElement.append( bookElement(item) );
       });
 }


function bookElement(book){
	var bookElement = $("<div class='media'><div class='media-left'></div> <div class='media-body'></div></div>");
       var title = $('<h2></h2>');
       var bookCover = $('<img />');
       var subTitle = $('<p class="lead"></p>');
       var description = $('<p></p>');
       var author = $('<p class="author"></p>');

       title.text(book.volumeInfo.title);
       bookCover.attr('src', (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : '');
       subTitle.text(book.volumeInfo.subtitle);
       description.text(book.volumeInfo.description);
       author.text(book.volumeInfo.author);

       bookElement
         .find('.media-body')
         .append(title)
         .append(subTitle)
         .append(description)
         .append(author)
      bookElement
         .find('.media-left')
         .append(bookCover)
      return bookElement;      
}
