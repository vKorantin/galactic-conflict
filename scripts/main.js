////////////////
// Variables. //
////////////////

// Recupération du canvas et de son context.
const board = document.getElementById("board"); // Récupère le canvas dans le HTML.
const context = board.getContext("2d"); // Récupère le context du canvas.

// Dimension des tuiles (constante).
const cases_size = 64;

// Images.
const feu = new Image(64, 64);
feu.src = 'data/img/feu.png';

const croix = new Image(64, 64);
croix.src = 'data/img/croix.png';

const rond = new Image(64, 64);
rond.src = 'data/img/rond.png';

const background = new Image(640, 640); // Créé une nouvelle image.
background.src = 'data/img/fond.jpg'; // Récupère le fichier image à afficher.

const shipsVert = new Image(320, 320);
shipsVert.src = 'data/img/ships_vert.png';

const shipsHor = new Image(320, 320);
shipsHor.src = 'data/img/ships_hor.png';

// Coordonnées des clics (modifiés plus tard).
var x_click = 0;
var y_click = 0;

// Jeu.

var pseudoJ1 = "Joueur 1";
var pseudoJ2 = "Joueur 2";

var colorJ1 = "red";
var colorJ2 = "blue";

// Vies des vaisseaux
var nbBoatsJ1 = 0; // Nombre de vaisseaux du joueur 1.
var nbBoatsJ2 = 0; // Nombre de vaisseaux du joueur 2.
var totalbaseJ1 = 15; //Nombre de vaisseaux restant du joueur 1.
var totalbaseJ2 = 15;//Nombre de vaisseaux restant du joueur 2.
var BurnoutLiveJ1 = 2; //Nombre de vies restantes du Burnout du joueur 1.
var BurnoutLiveJ2 = 2;//Nombre de vies restantes du Burnout du joueur 2.
var Boat3LiveJ1 = 3; //Nombre de vies restantes du vaisseau de 3 du joueur 1.
var Boat3LiveJ2 = 3; //Nombre de vies restantes du vaisseau de 3 du joueur 2.
var Boat4LiveJ1 = 4; //Nombre de vies restantes du vaisseau de 4 du joueur 1.
var Boat4LiveJ2 = 4; //Nombre de vies restantes du vaisseau de 4 du joueur 2.
var Boat5LiveJ1 = 5; //Nombre de vies restantes du vaisseau de 5 du joueur 1.
var Boat5LiveJ2 = 5; //Nombre de vies restantes du vaisseau de 5 du joueur 2.

// Etat des vaisseaux
var SinkBurnoutJ1 = false; //Vérifie si le vaisseau est coulé
var SinkBoat3J1 = false; //Vérifie si le vaisseau est coulé
var SinkBoat4J1 = false; //Vérifie si le vaisseau est coulé
var SinkBoat5J1 = false; //Vérifie si le vaisseau est coulé
var SinkBurnoutJ2 = false; //Vérifie si le vaisseau est coulé
var SinkBoat3J2 = false; //Vérifie si le vaisseau est coulé
var SinkBoat4J2 = false; //Vérifie si le vaisseau est coulé
var SinkBoat5J2 = false; //Vérifie si le vaisseau est coulé

var ableToShoot = true; // Booléen pour savoir si l'on peut tirer.

var case_clicked = 0; // Case cliquée.

var case_clicked_x = 0;
var case_clicked_y = 0;

var game_phase1 = 0; 
// 0 = J1 pose ses vaisseaux.
// 2 = J2 pose ses vaisseaux.
// 3 ou + = Place à l'attaque.

var horizPlace = true 
// Le placement des vaisseaux s'effectue à l'horizontal ou à la verticale

var game_phase2 = 2;
// 1 = J1 attaque.
// 0 = J2 attaque.

// Plateaux.//

// 0 = pas de vaisseaux.
// 1 = pas de vaisseaux.

// Plateau des vaisseaux du joueur 1.
var p1_board = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// Plateau des vaisseaux du joueur 2.
var p2_board = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// 0 = rien
// 1 = Loupé
// 2 = touché

// Plateau des attaques du joueur 1.
var p1_strike = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// Plateau des attaques du joueur 2.
var p2_strike = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

////////////////
// Fonctions. //
////////////////

var changePseudo = function () {
	pseudoJ1 = document.getElementById('pseudoJ1').value;
	pseudoJ2 = document.getElementById('pseudoJ2').value;
	resetGame();
};

var consoleEdit = function (text) {
	document.getElementById('console').innerHTML = "";
	document.getElementById('console').innerHTML += text;
};

// Effacer le tableau de jeu.
var clearBoard = function () {
	context.clearRect(0, 0, board.height, board.width);
};

// Dessin du tableau de jeu.
var drawBoard = function () {
	// Dessin du fond.
	context.drawImage(background, 0, 0, 640, 640, 0, 0, 640, 640);

	// Couleur des lignes.
	context.strokeStyle = "white";

	// Dessin des lignes.
	for (var y = cases_size; y < board.height; y += cases_size) { // Tout les 64 px (cases_size) en y.
		context.moveTo(0, y);
		context.lineTo(board.width, y);
	};

	// Dessin des colonnes.
	for (var x = cases_size; x < board.width; x += cases_size) { // Tout les 64 px (cases_size) en x.
		context.moveTo(x, 0);
		context.lineTo(x, board.height);
	};

	// Dessiner le quadrillage.
	context.stroke();
};

// Changement de la direction de placement
var placeHorizVert = function () {
	if (horizPlace == false) { // Si le placement était à la verticale
		horizPlace = true // Mettre le placement à l'horizontal
		consoleEdit("Position horizontale activée.");
	} else { // Si le placement était à l'horizontal'
		horizPlace = false // Mettre le placement à la verticale
		consoleEdit("Position verticale activée.");
	}
}
var resetBoard = function () {
	clearBoard();	// Effacer.
	drawBoard();	// Redessiner.
};

