function f1() {

	document.getElementById("textarea1").style.fontstyle = "Montserrat";
}
function f2() {

	document.getElementById("textarea1").style.fontstyle = "ubuntu";
}
function f3() {

	document.getElementById("textarea1").style.fontstyle = "Bold";
}



function f4() {

	document.getElementById("textarea1").style.fontstyle = "Italics";
}
function f5() {

	document.getElementById("textarea1").style.fontsize = 2rem;
}
function f6() {

	document.getElementById("textarea1").style.fontsize = 3rem;
}
function f7() {

	document.getElementById("textarea1").style.fontsize = 4rem;
}
function f8() {

	document.getElementById("textarea1").style.fontcolor = "red";
}
function f9() {

	document.getElementById("textarea1").style.fontcolor = "blue";
}
function f10() {

	document.getElementById("textarea1").style.fontcolor = "green";
}


function f11() {
	//function to make the text back to normal by removing all the methods applied
	//using DOM method
	document.getElementById("textarea1").style.fontstyle = "sanseriff";
	document.getElementById("textarea1").style.fontsize = "1rem";
	document.getElementById("textarea1").style.fontcolor = "black";

	document.getElementById("textarea1").value = " ";
}
