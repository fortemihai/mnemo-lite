
let startTime;
let endTime;
let timeSpent;
let series_length;
let s;
let currentSeries;
let userResponse; // this is the variable with the user input
let mistakes;
let correctAnswers=0;
let static_flag; // 1 if the series is static,0 otherwise
function setDefaultParams()
{
	mistakes=0;
	series_length=3;
	if(document.getElementById('static_Series').checked)
	{
	static_flag=1;
	// The user has selected the Static Series option.
		s=
		[ 
			[" "," "," "," "," "," "," "," "," "," "],
			["Green"," "," "," "," "," "," "," "," "," "],
			["Green","Blue"," "," "," "," "," "," "," "," "],
			["Blue","Yellow","Red"," "," "," "," "," "," "," "],
			["Green","Green","Red","Yellow"," "," "," "," "," "],
			["Red","Red","Yellow","Blue","Yellow"," "," "," "," "],
			["Green","Blue","Blue","Green","Red","Yellow"," "," "," "," "],
			["Green","Yellow","Red","Green","Yellow","Yellow","Red"," "," "," "],
			["Red","Green","Red","Green","Blue","Yellow","Red","Green"," "," "],
			["Red","Green","Green","Yellow","Red","Blue","Red","Yellow","Blue"," "],
			["Red","Yellow","Blue","Green","Red","Green","Green","Yellow","Green","Red"]
		];
	}
	if(	document.getElementById('dynamic_Series').checked)
	{
		static_flag=0;
	}
	
}

function startAColorSeries(){
	if(correctAnswers==0)
	{
	startTime=new Date();
	console.log("Start time is:"+startTime);
	}
	if(correctAnswers==0)
	{
	startTime=new Date();
	console.log("Start time is:"+startTime);
	}
	document.getElementById('CoolResponseButtons').style.display="none";
	document.getElementById('responseButtonWrapper').style.display="none";
	var cnt=0;
	currentSeries=[" "," "," "," "];
	var intervalClearTime=series_length*2500+1000;
	var interval;
	if(static_flag==1)
	for (let i = 0; i < series_length; i++) 
	{
		let x;
		x=s[series_length][i];
		currentSeries[i]=x;
	}
	else
	{
	x=generateRandomColorSeries();
	currentSeries=x;
	}
	const timeout=setTimeout(() => {
		document.getElementById(currentSeries[cnt++]).click();
		interval=setInterval(() => {
		document.getElementById(currentSeries[cnt++]).click();
	}, 2500)
	}, 1000)
	
	setTimeout(()=>{
		document.getElementById('responseButtonWrapper').style.display="block";
		clearInterval(interval);
	}, intervalClearTime)
}

function displayResponseButtons()
{	
	document.getElementById('responseButtonWrapper').style.display="none";
	userResponse=[];
	setTimeout(()=>{
		document.getElementById('CoolResponseButtons').style.display="grid";
	}, 300)
}

function refreshButton(){
	location.reload();
}

function RedButtonPressed(){

	document.getElementById("Red").style.backgroundColor="#ff0000";
	var redSound = document.getElementById("redAudio"); 
	setTimeout(()=>{
	redSound.play();
	},300)
	setTimeout(() => {
		document.getElementById("Red").style.backgroundColor="#660000";
	}, 1500)
}

function YellowButtonPressed(){

	document.getElementById("Yellow").style.backgroundColor="#ffff00";
	var yellowSound = document.getElementById("yellowAudio");
	setTimeout(()=>{
	yellowSound.play();
	},300)	
	setTimeout(() => {
		document.getElementById("Yellow").style.backgroundColor="#666600";
	}, 1500)
}

function GreenButtonPressed(){
	document.getElementById("Green").style.backgroundColor="#00ff00";
	var greenSound = document.getElementById("greenAudio"); 
	setTimeout(()=>{
	greenSound.play();
	},300)	
	setTimeout(() => {
		document.getElementById("Green").style.backgroundColor="#006600";
	}, 1500)
}

function BlueButtonPressed(){
	document.getElementById('Blue').style.backgroundColor="#0000ff";
	var blueSound = document.getElementById("blueAudio"); 
	setTimeout(()=>{
	blueSound.play();
	},300)	
	setTimeout(() => {
		document.getElementById("Blue").style.backgroundColor="#000066";
	}, 1500)
}
function RedResponsePressed()
{
	userResponse.push("Red");
	console.log("Red");
	document.getElementById("r_red").style.backgroundColor="#ff0000";
	var sound = document.getElementById("responseAudio"); 
	sound.pause();	
	sound.currentTime = 0;
	sound.play();
	setTimeout(() => {
		document.getElementById("r_red").style.backgroundColor="#660000";
	}, 300)
	if(userResponse.length==series_length)
		checkUserAnswer();
}

function YellowResponsePressed()
{
	userResponse.push("Yellow");
	console.log("Yellow");
	document.getElementById("r_yellow").style.backgroundColor="#ffff00";
	var sound = document.getElementById("responseAudio"); 
	sound.pause();	
	sound.currentTime = 0;
	sound.play();
	setTimeout(() => {
		document.getElementById("r_yellow").style.backgroundColor="#666600";
	}, 300)
	if(userResponse.length==series_length)
		checkUserAnswer();
}