var reloadStrike = function () {	// Remettre à 0 les attaques.
	p1_strike = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	p2_strike = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];
}

var reloadBoard = function () {	// Remettre à 0 les plateaux.
	p1_board = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	p2_board = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];
};

// changer la couleur du canvas pour les joueurs
var changeColor = function() {
	var choixColor1 = document.color1.Liste.selectedIndex;
	if (choixColor1 == 0) { // Si le joueur 1 n'a pas choisi de couleur
		return;
	};
	colorJ1 = document.color1.Liste.options[choixColor1].value; // On prend la couleur choisi dans la liste et on l'applique

	var choixColor2 = document.color2.Liste.selectedIndex;
	if (choixColor2 == 0 || choixColor2 == choixColor1) { // Si le joueur 2 n'a pas choisi de couleur ou que les 2 joueurs ont choisi les mêmes couleurs.
		choixColor2 = (choixColor1 + 1) % 6 + 1;
	};
	colorJ2 = document.color2.Liste.options[choixColor2].value; // On prend la couleur choisi dans la liste et on l'applique
	resetGame();
};

// Réinitialisation du jeu.
var resetGame = function () {
	resetBoard(); // Nettoyer le canvas.
	
	// Restart le jeu.
	// On redéfinit les variables au restart.
	reloadBoard();
	reloadStrike();
	
	// Vies des vaisseaux
	nbBoatsJ1 = 0; // Nombre de vaisseaux du joueur 1.
	nbBoatsJ2 = 0; // Nombre de vaisseaux du joueur 2.
	totalbaseJ1 = 15; //Nombre de vaisseaux restant du joueur 1.
	totalbaseJ2 = 15;//Nombre de vaisseaux restant du joueur 2.
	BurnoutLiveJ1 = 2; //Nombre de vies restantes du Burnout du joueur 1.
	BurnoutLiveJ2 = 2;//Nombre de vies restantes du Burnout du joueur 2.
	Boat3LiveJ1 = 3; //Nombre de vies restantes du vaisseau de 3 du joueur 1.
	Boat3LiveJ2 = 3; //Nombre de vies restantes du vaisseau de 3 du joueur 2.
	Boat4LiveJ1 = 4; //Nombre de vies restantes du vaisseau de 4 du joueur 1.
	Boat4LiveJ2 = 4; //Nombre de vies restantes du vaisseau de 4 du joueur 2.
	Boat5LiveJ1 = 5; //Nombre de vies restantes du vaisseau de 5 du joueur 1.
	Boat5LiveJ2 = 5; //Nombre de vies restantes du vaisseau de 5 du joueur 2.	
	// Etat des vaisseaux
	SinkBurnoutJ1 = false; //Vérifie si le vaisseau est coulé
	SinkBoat3J1 = false; //Vérifie si le vaisseau est coulé
	SinkBoat4J1 = false; //Vérifie si le vaisseau est coulé
	SinkBoat5J1 = false; //Vérifie si le vaisseau est coulé
	SinkBurnoutJ2 = false; //Vérifie si le vaisseau est coulé
	SinkBoat3J2 = false; //Vérifie si le vaisseau est coulé
	SinkBoat4J2 = false; //Vérifie si le vaisseau est coulé
	SinkBoat5J2 = false; //Vérifie si le vaisseau est coulé

	ableToShoot = true; // Booléen pour savoir si l'on peut tirer.	
	case_clicked = 0; // Case cliquée.	
	case_clicked_x = 0;
	case_clicked_y = 0;	
	game_phase1 = 0; 
	// 0 = J1 pose ses vaisseaux.
	// 2 = J2 pose ses vaisseaux.
	// 3 ou + = Place à l'attaque.	
	horizPlace = true 
	// Le placement des vaisseaux s'effectue à l'horizontal ou à la verticale	
	game_phase2 = 2;
	// 1 = J1 attaque.
	// 0 = J2 attaque.


	board.style.borderColor = colorJ1;

	// J1 commence à poser ses vaisseaux.
	consoleEdit(pseudoJ1 + " place son vaisseau de 5 !");
};

// En cas de fin du jeu.
var endGame = function () {
	if (totalbaseJ1 == 0 && game_phase1 > 4) { // Si tous les vaisseaux du Joueur 1 sont coulés
		game_phase2 = 2
		alert(pseudoJ2 + " a gagné ! Cliquez sur le bouton pour recommencer.");
		resetGame();
		return;
	} else if (totalbaseJ2 == 0 && game_phase1 > 4) {  // Si tous les vaisseaux du Joueur 2 sont coulés
		game_phase2 = 2
		alert(pseudoJ1 + " a gagné ! Cliquez sur le bouton pour recommencer.");
		resetGame();
		return;
	} else {
		return;
	};
};

var touche = function (x, y) {
	context.drawImage(feu, 0, 0, 64, 64, x, y, cases_size, cases_size);
};

var loupe = function (x, y) {
	context.drawImage(rond, 0, 0, 64, 64, x, y, cases_size, cases_size);
};

var disable = function (x, y) {
	context.drawImage(croix, 0, 0, 64, 64, x, y, cases_size, cases_size);
};

var drawShipsVert = function (num, taille, x, y) {
	context.drawImage(shipsVert, num * cases_size, 0, cases_size, cases_size * taille, x, y, cases_size, cases_size * taille);
};

var drawShipsHor = function (num, taille, x, y) {
	context.drawImage(shipsHor, 0, num * cases_size, cases_size * taille, cases_size, x, y, cases_size * taille, cases_size);
};

