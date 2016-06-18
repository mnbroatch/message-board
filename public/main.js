"use strict;"

$(document).ready(function(){
	$('#new-message-form>button').on('click', function(e){
		e.preventDefault();

		//  add message to database
		//  add message to page

		let author = $('#new-message-form>.author-field').val();
		let message = $('#new-message-form>.message-field').val();
		let isSpoiler = $('#new-message-form>.spoiler-field').is(':checked'); 
		console.log(isSpoiler);
		addMessageToDatabase(author,message,isSpoiler);
	});


	$('#message-area').on('click','.delete-button', function(e){
		let id = e.target.parentNode.dataset.id;
		e.target.parentNode.remove();
		deleteMessageFromDatabase(id);
	});

	$('#message-area').on('click','.edit-button', function(e){
		console.log('djdjdjdj');
	});

	$('#message-area').on('click','a', function(e){
		e.preventDefault();
		e.target.parentNode.appendChild(document.createTextNode(e.target.dataset.text));
		e.target.remove();
	});


});


function addMessageToDatabase(author,text,isSpoiler){
	let settings = {
		url:'./messages',
		method:'POST',
		data:{author:author,text:text,isSpoiler:isSpoiler},
		success: function(data) {
			addMessageToPage(author,text,data.id,isSpoiler);
		}
	};
	$.ajax(settings);
}

function addMessageToPage(author,text,id,isSpoiler){
	let messageToAdd = $('.message.template').clone();
	messageToAdd.removeClass('template');
	messageToAdd.find('h4.author').text("Author: " + author);
	messageToAdd.attr('data-id',id);
	if(isSpoiler){
		messageToAdd.find('p.message').empty().append($('<a>').addClass('spoiler').text('Spoiler').attr('href','#').attr('data-text',text));
	}
	else {
		messageToAdd.find('p.message').text(text);
	}
	$('#message-area').append(messageToAdd);
}

function deleteMessageFromDatabase(id){
	let settings = {
		url:'./messages/' + id,
		method:'DELETE'
	};
	$.ajax(settings);
}