function GreenResponsePressed()
{
	userResponse.push("Green");
	console.log("Green");
	document.getElementById("r_green").style.backgroundColor="#00ff00";
	var sound = document.getElementById("responseAudio");
	sound.pause();	
	sound.currentTime = 0;
	sound.play();
	setTimeout(() => {
		document.getElementById("r_green").style.backgroundColor="#006600";
	}, 300)
	if(userResponse.length==series_length)
		checkUserAnswer();
}

function BlueResponsePressed()
{
	userResponse.push("Blue");
	console.log("Blue");
	document.getElementById('r_blue').style.backgroundColor="#0000ff";
	var sound = document.getElementById("responseAudio"); 
	sound.pause();	
	sound.currentTime = 0;
	sound.play();
	setTimeout(() => {
		document.getElementById("r_blue").style.backgroundColor="#000066";
	}, 300)
	if(userResponse.length==series_length)
		checkUserAnswer();
}

function checkUserAnswer()
{
	let ok=1;
	let remainingSeriesNumber=0;
	document.getElementById('CoolResponseButtons').style.display="none";
	for(let i=0;i<series_length;i++)
		if(userResponse[i]!=currentSeries[i])
			ok=0;
	if(ok==0)
		{
			alert("Wrong answer.");
			mistakes++;
			remainingSeriesNumber=10-series_length+1;
			document.getElementById('GameStats').innerHTML="There are "+remainingSeriesNumber+" series remaining.";
			document.getElementById('GameStats').innerHTML+="<br>";
			document.getElementById('GameStats').innerHTML+="Mistakes:"+mistakes;
		}
	else
		{
			alert("Correct answer.");
			series_length++;
			correctAnswers++;
			remainingSeriesNumber=10-series_length+1;
			document.getElementById('GameStats').innerHTML="There are "+remainingSeriesNumber+" series remaining.";
			document.getElementById('GameStats').innerHTML+="<br>";
			document.getElementById('GameStats').innerHTML+="Mistakes:"+mistakes;
			if(series_length==11)
			{
				displayEndScreen();
			}
		}
}
function displayEndScreen()
{
document.getElementById('CoolResponseButtons').style.display="none";
				document.getElementById('responseButtonWrapper').style.display="none";
				document.getElementById('CoolButtons').style.display="none";
				document.body.innerHTML=" ";
				let finaldiv=document.createElement("div");
				finaldiv.setAttribute("id","finaldiv");
				let finalcontent=document.createTextNode("You have given all the correct answers..");
				let congrats=document.createTextNode("Congratulations!");
				let br=document.createElement("br");
				let br2=document.createElement("br");
				let mistakescount=document.createTextNode("Mistakes:"+mistakes);
				finaldiv.appendChild(congrats);
				finaldiv.appendChild(br2);
				finaldiv.appendChild(finalcontent);
				finaldiv.appendChild(br);
				finaldiv.appendChild(mistakescount);
				endTime=new Date();
				console.log("End time is:"+endTime);
				timeSpent = new Date(endTime).getTime()-new Date(startTime).getTime();
				let time=document.createElement("div");
				var minutes=Math.floor(timeSpent/60000);
       				 var seconds=(timeSpent/1000)%60;
				let time_spent=document.createTextNode("Time:"+minutes+" minutes and "+seconds.toFixed(2)+" seconds.");
				time.appendChild(time_spent);
				finaldiv.appendChild(time);
				document.body.appendChild(finaldiv);			
				let finalaudio=document.createElement("audio");
				finalaudio.id = 'finalaudio';
				finalaudio.src = 'victorytrumpet.mp3';
				finalaudio.type= 'audio/mpeg';
				document.body.appendChild(finalaudio);
				finalaudio.play();
				
				
}

function LogMeIn()
{
	document.getElementById('buttonsWrapper').style.display="block";
	document.getElementById('welcomeWrapper').style.display="none";
	setDefaultParams();
}

function iquit()
{	
	
	document.getElementById('CoolResponseButtons').style.display="none";
	document.getElementById('responseButtonWrapper').style.display="none";
	document.getElementById('CoolButtons').style.display="none";
	document.body.innerHTML=" ";
	let finaldiv=document.createElement("div");
	finaldiv.setAttribute("id","finaldiv");
	let finalcontent=document.createTextNode("You have given "+correctAnswers+" correct answer(s).");
	let br=document.createElement("br");
	let mistakescount=document.createTextNode("Mistakes:"+mistakes);
	finaldiv.appendChild(finalcontent);
	finaldiv.appendChild(br);
	finaldiv.appendChild(mistakescount);
	document.body.appendChild(finaldiv);
	endTime=new Date().toLocaleTimeString();
	timeSpent=endTime-startTime;
	
}



function generateRandomColorSeries()
{
	let rand_series=[];
	for(let ii=0;ii<series_length;ii++)
	{
		rand_series[ii]=random_ColorPicker();
		console.log(ii+ "and value "+rand_series[ii]);
	}
	return rand_series;
}

function random_ColorPicker()
{
	let rcolor=Math.floor(Math.random() * 4);
	if(rcolor==0)
		return "Red";
	if(rcolor==1)
		return "Blue";
	if(rcolor==2)
		return "Green";
	if(rcolor==3)
		return "Yellow";
}