// Lors d'un clic.
var mouseClick = function (event) {
	x_click = event.pageX - board.offsetLeft; // x = x sur la page - x du canvas.
	y_click = event.pageY - board.offsetTop; // y = y sur la page - y du canvas.
	case_clicked = 10 * (Math.floor(y_click / cases_size)) + Math.floor((x_click / cases_size)); // Repère de la case cliquée à l'aide des coordonnées.
	case_clicked_x = (case_clicked % 10) * cases_size;
	case_clicked_y = (Math.floor(case_clicked / 10)) * cases_size;
	
	// Si le joueur 1 place un vaisseau.
	if (game_phase1 == 0) {
		if (nbBoatsJ1 == 0) { // S'il place son 1er vaisseau
			if (p1_board[case_clicked] == 0 && horizPlace == false) { // Si le placement est à la verticale
				if (case_clicked < 60){
					consoleEdit(pseudoJ1 + " place son vaisseau de 4 !");
					drawShipsVert(0, 5, case_clicked_x, case_clicked_y);
					p1_board[case_clicked] = 5;
					p1_board[case_clicked + 10] = 5;
					p1_board[case_clicked + 20] = 5;
					p1_board[case_clicked + 30] = 5;
					p1_board[case_clicked + 40] = 5;
					nbBoatsJ1 += 1;
					if (case_clicked % 10 != 9){
						p1_board[case_clicked + 1] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, case_clicked_y);
						p1_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
						p1_board[case_clicked + 21] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size);
						p1_board[case_clicked + 31] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size);
						p1_board[case_clicked + 41] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size);
					}
					if (case_clicked % 10 != 0){
						p1_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y);
						p1_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
						p1_board[case_clicked + 19] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size);
						p1_board[case_clicked + 29] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size);
						p1_board[case_clicked + 39] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size);
					}
					if (case_clicked < 50){
						p1_board[case_clicked + 50] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 5 ) * cases_size);
					}
					if (case_clicked > 9){
						p1_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
					if ((case_clicked < 50) && (case_clicked % 10 != 9)){
						p1_board[case_clicked + 51] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 5 ) * cases_size);
					}
					if ((case_clicked < 50) && (case_clicked % 10 != 0)){
						p1_board[case_clicked + 49] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 5 ) * cases_size);
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 9)){
						p1_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p1_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
					// On colorie la case et les 4 suivantes dans le sens choisi, puis on passe au suivant
			else if (p1_board[case_clicked] == 0 && horizPlace == true) { // Si le placement est à l'horizontale
		 		if ((case_clicked % 10) < 6){
		 			consoleEdit(pseudoJ1 + " place son vaisseau de 4 !");
					drawShipsHor(0, 5, case_clicked_x, case_clicked_y);
					p1_board[case_clicked] = 5;
					p1_board[case_clicked + 1] = 5;
					p1_board[case_clicked + 2] = 5;
					p1_board[case_clicked + 3] = 5;
					p1_board[case_clicked + 4] = 5;
					nbBoatsJ1 += 1;
					if ((case_clicked % 10) < 5){
						p1_board[case_clicked + 5] = 6;
						disable(((case_clicked % 10) + 5) * cases_size, case_clicked_y);
					}
					if ((case_clicked % 10) != 0){
						p1_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y);
					}
					if (case_clicked < 90){
						p1_board[case_clicked + 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
						p1_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
						p1_board[case_clicked + 12] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
						p1_board[case_clicked + 13] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
						p1_board[case_clicked + 14] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
					}
					if (case_clicked > 9){
						p1_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
						p1_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
						p1_board[case_clicked - 8] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
						p1_board[case_clicked - 7] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
						p1_board[case_clicked - 6] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
					if ((case_clicked < 90) && ((case_clicked % 10) < 5)){
						p1_board[case_clicked + 15] = 6;
						disable(((case_clicked % 10) + 5) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
					}
					if ((case_clicked < 90) && ((case_clicked % 10) != 0)){
						p1_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
					}
					if ((case_clicked > 9) && ((case_clicked % 10) < 5)){
						p1_board[case_clicked - 5] = 6;
						disable(((case_clicked % 10) + 5) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p1_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
		}
					// On colorie la case et les 4 suivantes dans le sens choisi, puis on passe au suivant
		else if (nbBoatsJ1 == 1) { // S'il place son 2e vaisseau
			if (p1_board[case_clicked] == 0 && horizPlace == false) { // Si le placement est à la verticale
				if ((case_clicked < 70) && (p1_board[case_clicked + 10] == 0) && (p1_board[case_clicked + 20] == 0) && (p1_board[case_clicked + 30] == 0)){
					consoleEdit(pseudoJ1 + " place son vaisseau de 3 !");
					drawShipsVert(1, 4, case_clicked_x, case_clicked_y);
					p1_board[case_clicked] = 4;
					p1_board[case_clicked + 10] = 4;
					p1_board[case_clicked + 20] = 4;
					p1_board[case_clicked + 30] = 4;
					nbBoatsJ1 += 1;
					if (case_clicked % 10 != 9){
						p1_board[case_clicked + 1] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, case_clicked_y);
						p1_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
						p1_board[case_clicked + 21] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size);
						p1_board[case_clicked + 31] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size);
					}
					if (case_clicked % 10 != 0){
						p1_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y);
						p1_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size);
						p1_board[case_clicked + 19] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size);
						p1_board[case_clicked + 29] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size);
					}
					if (case_clicked < 60){
						p1_board[case_clicked + 40] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size);
					}
					if (case_clicked > 9){
						p1_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
					if ((case_clicked < 60) && (case_clicked % 10 != 9)){
						p1_board[case_clicked + 41] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size);
					}
					if ((case_clicked < 60) && (case_clicked % 10 != 0)){
						p1_board[case_clicked + 39] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size);
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 9)){
						p1_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p1_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size);
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
					// On colorie la case et les 3 suivantes dans le sens choisi, puis on passe au suivant
			else if (p1_board[case_clicked] == 0 && horizPlace == true) { // Si le placement est à l'horizontale
			 	if (((case_clicked % 10) < 7) && (p1_board[case_clicked + 1] == 0) && (p1_board[case_clicked + 2] == 0) && (p1_board[case_clicked + 3] == 0)){
			 		consoleEdit(pseudoJ1 + " place son vaisseau de 3 !");
			 		drawShipsHor(1, 4, case_clicked_x, case_clicked_y);
					p1_board[case_clicked] = 4;
					p1_board[case_clicked + 1] = 4;
					p1_board[case_clicked + 2] = 4;
					p1_board[case_clicked + 3] = 4;
					nbBoatsJ1 += 1;
					if ((case_clicked % 10) < 6){
						p1_board[case_clicked + 4] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, case_clicked_y); // Remplir la case.
					}
					if ((case_clicked % 10) != 0){
						p1_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked < 90){
						p1_board[case_clicked + 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked + 12] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked + 13] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p1_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked - 8] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked - 7] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && ((case_clicked % 10) < 6)){
						p1_board[case_clicked + 14] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && ((case_clicked % 10) != 0)){
						p1_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && ((case_clicked % 10) < 6)){
						p1_board[case_clicked - 6] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p1_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
		}
					// On colorie la case et les 3 suivantes dans le sens choisi, puis on passe au suivant
		else if (nbBoatsJ1 == 2) { // S'il place son 3e vaisseau
			if (p1_board[case_clicked] == 0 && horizPlace == false) { // Si le placement est à la verticale
				if ((case_clicked < 80) && (p1_board[case_clicked + 10] == 0) && (p1_board[case_clicked + 20] == 0)){
					consoleEdit(pseudoJ1 + " place son 'Burnout' !");
					drawShipsVert(2, 3, case_clicked_x, case_clicked_y);
					p1_board[case_clicked] = 3;
					p1_board[case_clicked + 10] = 3;
					p1_board[case_clicked + 20] = 3;
					nbBoatsJ1 += 1;
					if (case_clicked % 10 != 9){
						p1_board[case_clicked + 1] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, case_clicked_y); // Remplir la case.
						p1_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked + 21] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
						}
					if (case_clicked % 10 != 0){
						p1_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
						p1_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked + 19] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if (case_clicked < 70){
						p1_board[case_clicked + 30] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p1_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 70) && (case_clicked % 10 != 9)){
						p1_board[case_clicked + 31] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 70) && (case_clicked % 10 != 0)){
						p1_board[case_clicked + 29] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 9)){
						p1_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p1_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
					// On colorie la case et les 2 suivantes dans le sens choisi, puis on passe au suivant
			else if (p1_board[case_clicked] == 0 && horizPlace == true) { // Si le placement est à l'horizontale
			 	if (((case_clicked % 10) < 8) && (p1_board[case_clicked + 1] == 0) && (p1_board[case_clicked + 2] == 0)){
					consoleEdit(pseudoJ1 + " place son 'Burnout' !");
					drawShipsHor(2, 3, case_clicked_x, case_clicked_y);
					p1_board[case_clicked] = 3;
					p1_board[case_clicked + 1] = 3;
					p1_board[case_clicked + 2] = 3;
					nbBoatsJ1 += 1;
					if (case_clicked % 10 < 7){
						p1_board[case_clicked + 3] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p1_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked < 90){
						p1_board[case_clicked + 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked + 12] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p1_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked - 8] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && (case_clicked % 10 < 7)){
						p1_board[case_clicked + 13] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && (case_clicked % 10 != 0)){
						p1_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 < 7)){
						p1_board[case_clicked - 7] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p1_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
		}
					// On colorie la case et les 2 suivantes dans le sens choisi, puis on passe au suivant
		else if (nbBoatsJ1 == 3) { // S'il place son 4e vaisseau
			if (p1_board[case_clicked] == 0 && horizPlace == false) { // Si le placement est à la verticale
				if ((case_clicked < 90) && (p1_board[case_clicked + 10] == 0)){
					consoleEdit(pseudoJ1 + " place son 'Hunter' !");
					drawShipsVert(3, 2, case_clicked_x, case_clicked_y);
					p1_board[case_clicked] = 2;
					p1_board[case_clicked + 10] = 2;
					nbBoatsJ1 += 1;
					if (case_clicked % 10 != 9){
						p1_board[case_clicked + 1] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, case_clicked_y); // Remplir la case.
						p1_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p1_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
						p1_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked < 80){
						p1_board[case_clicked + 20] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p1_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 80) && (case_clicked % 10 != 9)){
						p1_board[case_clicked + 21] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 80) && (case_clicked % 10 != 0)){
						p1_board[case_clicked + 19] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 9)){
						p1_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p1_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
					// On colorie la case et la suivante dans le sens choisi, puis on passe au suivant
			else if (p1_board[case_clicked] == 0 && horizPlace == true) { // Si le placement est à l'horizontale
			 	if (((case_clicked % 10) < 9) && (p1_board[case_clicked + 1] == 0)){
					consoleEdit(pseudoJ1 + " place son 'Hunter' !");
					drawShipsHor(3, 2, case_clicked_x, case_clicked_y);
					p1_board[case_clicked] = 2;
					p1_board[case_clicked + 1] = 2;
					nbBoatsJ1 += 1;
					if (case_clicked % 10 < 8){
						p1_board[case_clicked + 2] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p1_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked < 90){
						p1_board[case_clicked + 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p1_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p1_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && (case_clicked % 10 < 8)){
						p1_board[case_clicked + 12] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && (case_clicked % 10 != 0)){
						p1_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 < 8)){
						p1_board[case_clicked - 8] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p1_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
		}
					// On colorie la case et la suivante dans le sens choisi, puis on passe au suivant
		else if (nbBoatsJ1 == 4) { // S'il place son 5e vaisseau
			consoleEdit(pseudoJ1 + " a placé tout ses vaisseaux. Cliquez sur 'Valider' pour continuer")
			if (p1_board[case_clicked] == 0) {
				if (horizPlace) {
					drawShipsHor(4, 1, case_clicked_x, case_clicked_y);
				} else {
					drawShipsVert(4, 1, case_clicked_x, case_clicked_y);
				};
				p1_board[case_clicked] = 1;
				nbBoatsJ1 += 1;
			} else {
				consoleEdit("Votre vaisseau dépasse !");
			}
				// On colorie la case choisie
		} else if (nbBoatsJ1 == 5) { // Si les 5 vaisseaux sont déjà placés
			consoleEdit("Vous avez placé tout vos vaisseaux !");
		} else { // Si un vaisseau est déjà ici
			consoleEdit("Vous avez déjà un vaisseau ici !");
		};
	};

	// Si le joueur 2 place un vaisseau.
	if (game_phase1 == 2) {
		if (nbBoatsJ2 == 0) { // S'il place son 1er vaisseau
			if (p2_board[case_clicked] == 0 && horizPlace == false) { // Si le placement est à la verticale
				if (case_clicked < 60){
					consoleEdit(pseudoJ2 + " place son vaisseau de 4");
					drawShipsVert(0, 5, case_clicked_x, case_clicked_y);
					p2_board[case_clicked] = 5;
					p2_board[case_clicked + 10] = 5;
					p2_board[case_clicked + 20] = 5;
					p2_board[case_clicked + 30] = 5;
					p2_board[case_clicked + 40] = 5;
					nbBoatsJ2 += 1;
					if (case_clicked % 10 != 9){
						p2_board[case_clicked + 1] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, case_clicked_y); // Remplir la case.
						p2_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 21] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 31] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 41] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p2_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
						p2_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 19] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 29] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 39] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size); // Remplir la case.
					}
					if (case_clicked < 50){
						p2_board[case_clicked + 50] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 5 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p2_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 50) && (case_clicked % 10 != 9)){
						p2_board[case_clicked + 51] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 5 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 50) && (case_clicked % 10 != 0)){
						p2_board[case_clicked + 49] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 5 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 9)){
						p2_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p2_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
					// On colorie la case et les 4 suivantes dans le sens choisi, puis on passe au suivant
			else if (p2_board[case_clicked] == 0 && horizPlace == true) { // Si le placement est à l'horizontale
		 		if ((case_clicked % 10) < 6){
		 			consoleEdit(pseudoJ2 + " place son vaisseau de 4");
		 			drawShipsHor(0, 5, case_clicked_x, case_clicked_y);
					p2_board[case_clicked] = 5;
					p2_board[case_clicked + 1] = 5;
					p2_board[case_clicked + 2] = 5;
					p2_board[case_clicked + 3] = 5;
					p2_board[case_clicked + 4] = 5;
					nbBoatsJ2 += 1;
					if ((case_clicked % 10) < 5){
						p2_board[case_clicked + 5] = 6;
						disable(((case_clicked % 10) + 5) * cases_size, case_clicked_y); // Remplir la case.
					}
					if ((case_clicked % 10) != 0){
						p2_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked < 90){
						p2_board[case_clicked + 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 12] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 13] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 14] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p2_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 8] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 7] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 6] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && ((case_clicked % 10) < 5)){
						p2_board[case_clicked + 15] = 6;
						disable(((case_clicked % 10) + 5) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && ((case_clicked % 10) != 0)){
						p2_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && ((case_clicked % 10) < 5)){
						p2_board[case_clicked - 5] = 6;
						disable(((case_clicked % 10) + 5) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p2_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
		}
					// On colorie la case et les 4 suivantes dans le sens choisi, puis on passe au suivant
		else if (nbBoatsJ2 == 1) { // S'il place son 2e vaisseau
			if (p2_board[case_clicked] == 0 && horizPlace == false) { // Si le placement est à la verticale
				if ((case_clicked < 70) && (p2_board[case_clicked + 10] == 0) && (p2_board[case_clicked + 20] == 0) && (p2_board[case_clicked + 30] == 0)){
					consoleEdit(pseudoJ2 + " place son vaisseau de 3");
					drawShipsVert(1, 4, case_clicked_x, case_clicked_y);
					p2_board[case_clicked] = 4;
					p2_board[case_clicked + 10] = 4;
					p2_board[case_clicked + 20] = 4;
					p2_board[case_clicked + 30] = 4;
					nbBoatsJ2 += 1;
					if (case_clicked % 10 != 9){
						p2_board[case_clicked + 1] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, case_clicked_y); // Remplir la case.
						p2_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 21] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 31] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p2_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
						p2_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 19] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 29] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
					}
					if (case_clicked < 60){
						p2_board[case_clicked + 40] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p2_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 60) && (case_clicked % 10 != 9)){
						p2_board[case_clicked + 41] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 60) && (case_clicked % 10 != 0)){
						p2_board[case_clicked + 39] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 4 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 9)){
						p2_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p2_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
					// On colorie la case et les 3 suivantes dans le sens choisi, puis on passe au suivant
			else if (p2_board[case_clicked] == 0 && horizPlace == true) { // Si le placement est à l'horizontale
			 	if (((case_clicked % 10) < 7) && (p2_board[case_clicked + 1] == 0) && (p2_board[case_clicked + 2] == 0) && (p2_board[case_clicked + 3] == 0)){
					consoleEdit(pseudoJ2 + " place son vaisseau de 3");
					drawShipsHor(1, 4, case_clicked_x, case_clicked_y);
					p2_board[case_clicked] = 4;
					p2_board[case_clicked + 1] = 4;
					p2_board[case_clicked + 2] = 4;
					p2_board[case_clicked + 3] = 4;
					nbBoatsJ2 += 1;
					if ((case_clicked % 10) < 6){
						p2_board[case_clicked + 4] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, case_clicked_y); // Remplir la case.
					}
					if ((case_clicked % 10) != 0){
						p2_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked < 90){
						p2_board[case_clicked + 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 12] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 13] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p2_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 8] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 7] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && ((case_clicked % 10) < 6)){
						p2_board[case_clicked + 14] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && ((case_clicked % 10) != 0)){
						p2_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && ((case_clicked % 10) < 6)){
						p2_board[case_clicked - 6] = 6;
						disable(((case_clicked % 10) + 4) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p2_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
		}
					// On colorie la case et les 3 suivantes dans le sens choisi, puis on passe au suivant
		else if (nbBoatsJ2 == 2) { // S'il place son 3e vaisseau
			if (p2_board[case_clicked] == 0 && horizPlace == false) { // Si le placement est à la verticale
				if ((case_clicked < 80) && (p2_board[case_clicked + 10] == 0) && (p2_board[case_clicked + 20] == 0)){
					consoleEdit(pseudoJ2 + " place son 'Burnout'");
					drawShipsVert(2, 3, case_clicked_x, case_clicked_y);
					p2_board[case_clicked] = 3;
					p2_board[case_clicked + 10] = 3;
					p2_board[case_clicked + 20] = 3;
					nbBoatsJ2 += 1;
					if (case_clicked % 10 != 9){
						p2_board[case_clicked + 1] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, case_clicked_y); // Remplir la case.
						p2_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 21] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p2_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
						p2_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 19] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if (case_clicked < 70){
						p2_board[case_clicked + 30] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p2_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 70) && (case_clicked % 10 != 9)){
						p2_board[case_clicked + 31] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 70) && (case_clicked % 10 != 0)){
						p2_board[case_clicked + 29] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 3 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 9)){
						p2_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p2_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
					// On colorie la case et les 2 suivantes dans le sens choisi, puis on passe au suivant
			else if (p2_board[case_clicked] == 0 && horizPlace == true) { // Si le placement est à l'horizontale
			 	if (((case_clicked % 10) < 8) && (p2_board[case_clicked + 1] == 0) && (p2_board[case_clicked + 2] == 0)){
					consoleEdit(pseudoJ2 + " place son 'Burnout'");
					drawShipsHor(2, 3, case_clicked_x, case_clicked_y);
					p2_board[case_clicked] = 3;
					p2_board[case_clicked + 1] = 3;
					p2_board[case_clicked + 2] = 3;
					nbBoatsJ2 += 1;
					if (case_clicked % 10 < 7){
						p2_board[case_clicked + 3] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p2_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked < 90){
						p2_board[case_clicked + 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 12] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p2_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 8] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && (case_clicked % 10 < 7)){
						p2_board[case_clicked + 13] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && (case_clicked % 10 != 0)){
						p2_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 < 7)){
						p2_board[case_clicked - 7] = 6;
						disable(((case_clicked % 10) + 3) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p2_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
		}
					// On colorie la case et les 2 suivantes dans le sens choisi, puis on passe au suivant
		else if (nbBoatsJ2 == 3) { // S'il place son 4e vaisseau
			if (p2_board[case_clicked] == 0 && horizPlace == false) { // Si le placement est à la verticale
				if ((case_clicked < 90) && (p2_board[case_clicked + 10] == 0)){
					consoleEdit(pseudoJ2 + " place son 'Hunter'");
					drawShipsVert(3, 2, case_clicked_x, case_clicked_y);
					p2_board[case_clicked] = 2;
					p2_board[case_clicked + 10] = 2;
					nbBoatsJ2 += 1;
					if (case_clicked % 10 != 9){
						p2_board[case_clicked + 1] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, case_clicked_y); // Remplir la case.
						p2_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p2_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
						p2_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked < 80){
						p2_board[case_clicked + 20] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p2_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 80) && (case_clicked % 10 != 9)){
						p2_board[case_clicked + 21] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 80) && (case_clicked % 10 != 0)){
						p2_board[case_clicked + 19] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 2 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 9)){
						p2_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p2_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
					// On colorie la case et la suivante dans le sens choisi, puis on passe au suivant
			else if (p2_board[case_clicked] == 0 && horizPlace == true) { // Si le placement est à l'horizontale
			 	if (((case_clicked % 10) < 9) && (p2_board[case_clicked + 1] == 0)){
			 		consoleEdit(pseudoJ2 + " place son 'Hunter'");
			 		drawShipsHor(3, 2, case_clicked_x, case_clicked_y);
					p2_board[case_clicked] = 2;
					p2_board[case_clicked + 1] = 2;
					nbBoatsJ2 += 1;
					if (case_clicked % 10 < 8){
						p2_board[case_clicked + 2] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked % 10 != 0){
						p2_board[case_clicked - 1] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, case_clicked_y); // Remplir la case.
					}
					if (case_clicked < 90){
						p2_board[case_clicked + 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked + 11] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if (case_clicked > 9){
						p2_board[case_clicked - 10] = 6;
						disable(case_clicked_x, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
						p2_board[case_clicked - 9] = 6;
						disable(((case_clicked % 10) + 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && (case_clicked % 10 < 8)){
						p2_board[case_clicked + 12] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked < 90) && (case_clicked % 10 != 0)){
						p2_board[case_clicked + 9] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) + 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 < 8)){
						p2_board[case_clicked - 8] = 6;
						disable(((case_clicked % 10) + 2) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
					if ((case_clicked > 9) && (case_clicked % 10 != 0)){
						p2_board[case_clicked - 11] = 6;
						disable(((case_clicked % 10) - 1) * cases_size, ((Math.floor(case_clicked / 10)) - 1 ) * cases_size); // Remplir la case.
					}
				} else {
					consoleEdit("Votre vaisseau dépasse !");
				}
			}
		}
					// On colorie la case et la suivante dans le sens choisi, puis on passe au suivant
		else if (nbBoatsJ2 == 4) { // S'il place son 5e vaisseau
			consoleEdit(pseudoJ2 + " a placé tout ses vaisseaux. Cliquez sur 'Valider' pour continuer")
			if (p2_board[case_clicked] == 0) {
				if (horizPlace) {
					drawShipsHor(4, 1, case_clicked_x, case_clicked_y);
				} else {
					drawShipsVert(4, 1, case_clicked_x, case_clicked_y);
				};
				p2_board[case_clicked] = 1;
				nbBoatsJ2 += 1;
			} else {
				consoleEdit("Votre vaisseau dépasse !");
			}
				// On colorie la case choisie
		} else if (nbBoatsJ2 == 5) { // Si les 5 vaisseaux sont déjà placés
			consoleEdit("Vous avez placé tout vos vaisseaux !");
		} else { // Si un vaisseau est déjà ici
			consoleEdit("Vous avez déjà un vaisseau ici !");
		};


	};
	// Si le joueur 1 attaque.
	if (game_phase2 == 1) {
		if (!ableToShoot) { // S'il ne peut pas tirer
			consoleEdit("Vous avez déjà tiré !");
		} else if (p1_strike[case_clicked] == 0) { // Si cette case n'a pas déjà été attaquée
			if (p2_board[case_clicked] == 1) { // Si on coule le Hunter adverse
				consoleEdit("Hunter adverse coulé !");
				context.fillStyle = 'grey';
				context.fillRect(case_clicked_x, case_clicked_y, cases_size, cases_size);
				p2_board[case_clicked] = -1;
				p1_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ2 -= 1;
			} else if (p2_board[case_clicked] == 2) { // Si on touche le Burnout adverse
				consoleEdit("Burnout adverse touché !");
				touche(case_clicked_x, case_clicked_y);
				p2_board[case_clicked] = -2;
				p1_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ2 -= 1;
				BurnoutLiveJ2 -= 1;
				if (BurnoutLiveJ2 == 0) { // Si le Burnout adverse est coulé
					consoleEdit("Burnout adverse coulé !");
					SinkBurnoutJ2 = true;
				};
			} else if (p2_board[case_clicked] == 3) { // Si on touche le vaisseau de 3 adverse
				consoleEdit("Vaisseau de 3 adverse touché !");
				touche(case_clicked_x, case_clicked_y);
				p2_board[case_clicked] = -3;
				p1_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ2 -= 1;
				Boat3LiveJ2 -= 1;
				if (Boat3LiveJ2 == 0) { // Si le vaisseau de 3 adverse est coulé
					consoleEdit("Vaisseau de 3 adverse coulé !");
					SinkBoat3J2 = true;
				};
			} else if (p2_board[case_clicked] == 4) { // Si on touche le vaisseau de 4 adverse
				consoleEdit("Vaisseau de 4 adverse touché !");
				touche(case_clicked_x, case_clicked_y);
				p2_board[case_clicked] = -4;
				p1_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ2 -= 1;
				Boat4LiveJ2 -= 1;
				if (Boat4LiveJ2 == 0) { // Si le vaisseau de 4 adverse est coulé
					consoleEdit("Vaisseau de 4 adverse coulé !");
					SinkBoat4J2 = true;
				};
			} else if (p2_board[case_clicked] == 5) { // Si on touche le vaisseau de 5 adverse
				consoleEdit("Vaisseau de 5 adverse touché !");
				touche(case_clicked_x, case_clicked_y);
				p2_board[case_clicked] = -5;
				p1_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ2 -= 1;
				Boat5LiveJ2 -= 1;
				if (Boat5LiveJ2 == 0) { // Si le vaisseau de 5 adverse est coulé
					consoleEdit("Vaisseau de 5 adverse coulé !");
					SinkBoat5J2 = true;
				};
			} else if (p2_board[case_clicked] == 0 || p2_board[case_clicked] == 6) { // S'il n'y a rien
				p1_strike[case_clicked] = 1;
				consoleEdit("Loupé !");
				loupe(case_clicked_x, case_clicked_y);
				ableToShoot = false;
			}} else { // Si la case a déjà été attaquée
			consoleEdit("Vous avez déjà tiré ici !");
			};
	};

	// Si le joueur 2 attaque.
	if (game_phase2 == 0) {
		if (!ableToShoot) { // S'il ne peut pas tirer
			consoleEdit("Vous avez déjà tiré !");
		} else if (p2_strike[case_clicked] == 0) { // Si cette case n'a pas déjà été attaquée
			if (p1_board[case_clicked] == 1) { // Si on coule le Hunter adverse
				consoleEdit("Hunter adverse coulé !");
				context.fillStyle = 'grey';
				context.fillRect(case_clicked_x, case_clicked_y, cases_size, cases_size);
				p1_board[case_clicked] = -1;
				p2_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ1 -= 1;
			} else if (p1_board[case_clicked] == 2) { // Si on touche le Burnout adverse
				consoleEdit("Burnout adverse touché !");
				touche(case_clicked_x, case_clicked_y);
				p1_board[case_clicked] = -2;
				p2_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ1 -= 1;
				BurnoutLiveJ1 -= 1;
				if (BurnoutLiveJ1 == 0) { // Si le Burnout adverse est coulé
					consoleEdit("Burnout adverse coulé !");
					SinkBurnoutJ1 = true;
				};
			} else if (p1_board[case_clicked] == 3) { // Si on touche le vaisseau de 3 adverse
				consoleEdit("Vaisseau de 3 adverse touché !");
				touche(case_clicked_x, case_clicked_y);
				p1_board[case_clicked] = -3;
				p2_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ1 -= 1;
				Boat3LiveJ1 -= 1;
				if (Boat3LiveJ1 == 0) { // Si le vaisseau de 3 adverse est coulé
					consoleEdit("Vaisseau de 3 adverse coulé !");
					SinkBoat3J1 = true;
				};
			} else if (p1_board[case_clicked] == 4) { // Si on touche le vaisseau de 4 adverse
				consoleEdit("Vaisseau de 4 adverse touché !");
				touche(case_clicked_x, case_clicked_y);
				p1_board[case_clicked] = -4;
				p2_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ1 -= 1;
				Boat4LiveJ1 -= 1;
				if (Boat4LiveJ1 == 0) { // Si le vaisseau de 4 adverse est coulé
					consoleEdit("Vaisseau de 4 adverse coulé !");
					SinkBoat4J1 = true;
				};
			} else if (p1_board[case_clicked] == 5) { // Si on touche le vaisseau de 5 adverse
				consoleEdit("Vaisseau de 5 adverse touché !");
				touche(case_clicked_x, case_clicked_y);
				p1_board[case_clicked] = -5;
				p2_strike[case_clicked] = 2;
				ableToShoot = false;
				totalbaseJ1 -= 1;
				Boat5LiveJ1 -= 1;
				if (Boat5LiveJ1 == 0) { // Si le vaisseau de 5 adverse est coulé
					consoleEdit("Vaisseau de 5 adverse coulé !");
					SinkBoat5J1 = true;
				};
			} else if (p1_board[case_clicked] == 0 || p1_board[case_clicked] == 6) { // S'il n'y a rien
				p2_strike[case_clicked] = 1;
				consoleEdit("Loupé !");
				loupe(case_clicked_x, case_clicked_y);
				ableToShoot = false;
			}} else { // Si la case a déjà été attaquée
			consoleEdit("Vous avez déjà tiré ici !");
			};
		};
};

// Changer de phase de jeu.
var changeGamePhase = function () {
	if ((game_phase1 == 0 && nbBoatsJ1 != 5) || (game_phase1 == 2 && nbBoatsJ2 != 5)) { // Si 5 vaisseaux n'ont pas été placés par un Joueur mais qu'il a voulu valider
		consoleEdit("Erreur ! Vous devez placer 5 vaisseaux.");
		return;
	} else {
		resetBoard();
		game_phase1 += 1;
	
		// Le jeu est-il fini ?
		endGame();
	
		if (game_phase1 == 1 && nbBoatsJ1 == 5) { // Quand le Joueur 1 a fini de placer ses vaisseaux
			game_phase1 = 2;
			consoleEdit(pseudoJ2 + " place son vaisseau de 5 !");
			board.style.borderColor = colorJ2;
			ableToShoot = false;
		} else {
			if (ableToShoot){ // Si'l'on a pas tiré mais que l'on valide
				consoleEdit("Vous devez jouer !");
			} else {  // Quand le Joueur 2 a fini de placer ses vaisseaux
				game_phase2 += 1;
				game_phase2 = game_phase2 %2;
				ableToShoot = true;
				if (game_phase2 == 1) { // Si le joueur 1 doit attaquer
					consoleEdit(pseudoJ1 + " attaque !");
					board.style.borderColor = colorJ1;
					for (i = 0; i < 100; i++) { // On crée une boucle qui examine le tableau pour replacer les indications au joueur
						if (p1_strike[i] == 1) {
							loupe((i % 10) * cases_size, (Math.floor(i / 10)) * cases_size);
						} else if (p1_strike[i] == 2) {
							if ((p2_board[i] == -1) || (p2_board[i] == -2 && SinkBurnoutJ2 == true) || (p2_board[i] == -3 && SinkBoat3J2 == true) || (p2_board[i] == -4 && SinkBoat4J2 == true) || (p2_board[i] == -5 && SinkBoat5J2 == true)) {
								context.fillStyle = 'grey';
								context.fillRect((i % 10) * cases_size, (Math.floor(i / 10)) * cases_size, cases_size, cases_size);
							} else if (p1_strike[i] == 2) {
								if ((p2_board[i] == -2 && SinkBurnoutJ2 == false) || (p2_board[i] == -3 && SinkBoat3J2 == false) || (p2_board[i] == -4 && SinkBoat4J2 == false) || (p2_board[i] == -5 && SinkBoat5J2 == false)) {
									touche((i % 10) * cases_size, (Math.floor(i / 10)) * cases_size);
								};
							};
						};
					};
				} else {  // Si le joueur 2 doit attaquer
					consoleEdit(pseudoJ2 + " attaque !");
					board.style.borderColor = colorJ2;
					for (i = 0; i < 100; i++) { // On crée une boucle qui examine le tableau pour replacer les indications au joueur
						if (p2_strike[i] == 1) {
							loupe((i % 10) * cases_size, (Math.floor(i / 10)) * cases_size);
						} else if (p2_strike[i] == 2) {
							if ((p1_board[i] == -1) || (p1_board[i] == -2 && SinkBurnoutJ1 == true) || (p1_board[i] == -3 && SinkBoat3J1 == true) || (p1_board[i] == -4 && SinkBoat4J1 == true) || (p1_board[i] == -5 && SinkBoat5J1 == true)) {
								context.fillStyle = 'grey';
								context.fillRect((i % 10) * cases_size, (Math.floor(i / 10)) * cases_size, cases_size, cases_size);
							} else if (p2_strike[i] == 2) {
								if ((p1_board[i] == -2 && SinkBurnoutJ1 == false) || (p1_board[i] == -3 && SinkBoat3J1 == false) || (p1_board[i] == -4 && SinkBoat4J1 == false) || (p1_board[i] == -5 && SinkBoat5J1 == false)) {
									touche((i % 10) * cases_size, (Math.floor(i / 10)) * cases_size);
								};
							};
						};
					};
				};
			};
		};
	};
};

///////////////////
// Constructeur. //
///////////////////



/////////////
// Objets. //
/////////////



/////////////////////////////////
// Gestionnaires d'évènements. //
/////////////////////////////////

// Clic de la souris.
board.addEventListener('mousedown', mouseClick);

// Au chargement de la page.
background.addEventListener('load', function() {
	resetGame();
});