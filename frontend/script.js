async function analyzeEmail() {
  const emailText = document.getElementById('emailText').value;
  
  if (emailText.trim() === "") {
    alert("Please paste some email text!");
    return;
  }

  const response = await fetch('http://localhost:5000/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ emailText })
  });

  const result = await response.json();
  displayResult(result);
}

function displayResult(result) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<h2>Analysis Result:</h2>
                         <p>Status: ${result.status}</p>
                         <p><strong>Found Keywords:</strong> ${result.foundKeywords.join(', ') || 'None'}</p>
                         <p><strong>Found Links:</strong> ${result.foundLinks.join(', ') || 'None'}</p>`;
}
