// Add an event listener for form submission
document.getElementById('urlForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the URL entered by the user
  const url = document.getElementById('url').value;
  
  // Send a GET request to the backend server for sentiment analysis
  const response = await fetch('/analyze?url=' + encodeURIComponent(url));
  
  // Parse the JSON response
  const data = await response.json();
  
  // Display the sentiment analysis results on the page
  document.getElementById('result').innerText = JSON.stringify(data, null, 2);
});
