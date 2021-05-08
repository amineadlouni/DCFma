
 function valider(){
	//var nom=document.getElementById("nom").value;
	var prenom=document.getElementById("prenom").value;
	//localStorage.setItem("nom",nom);
	localStorage.setItem("prenom",prenom);
	
	
	var email=document.getElementById("email").value;
	var tel=document.getElementById("tel").value;
	localStorage.setItem("email",email);
	localStorage.setItem("tel",tel);
	
	
	var pwd=document.getElementById("pwd").value;
	var pwdcopy=document.getElementById("pwdcopy").value;
	localStorage.setItem("pwd",pwd);
	localStorage.setItem("pwdcopy",pwdcopy);
	
	
	

}