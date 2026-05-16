window.addEventListener(
"scroll",
()=>{

const nav=
document.getElementById(
"navbar"
);

if(window.scrollY>30){

nav.classList.add(
"scrolled"
);

}else{

nav.classList.remove(
"scrolled"
);

}

}
);

function handleContactSubmit(e){
	e.preventDefault();
	const name = document.getElementById('contactName').value.trim();
	const email = document.getElementById('contactEmail').value.trim();
	const phone = document.getElementById('contactPhone').value.trim();
	const message = document.getElementById('contactMessage').value.trim();

	const subject = encodeURIComponent('Website enquiry from ' + (name || 'Website Visitor'));
	const bodyLines = [
		'Name: ' + name,
		'Email: ' + email,
		'Phone: ' + phone,
		'',
		'Message:',
		message
	];
	const body = encodeURIComponent(bodyLines.join('\n'));

	// Open user's default mail client with prefilled message
	const mailto = `mailto:info@bestowsecurity.com?subject=${subject}&body=${body}`;

	// Try several methods to open mail client; if blocked, provide a copy fallback
	try{
		// Try to open in same window
		window.location.href = mailto;
	}catch(err){
		// If that fails, try window.open
		const w = window.open(mailto);
		if(!w){
			// last resort: create and click an anchor
			const a = document.createElement('a');
			a.href = mailto;
			a.style.display = 'none';
			document.body.appendChild(a);
			a.click();
			a.remove();
		}
	}

	// If the user's mail client isn't configured, also attempt to copy the message to clipboard and show an alert
	// (navigator.clipboard may be unavailable in some browsers)
	const plainBody = bodyLines.join('\n');
	if(navigator && navigator.clipboard){
		navigator.clipboard.writeText(plainBody).then(()=>{
			// do nothing — clipboard copied as a helpful fallback
		}).catch(()=>{
			// ignore clipboard errors
		});
	}
}