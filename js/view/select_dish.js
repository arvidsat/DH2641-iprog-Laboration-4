var SelectDish = function(container, model, dishType) {
	dishType = dishType || "starter";

	this.viewID = "Select_Dish ID: " + Math.random();


	this.dishChooser = function(container, dishType) {
		appString = '<div class="row">';
			appString += '<div class="col-xs-12" id="dishChooserHeadline">';
				appString += '<p id="select_dish">Select dish</p>';
			appString += '</div>';
		appString += '</div>';
		appString += '<div class="row">'
			appString += '<div class="col-xs-12" id="dishChooserSearchFrame">';
				appString += '<input type="search" placeholder="Enter key words" name="search" id="searchBox"/>';
				appString += '<button class="btn" id="cancelSearch">X</button>';
				appString += '<button class="btn" id="searchButton">Search</button>';
				appString += '<select id="types">';
					appString += 	'<option value="Appetizers">Starter</option>' + 
									'<option value="Main Dish">Main</option>' + 
									'<option value="Desserts">Dessert</option>';
				appString += '</select>';
				appString += '<span id="searchResults"></span>';
			appString += '</div>';
		appString += '</div>';

		container.append(appString);
	}

	this.dishList = function(container, model, dishes) {
		container.empty();

		if (dishes != null) {
			dishListStr = '';
			// this.foundDishes = model.getAllDishes(selectedType, filter);
			foundDishes = dishes["Results"];
			// dishType = this.types.val();

			for (i = 0; i < foundDishes.length; i++) {
				// if (foundDishes[i]["Category"] == dishType) {
					dishListStr += '<div class="col-md-3 col-sm-4 col-xs-6 dishObjectFrame" id="' + foundDishes[i]["RecipeID"] + '">';
						dishListStr += dishThumb(foundDishes[i]);
						dishListStr += '<div class="dishDescription">';
							// dishListStr += shortenDescription(foundDishes[i]["description"]);
							dishListStr += shortenDescription("Lorem impsum dolor amet .asdf aosdj flaksjdf laksjdf lkasjd flkasjd flkajs dlfkjasdlkfjlaskd jfljk ads", 200);
						dishListStr += '</div>';
					dishListStr += '</div>';
				// }
			}

			container.append(dishListStr);
			this.searchResults.html("Found dishes: " + dishes["ResultCount"]);
		}
		
		model.setPendingPrice(0);
	}

	this.declareWidgets = function(container) {
		this.container = container;
		this.types = container.find("#types");
		this.buttonId1 = container.find("#1");
		this.searchBox = container.find("#searchBox");
		this.searchButton = container.find("#searchButton");
		this.cancelSearchButton = container.find('#cancelSearch');
		this.dishListContainer = container.find("#dishList");
		this.searchResults = container.find('#searchResults');
	}

	this.update = function(model, arg) {
		if (arg != null && arg["description"] == "dishes") {
			this.dishList(this.dishListContainer, model, arg["data"]);
			this.controller.dishLinks(this);
		} else if (arg != null && arg["description"] == "networkError") {
			this.dishListContainer.empty();
			errorString = '<div id="networkError">';
				errorString += 'A network error occurred. Please check your internet connection. <br/><br/>';
				errorString += 'Status: ' + arg["data"][1] + '<br/>';
			errorString += '</div>';
			this.dishListContainer.append(errorString);
		}
	}

	this.loading = function() {
		this.dishListContainer.empty();
		this.dishListContainer.append('<div class="loading"><img src="images/loading.gif"/></div>');
	}

	container.append('<div class="row" id="dishChooser"></div>');
	this.dishChooser($('#dishChooser'), dishType);

	container.append('<div class="row" id="dishList"></div>');

	//dishList($('#dishList'), model, dishType);

	this.declareWidgets(container);

	this.loading();

	this.controller = new SelectDishController(this, model);
	model.addObserver(this);
	model.getAllDishes(this.types.val(), '');

}

// var DishChooser = function(container) {
// 	container.append('<div class="row">');
// 	container.append('<div class="col-xs-12">Rad</div>');


// 	container.append('</div>');
// }


